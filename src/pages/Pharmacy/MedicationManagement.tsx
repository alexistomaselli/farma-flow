import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Medication } from '../../data/mockData';
import { 
  Pill, Search, AlertCircle, Plus, Edit2, 
  Trash2, Calendar, FileText, CheckCircle 
} from 'lucide-react';

export const MedicationManagement: React.FC = () => {
  const { currentUser, medications, addMedicationItem, updateMedicationItem, deleteMedicationItem } = useApp();
  
  if (!currentUser?.pharmacyId) return null;
  const phId = currentUser.pharmacyId;

  // Filter for CURRENT pharmacy
  const pharmacyMeds = medications.filter(m => m.pharmacyId === phId);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'soon' | 'expired'>('all');
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [category, setCategory] = useState<any>('Analgésico');
  const [stock, setStock] = useState(50);
  const [minStock, setMinStock] = useState(15);
  const [priceCost, setPriceCost] = useState(300);
  const [priceSale, setPriceSale] = useState(650);
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [batchNumber, setBatchNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  // 1. Alert indicators helper
  const getExpirationStatus = (expDate: string) => {
    const exp = new Date(expDate);
    const today = new Date();
    
    // Difference in days
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: 'Vencido', color: 'badge-danger', text: 'YA VENCIO' };
    } else if (diffDays <= 30) {
      return { label: 'Crítico', color: 'badge-danger', text: `Vence en ${diffDays} días` };
    } else if (diffDays <= 90) {
      return { label: 'Advertencia', color: 'badge-warning', text: `Vence en ${diffDays} días` };
    } else {
      return { label: 'Seguro', color: 'badge-success', text: `Seguro (${diffDays}d)` };
    }
  };

  // 2. Open Modal to Add
  const handleOpenAdd = () => {
    setEditingMed(null);
    setName('');
    setSku(`MED-${Math.floor(100000 + Math.random() * 900000)}-01`);
    setLaboratory('');
    setCategory('Analgésico');
    setStock(50);
    setMinStock(15);
    setPriceCost(300);
    setPriceSale(650);
    setRequiresPrescription(false);
    setBatchNumber(`L-NEW${Math.floor(1000 + Math.random() * 9000)}`);
    setExpirationDate('2027-12-31');
    setShowModal(true);
  };

  // 3. Open Modal to Edit
  const handleOpenEdit = (med: Medication) => {
    setEditingMed(med);
    setName(med.name);
    setSku(med.sku);
    setLaboratory(med.laboratory);
    setCategory(med.category);
    setStock(med.stock);
    setMinStock(med.minStock);
    setPriceCost(med.priceCost);
    setPriceSale(med.priceSale);
    setRequiresPrescription(med.requiresPrescription);
    setBatchNumber(med.batchNumber);
    setExpirationDate(med.expirationDate);
    setShowModal(true);
  };

  // 4. Save Form
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const medData = {
      sku,
      name,
      laboratory,
      category,
      stock,
      minStock,
      priceCost,
      priceSale,
      requiresPrescription,
      batchNumber,
      expirationDate
    };

    if (editingMed) {
      updateMedicationItem(editingMed.id, medData);
    } else {
      addMedicationItem(medData);
    }
    setShowModal(false);
  };

  // 5. Filter lists
  const filteredMeds = pharmacyMeds.filter(m => {
    // Search filter
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.sku.includes(searchTerm) ||
      m.laboratory.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Sidebar alert tabs filter
    const exp = new Date(m.expirationDate);
    const today = new Date();
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (filterType === 'critical') {
      return m.stock <= m.minStock;
    }
    if (filterType === 'soon') {
      return diffDays >= 0 && diffDays <= 90;
    }
    if (filterType === 'expired') {
      return diffDays < 0;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Inventario de Medicamentos</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Monitorea el inventario, fechas de vencimiento y requisitos de receta.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Agregar Medicamento</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div 
        className="glass-card flex-between"
        style={{
          padding: '1rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar por Nombre, SKU, Lab..." 
            style={{ paddingLeft: '2.25rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
            onClick={() => setFilterType('all')}
          >
            Todos ({pharmacyMeds.length})
          </button>
          
          <button 
            className={`btn ${filterType === 'critical' ? 'btn-danger' : 'btn-secondary'}`}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.8125rem',
              borderColor: filterType === 'critical' ? 'transparent' : 'rgba(239, 68, 68, 0.3)',
              color: filterType === 'critical' ? 'var(--text-inverse)' : '#ef4444'
            }}
            onClick={() => setFilterType('critical')}
          >
            Stock Crítico ({pharmacyMeds.filter(m => m.stock <= m.minStock).length})
          </button>

          <button 
            className={`btn ${filterType === 'soon' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.8125rem',
              backgroundColor: filterType === 'soon' ? 'var(--primary)' : 'transparent',
              borderColor: filterType === 'soon' ? 'transparent' : 'rgba(245, 158, 11, 0.3)',
              color: filterType === 'soon' ? 'var(--text-inverse)' : '#fbbf24'
            }}
            onClick={() => setFilterType('soon')}
          >
            Próximos a Vencer ({pharmacyMeds.filter(m => {
              const exp = new Date(m.expirationDate);
              const today = new Date();
              const diff = exp.getTime() - today.getTime();
              const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
              return days >= 0 && days <= 90;
            }).length})
          </button>

          <button 
            className={`btn ${filterType === 'expired' ? 'btn-danger' : 'btn-secondary'}`}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.8125rem',
              background: filterType === 'expired' ? 'var(--danger)' : 'transparent',
              borderColor: filterType === 'expired' ? 'transparent' : 'rgba(239, 68, 68, 0.3)',
              color: filterType === 'expired' ? 'var(--text-inverse)' : '#f87171'
            }}
            onClick={() => setFilterType('expired')}
          >
            Vencidos ({pharmacyMeds.filter(m => {
              const exp = new Date(m.expirationDate);
              const today = new Date();
              return exp < today;
            }).length})
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Código SKU</th>
              <th>Nombre Medicamento</th>
              <th>Laboratorio</th>
              <th>Stock actual</th>
              <th>Precio Venta</th>
              <th>Vencimiento / Lote</th>
              <th>Receta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  Ningún medicamento coincide con los filtros aplicados.
                </td>
              </tr>
            ) : (
              filteredMeds.map((med) => {
                const expInfo = getExpirationStatus(med.expirationDate);
                const isCriticalStock = med.stock <= med.minStock;

                return (
                  <tr key={med.id}>
                    {/* SKU */}
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600 }}>{med.sku}</td>
                    
                    {/* Name */}
                    <td>
                      <div className="flex-align">
                        <Pill size={14} style={{ color: 'var(--primary)' }} />
                        <strong style={{ fontSize: '0.9375rem' }}>{med.name}</strong>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', paddingLeft: '1.25rem' }}>{med.category}</span>
                    </td>

                    {/* Lab */}
                    <td>{med.laboratory}</td>

                    {/* Stock */}
                    <td>
                      <div className="flex-align">
                        <span 
                          style={{ fontWeight: 700 }}
                          className={isCriticalStock ? 'badge badge-danger' : ''}
                        >
                          {med.stock} uds
                        </span>
                        {isCriticalStock && (
                          <span style={{ fontSize: '0.6875rem', color: 'var(--danger)', fontWeight: 600 }}>
                            Stock Crítico! (min: {med.minStock})
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td>
                      <strong>${med.priceSale.toLocaleString()}</strong>
                      <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Costo: ${med.priceCost}</span>
                    </td>

                    {/* Expiration & Batch */}
                    <td>
                      <span className={`badge ${expInfo.color}`} style={{ fontSize: '0.6875rem' }}>
                        {expInfo.text}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                        Lote: <strong>{med.batchNumber}</strong> ({med.expirationDate})
                      </span>
                    </td>

                    {/* Prescripción */}
                    <td>
                      {med.requiresPrescription ? (
                        <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Bajo Receta</span>
                      ) : (
                        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Venta Libre</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: '0.35rem' }} 
                          onClick={() => handleOpenEdit(med)}
                          title="Editar"
                        >
                          <Edit2 size={14} style={{ color: 'var(--secondary)' }} />
                        </button>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: '0.35rem' }} 
                          onClick={() => {
                            if (confirm('¿Seguro que deseas eliminar este medicamento de la base?')) {
                              deleteMedicationItem(med.id);
                            }
                          }}
                          title="Eliminar"
                        >
                          <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* CRUD MODAL */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            overflowY: 'auto'
          }}
        >
          <div 
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
              {editingMed ? 'Editar Medicamento' : 'Agregar Medicamento al Inventario'}
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Nombre del Medicamento *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ibuprofeno 600mg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Laboratorio *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Bayer"
                    value={laboratory}
                    onChange={(e) => setLaboratory(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>SKU (Código)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select 
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                  >
                    <option value="Analgésico">Analgésico</option>
                    <option value="Antibiótico">Antibiótico</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Pediátrico">Pediátrico</option>
                    <option value="Ventas Libres">Ventas Libres</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Venta Libre / Receta</label>
                  <select 
                    className="form-control"
                    value={requiresPrescription ? 'si' : 'no'}
                    onChange={(e) => setRequiresPrescription(e.target.value === 'si')}
                  >
                    <option value="no">Venta Libre</option>
                    <option value="si">Bajo Receta</option>
                  </select>
                </div>
              </div>

              <div className="grid-4" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Stock inicial</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Stock Mínimo</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={minStock}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Precio Costo</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={priceCost}
                    onChange={(e) => setPriceCost(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Precio Venta</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={priceSale}
                    onChange={(e) => setPriceSale(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Número de Lote *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="L-ACT8890"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fecha de Vencimiento *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
