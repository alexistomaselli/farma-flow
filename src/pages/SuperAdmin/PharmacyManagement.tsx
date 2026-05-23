import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, User, Mail, MapPin, Calendar, 
  DollarSign, Check, X, ShieldAlert, Award 
} from 'lucide-react';

export const PharmacyManagement: React.FC = () => {
  const { pharmacies, togglePharmacyStatus, changePharmacyPlan } = useApp();
  
  // Plan change states
  const [activeSelectPlanId, setActiveSelectPlanId] = useState<string | null>(null);

  const handlePlanChange = (pharmacyId: string, plan: 'Básico' | 'Pro' | 'Enterprise') => {
    changePharmacyPlan(pharmacyId, plan);
    setActiveSelectPlanId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Gestión de Farmacias Clientes</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Activa, suspende o cambia planes de suscripciones de las farmacias registradas en el SaaS.
          </p>
        </div>
      </div>

      {/* Main Table List */}
      <div className="glass-card table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Farmacia</th>
              <th>Propietario / Contacto</th>
              <th>Fecha Registro</th>
              <th>Plan Suscripción</th>
              <th>Estado</th>
              <th>MRR</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => {
              const isEditingPlan = activeSelectPlanId === pharmacy.id;
              
              return (
                <tr key={pharmacy.id}>
                  {/* Farmacia Info */}
                  <td>
                    <div className="flex-align" style={{ gap: '0.75rem' }}>
                      <div 
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: pharmacy.logoColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        {pharmacy.name[0]}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.9375rem', display: 'block' }}>{pharmacy.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={10} />
                          {pharmacy.address}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Owner & Contact */}
                  <td>
                    <div>
                      <span style={{ fontWeight: 500, display: 'block' }}>{pharmacy.ownerName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Mail size={10} />
                        {pharmacy.email}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      {pharmacy.joinedDate}
                    </span>
                  </td>

                  {/* Subscription Plan */}
                  <td>
                    {isEditingPlan ? (
                      <div className="flex-align" style={{ gap: '0.25rem' }}>
                        <select 
                          className="form-control" 
                          defaultValue={pharmacy.plan}
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: '110px' }}
                          onChange={(e) => handlePlanChange(pharmacy.id, e.target.value as any)}
                        >
                          <option value="Básico">Básico</option>
                          <option value="Pro">Pro</option>
                          <option value="Enterprise">Enterprise</option>
                        </select>
                        <button 
                          className="btn btn-ghost"
                          style={{ padding: '0.25rem' }}
                          onClick={() => setActiveSelectPlanId(null)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-align" style={{ gap: '0.5rem' }}>
                        <span 
                          className={`badge ${
                            pharmacy.plan === 'Enterprise' 
                              ? 'badge-success' 
                              : pharmacy.plan === 'Pro' 
                              ? 'badge-info' 
                              : 'badge-warning'
                          }`}
                        >
                          {pharmacy.plan}
                        </span>
                        <button 
                          className="btn btn-ghost" 
                          style={{ fontSize: '0.6875rem', padding: '0.15rem 0.35rem', textDecoration: 'underline' }}
                          onClick={() => setActiveSelectPlanId(pharmacy.id)}
                        >
                          Cambiar
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    <span 
                      className={`badge ${
                        pharmacy.status === 'Activo' 
                          ? 'badge-success' 
                          : pharmacy.status === 'En Prueba' 
                          ? 'badge-warning' 
                          : 'badge-danger'
                      }`}
                    >
                      {pharmacy.status}
                    </span>
                  </td>

                  {/* MRR Contribution */}
                  <td>
                    <strong style={{ fontSize: '0.9375rem' }}>
                      ${pharmacy.status === 'Suspendido' ? '0' : pharmacy.mrr.toLocaleString()}
                    </strong>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'block' }}>/mes</span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {pharmacy.status === 'Activo' ? (
                        <button 
                          className="btn btn-danger"
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                          onClick={() => togglePharmacyStatus(pharmacy.id)}
                        >
                          <X size={12} />
                          <span>Suspender</span>
                        </button>
                      ) : (
                        <button 
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                          onClick={() => togglePharmacyStatus(pharmacy.id)}
                        >
                          <Check size={12} />
                          <span>Activar</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
