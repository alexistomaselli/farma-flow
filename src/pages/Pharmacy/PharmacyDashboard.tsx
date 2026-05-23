import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { ReceiptModal } from '../../components/ReceiptModal';
import { Sale } from '../../data/mockData';
import { 
  TrendingUp, Users, DollarSign, Award, Calendar, 
  AlertCircle, ChevronRight, ShoppingBag, Eye 
} from 'lucide-react';

export const PharmacyDashboard: React.FC = () => {
  const { currentUser, sales, medications, sellers, pharmacies } = useApp();
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  if (!currentUser?.pharmacyId) return null;
  const phId = currentUser.pharmacyId;

  // 1. Filter data for CURRENT pharmacy
  const pharmacySales = sales.filter(s => s.pharmacyId === phId);
  const pharmacyMeds = medications.filter(m => m.pharmacyId === phId);
  const pharmacySellers = sellers.filter(s => s.pharmacyId === phId);

  // 2. Calculate Key Financial Performance indicators (KPIs)
  // Today's Date String
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySales = pharmacySales.filter(s => s.date.startsWith(todayStr));
  
  const todaySalesVolume = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalSalesVolume = pharmacySales.reduce((sum, s) => sum + s.totalAmount, 0);

  // Calculate Net Profits (Ganancia Neta) based on (Sale price - Cost price) * qty
  // Subtracting the insurance discounts proportionally
  let totalNetProfit = 0;
  pharmacySales.forEach(sale => {
    let saleCost = 0;
    let saleSaleValue = 0;

    sale.items.forEach(item => {
      // Find matching medication to check its Cost Price
      const med = medications.find(m => m.id === item.medicationId);
      const cost = med ? med.priceCost : item.priceSale * 0.5; // fallback
      saleCost += cost * item.qty;
      saleSaleValue += item.priceSale * item.qty;
    });

    // Net profit = actual money received (totalAmount) - original drug costs
    // If the insurance covers it, the pharmacy gets reimbursed eventually, but in instant cash drawer, 
    // we calculate: totalAmount (what patient paid) - cost of drug.
    // To make it look professional, we assume insurance is fully reimbursed, so profit is:
    // saleSaleValue - saleCost. Let's do that! That represents actual business margins.
    const saleProfit = saleSaleValue - saleCost;
    totalNetProfit += saleProfit;
  });

  const avgMarginPercentage = totalSalesVolume > 0 ? Math.round((totalNetProfit / totalSalesVolume) * 100) : 52;

  // Top Seller Name
  const sortedSellers = [...pharmacySellers].sort((a, b) => b.totalSales - a.totalSales);
  const topSellerName = sortedSellers.length > 0 ? sortedSellers[0].name : 'Ninguno';
  const topSellerAmt = sortedSellers.length > 0 ? sortedSellers[0].totalSales : 0;

  // 3. Alerts calculation
  const criticalStockCount = pharmacyMeds.filter(m => m.stock <= m.minStock).length;
  const expiredLotCount = pharmacyMeds.filter(m => {
    const exp = new Date(m.expirationDate);
    const today = new Date();
    return exp < today;
  }).length;

  const activePh = pharmacies.find(p => p.id === phId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Dynamic Alerts Banner */}
      {(criticalStockCount > 0 || expiredLotCount > 0) && (
        <div 
          className="glass-card animate-fade-in"
          style={{
            background: 'rgba(239, 68, 68, 0.06)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem'
          }}
        >
          <AlertCircle size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
          <div style={{ fontSize: '0.875rem', flex: 1 }}>
            <strong style={{ color: 'white' }}>Alertas de Operación Requeridas: </strong>
            Tienes {criticalStockCount} medicamentos en stock crítico y {expiredLotCount} lote(s) de medicamentos ya vencidos.
          </div>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', background: 'var(--danger)' }} onClick={() => useApp().setView('pharmacy-medications')}>
            Revisar Inventario
          </button>
        </div>
      )}

      {/* Main KPI metrics */}
      <div className="grid-4">
        <StatCard 
          title="Ventas del Día" 
          value={`$${todaySalesVolume.toLocaleString()}`} 
          icon={<ShoppingBag size={20} />} 
          description={`${todaySales.length} ventas hoy`}
          trend={{ value: todaySales.length > 0 ? '+15.2%' : '0%', type: todaySales.length > 0 ? 'up' : 'neutral' }}
          glowColor="#10b981"
        />

        <StatCard 
          title="Ganancia Estimada" 
          value={`$${totalNetProfit.toLocaleString()}`} 
          icon={<DollarSign size={20} />} 
          description="Total neto acumulado"
          trend={{ value: `Margen ${avgMarginPercentage}%`, type: 'up' }}
          glowColor="#06b6d4"
        />

        <StatCard 
          title="Vendedor Estrella" 
          value={topSellerName} 
          icon={<Award size={20} />} 
          description={`Ventas: $${topSellerAmt.toLocaleString()}`}
          trend={{ value: 'Comisión Activa', type: 'up' }}
          glowColor="#f59e0b"
        />

        <StatCard 
          title="Salud del Inventario" 
          value={`${pharmacyMeds.length} Items`} 
          icon={<TrendingUp size={20} />} 
          description={`${criticalStockCount} en stock crítico`}
          trend={{ value: `${expiredLotCount} vencidos`, type: expiredLotCount > 0 ? 'down' : 'neutral' }}
          glowColor="#3b82f6"
        />
      </div>

      {/* Central Content Split */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        
        {/* Recent Sales lists */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Historial Reciente de Ventas</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto' }}>
            {pharmacySales.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No hay ventas registradas aún.
              </div>
            ) : (
              pharmacySales.map((sale) => (
                <div 
                  key={sale.id}
                  className="flex-between"
                  style={{
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.01)'
                  }}
                >
                  <div>
                    <div className="flex-align">
                      <strong style={{ fontSize: '0.875rem' }}>${sale.totalAmount.toLocaleString()}</strong>
                      <span className="badge badge-success" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>
                        {sale.paymentMethod}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      Por {sale.sellerName} | {sale.date}
                    </div>
                  </div>

                  <button 
                    className="btn btn-secondary flex-align"
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                    onClick={() => setSelectedSale(sale)}
                  >
                    <Eye size={12} />
                    <span>Ver Ticket</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar widgets showing seller distributions */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Rendimiento de Cajas</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Volumen total acumulado de ventas por vendedor en la sucursal actual.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {pharmacySellers.map((seller) => {
              // Calculate percent contribution
              const percent = totalSalesVolume > 0 ? Math.round((seller.totalSales / totalSalesVolume) * 100) : 0;
              return (
                <div key={seller.id}>
                  <div className="flex-between" style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                    <span className="flex-align">
                      <div 
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: seller.status === 'Online' ? '#10b981' : '#64748b'
                        }}
                        title={seller.status}
                      />
                      {seller.name}
                    </span>
                    <strong>${seller.totalSales.toLocaleString()} ({percent}%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: 'var(--primary)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ticket Modal Simulator */}
      {selectedSale && (
        <ReceiptModal 
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </div>
  );
};
