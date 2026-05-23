import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Medication, Sale } from '../../data/mockData';
import { ReceiptModal } from '../../components/ReceiptModal';
import { 
  ShoppingCart, Search, Trash2, Plus, Minus, CreditCard, 
  User, Check, AlertTriangle, Sparkles, Receipt, Pill 
} from 'lucide-react';

interface CartItem {
  medication: Medication;
  qty: number;
}

export const SalesPOS: React.FC = () => {
  const { currentUser, medications, sellers, processSale } = useApp();
  
  if (!currentUser?.pharmacyId) return null;
  const phId = currentUser.pharmacyId;

  // Filter medications for CURRENT pharmacy
  const pharmacyMeds = medications.filter(m => m.pharmacyId === phId);
  const pharmacySellers = sellers.filter(s => s.pharmacyId === phId);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSellerId, setSelectedSellerId] = useState(
    currentUser.role === 'seller' && currentUser.sellerId ? currentUser.sellerId : (pharmacySellers[0]?.id || '')
  );
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');
  
  // Insurance discount copay selector
  const [insurance, setInsurance] = useState<{ name: string; discount: number }>({ name: 'Particular', discount: 0 });
  const [prescriptionVerified, setPrescriptionVerified] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  // 1. Add item to cart
  const addToCart = (med: Medication) => {
    if (med.stock <= 0) {
      alert('⚠️ Este medicamento no tiene stock disponible.');
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.medication.id === med.id);
      if (existing) {
        if (existing.qty >= med.stock) {
          alert('⚠️ Has alcanzado el límite de stock disponible para este item.');
          return prev;
        }
        return prev.map(item => item.medication.id === med.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { medication: med, qty: 1 }];
    });
  };

  // 2. Decrement or remove item from cart
  const removeFromCart = (medId: string) => {
    setCart(prev => prev.filter(item => item.medication.id !== medId));
  };

  const updateQty = (medId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.medication.id === medId) {
          const nextQty = item.qty + delta;
          if (nextQty <= 0) return null;
          // Check stock
          if (nextQty > item.medication.stock) {
            alert('⚠️ No hay suficiente stock para agregar más unidades.');
            return item;
          }
          return { ...item, qty: nextQty };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  // 3. Search and filter medications catalogue
  const searchedMeds = pharmacyMeds.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.sku.includes(searchTerm) ||
    m.laboratory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Calculate subtotal, discounts & totals
  const subtotal = cart.reduce((sum, item) => sum + (item.medication.priceSale * item.qty), 0);
  const discountAmount = Math.round(subtotal * (insurance.discount / 100));
  const totalAmount = subtotal - discountAmount;

  // 5. Verification checks
  const requiresPrescription = cart.some(item => item.medication.requiresPrescription);

  // 6. Checkout action
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    if (requiresPrescription && !prescriptionVerified) {
      alert('⚠️ Este pedido contiene medicamentos bajo receta. Debes marcar la casilla de verificación de receta antes de continuar.');
      return;
    }

    if (!selectedSellerId) {
      alert('⚠️ Por favor selecciona el vendedor que atiende la caja.');
      return;
    }

    // Call Context to process sale
    const processed = processSale({
      sellerId: selectedSellerId,
      items: cart.map(item => ({ medicationId: item.medication.id, qty: item.qty })),
      paymentMethod,
      insuranceName: insurance.name,
      insuranceDiscount: insurance.discount
    });

    if (processed) {
      setCompletedSale(processed);
      setCart([]); // Clear cart
      setPrescriptionVerified(false);
    }
  };

  const insurancesList = [
    { name: 'Particular (Sin Obra Social)', discount: 0 },
    { name: 'PAMI (Jubilados 80%)', discount: 80 },
    { name: 'OSDE (Medicina Prepaga 40%)', discount: 40 },
    { name: 'GALENO (Medicina Prepaga 40%)', discount: 40 },
    { name: 'Sancor Salud (Prepaga 50%)', discount: 50 }
  ];

  return (
    <div 
      className="grid-2"
      style={{
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '2.5rem',
        height: 'calc(100vh - 140px)', // Fixed viewport for POS
        overflow: 'hidden'
      }}
    >
      
      {/* LEFT COLUMN: Medication catalogue list */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          height: '100%',
          overflowY: 'auto',
          paddingRight: '0.5rem'
        }}
      >
        <div className="flex-between">
          <h3 className="flex-align" style={{ fontSize: '1.125rem' }}>
            <Pill size={20} style={{ color: 'var(--primary)' }} />
            <span>Catálogo de Medicamentos</span>
          </h3>
          
          {/* Search bar */}
          <div style={{ position: 'relative', width: '220px' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar medicamento..."
              style={{ paddingLeft: '2.25rem', fontSize: '0.8125rem', padding: '0.5rem 0.5rem 0.5rem 2rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Medication Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {searchedMeds.map((med) => {
            const isOutOfStock = med.stock <= 0;
            const isLowStock = med.stock <= med.minStock;

            return (
              <div 
                key={med.id}
                className="glass-card flex-between"
                style={{
                  padding: '0.75rem 1rem',
                  borderColor: isOutOfStock ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-color)',
                  opacity: isOutOfStock ? 0.6 : 1,
                  background: isOutOfStock ? 'rgba(239,68,68,0.01)' : 'var(--bg-card)'
                }}
              >
                <div>
                  <div className="flex-align">
                    <strong style={{ fontSize: '0.9375rem' }}>{med.name}</strong>
                    {med.requiresPrescription && (
                      <span className="badge badge-danger" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>Receta</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Lab: {med.laboratory} | Cat: {med.category}
                  </span>
                  
                  {/* Stock level indicators */}
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {isOutOfStock ? (
                      <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>🔴 SIN STOCK</span>
                    ) : isLowStock ? (
                      <span style={{ color: 'var(--warning)', fontWeight: 600 }}>⚠️ Stock Bajo: {med.stock} uds</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Stock: {med.stock} uds</span>
                    )}
                  </div>
                </div>

                <div className="flex-align" style={{ gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>
                      ${med.priceSale.toLocaleString()}
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Lote: {med.batchNumber}</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem', borderRadius: '8px' }}
                    onClick={() => addToCart(med)}
                    disabled={isOutOfStock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Shopping Cart Panel */}
      <div 
        className="glass-card" 
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem',
          padding: '1.5rem',
          border: '1px solid var(--border-color-active)'
        }}
      >
        <h3 className="flex-align" style={{ fontSize: '1.125rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
          <ShoppingCart size={20} style={{ color: 'var(--primary)' }} />
          <span>Carrito de Compra</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
            {cart.reduce((sum, i) => sum + i.qty, 0)} items
          </span>
        </h3>

        {/* Cart Itemizations */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.25rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingCart size={36} style={{ strokeWidth: 1.5 }} />
              <span>El carrito está vacío. Agrega medicamentos del catálogo.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.medication.id} 
                className="flex-between"
                style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.medication.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    ${item.medication.priceSale.toLocaleString()} c/u
                  </div>
                </div>

                <div className="flex-align" style={{ gap: '0.5rem', flexShrink: 0 }}>
                  {/* Quantity adjustment */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: 'rgba(0,0,0,0.2)', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    <button className="btn btn-ghost" style={{ padding: '0.25rem' }} onClick={() => updateQty(item.medication.id, -1)}><Minus size={12} /></button>
                    <span style={{ fontSize: '0.8125rem', width: '24px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                    <button className="btn btn-ghost" style={{ padding: '0.25rem' }} onClick={() => addToCart(item.medication)}><Plus size={12} /></button>
                  </div>

                  <button 
                    className="btn btn-ghost"
                    style={{ padding: '0.35rem' }}
                    onClick={() => removeFromCart(item.medication.id)}
                  >
                    <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Copay & Insurance Discount Settings */}
        {cart.length > 0 && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem',
              background: 'rgba(0,0,0,0.15)', 
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Vendedor */}
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.7rem' }}>Cajero / Vendedor Asignado</label>
              <div style={{ position: 'relative' }}>
                <select 
                  className="form-control"
                  style={{ fontSize: '0.8125rem', padding: '0.4rem 0.5rem' }}
                  value={selectedSellerId}
                  onChange={(e) => setSelectedSellerId(e.target.value)}
                  disabled={currentUser.role === 'seller'} // Vendedores no pueden reasignar
                >
                  {pharmacySellers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <User size={12} style={{ position: 'absolute', right: '12px', top: '10px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Obra Social */}
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.7rem' }}>Obra Social (Descuento)</label>
              <select 
                className="form-control"
                style={{ fontSize: '0.8125rem', padding: '0.4rem 0.5rem' }}
                value={insurance.name}
                onChange={(e) => {
                  const selected = insurancesList.find(i => i.name === e.target.value);
                  if (selected) setInsurance({ name: selected.name, discount: selected.discount });
                }}
              >
                {insurancesList.map((ins, idx) => (
                  <option key={idx} value={ins.name}>{ins.name}</option>
                ))}
              </select>
            </div>

            {/* Prescription Upload Simulation */}
            {requiresPrescription && (
              <div 
                style={{ 
                  background: 'rgba(239, 68, 68, 0.05)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangle size={14} />
                  Requiere Receta Médica
                </span>
                <label className="flex-align" style={{ cursor: 'pointer', fontSize: '0.75rem' }}>
                  <input 
                    type="checkbox" 
                    checked={prescriptionVerified}
                    onChange={(e) => setPrescriptionVerified(e.target.checked)}
                    style={{ accentColor: 'var(--danger)' }}
                  />
                  <span>He verificado la receta médica del paciente</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div className="flex-between" style={{ fontSize: '0.8125rem' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            
            {insurance.discount > 0 && (
              <div className="flex-between" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
                <span>Copago ({insurance.name.split(' ')[0]} - {insurance.discount}%):</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}

            {/* Payment options */}
            <div style={{ display: 'flex', gap: '0.25rem', margin: '0.25rem 0' }}>
              {(['Efectivo', 'Tarjeta', 'Transferencia'] as any[]).map((method) => (
                <button
                  key={method}
                  className={`btn ${paymentMethod === method ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem' }}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="flex-between" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
              <span>Total Neto:</span>
              <span style={{ color: 'var(--primary)' }}>${totalAmount.toLocaleString()}</span>
            </div>

            <button 
              className="btn btn-primary pulse-glow"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9375rem', justifyContent: 'center', marginTop: '0.5rem' }}
              onClick={handleCheckout}
            >
              <Sparkles size={16} />
              <span>Confirmar Venta e Imprimir</span>
            </button>
          </div>
        )}
      </div>

      {/* Printer receipt mock modal */}
      {completedSale && (
        <ReceiptModal 
          sale={completedSale}
          onClose={() => setCompletedSale(null)}
        />
      )}
    </div>
  );
};
