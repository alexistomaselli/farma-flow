import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, DollarSign, Send, Mail, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface MockInvoice {
  id: string;
  pharmacyName: string;
  amount: number;
  dueDate: string;
  status: 'Pagado' | 'Vencido' | 'Procesando';
  email: string;
}

export const SubscriptionBilling: React.FC = () => {
  const { pharmacies } = useApp();
  
  // Set up mock invoices based on active pharmacies
  const [invoices, setInvoices] = useState<MockInvoice[]>([
    { id: 'INV-2026-001', pharmacyName: 'Farmacia Nueva Central', amount: 79, dueDate: '2026-05-15', status: 'Pagado', email: 'contacto@nuevacentral.com' },
    { id: 'INV-2026-002', pharmacyName: 'FarmaSalud Belgrano', amount: 149, dueDate: '2026-05-18', status: 'Pagado', email: 'contacto@farmasalud.com' },
    { id: 'INV-2026-003', pharmacyName: 'PharmaExpress Sur', amount: 79, dueDate: '2026-05-01', status: 'Vencido', email: 'roberto@pharmaexpress.com' },
    { id: 'INV-2026-004', pharmacyName: 'Farmacia San Roque', amount: 39, dueDate: '2026-05-25', status: 'Procesando', email: 'julian@sanroque.com' }
  ]);

  const [notifiedInvoiceId, setNotifiedInvoiceId] = useState<string | null>(null);

  const simulateAlert = (invoiceId: string) => {
    setNotifiedInvoiceId(invoiceId);
    setTimeout(() => {
      setNotifiedInvoiceId(null);
      alert('📧 Simulación: Se ha enviado un correo electrónico de alerta de cobro al administrador de la farmacia.');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Historial de Suscripciones y Facturación</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Supervisa el cobro de mensualidades automáticas del SaaS, facturas pendientes y simula cobros rechazados.
        </p>
      </div>

      {/* Grid summarizing payment gateways metrics */}
      <div className="grid-3">
        <div className="glass-card">
          <div style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}><CheckCircle2 size={24} /></div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Facturas Cobradas (Mes)</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>$228</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 transacciones exitosas</span>
        </div>

        <div className="glass-card">
          <div style={{ color: 'var(--danger)', marginBottom: '0.75rem' }}><AlertTriangle size={24} /></div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Saldos Vencidos</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--danger)' }}>$79</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 factura impaga (PharmaExpress)</span>
        </div>

        <div className="glass-card">
          <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }}><Clock size={24} /></div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>En Procesamiento</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>$39</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 débito programado (San Roque)</span>
        </div>
      </div>

      {/* Billing Log Table */}
      <div className="glass-card table-container">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, padding: '1rem 1rem 0 1rem', margin: 0 }}>Registro de Cobros Mensuales</h3>
        <table className="custom-table" style={{ marginTop: '0.5rem' }}>
          <thead>
            <tr>
              <th>ID Factura</th>
              <th>Farmacia Cliente</th>
              <th>Fecha Vencimiento</th>
              <th>Monto</th>
              <th>Estado Cobro</th>
              <th>Acciones de Alerta</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <strong style={{ fontFamily: 'monospace' }}>{inv.id}</strong>
                </td>
                <td>
                  <div>
                    <span style={{ fontWeight: 600 }}>{inv.pharmacyName}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.email}</span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{inv.dueDate}</span>
                </td>
                <td>
                  <strong style={{ fontSize: '0.9375rem' }}>${inv.amount}</strong>
                </td>
                <td>
                  <span 
                    className={`badge ${
                      inv.status === 'Pagado' 
                        ? 'badge-success' 
                        : inv.status === 'Procesando' 
                        ? 'badge-info' 
                        : 'badge-danger'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {inv.status === 'Vencido' ? (
                      <button 
                        className="btn btn-danger"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', animation: 'pulseGlow 2s infinite' }}
                        onClick={() => simulateAlert(inv.id)}
                        disabled={notifiedInvoiceId === inv.id}
                      >
                        <Send size={12} />
                        <span>{notifiedInvoiceId === inv.id ? 'Enviando...' : 'Reclamar Pago'}</span>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                        onClick={() => simulateAlert(inv.id)}
                        disabled={notifiedInvoiceId === inv.id}
                      >
                        <Mail size={12} />
                        <span>Enviar Factura</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
