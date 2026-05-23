import React, { useState } from 'react';
import { Sale } from '../data/mockData';
import { X, Printer, CheckCircle } from 'lucide-react';

interface ReceiptModalProps {
  sale: Sale | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ sale, onClose }) => {
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);

  if (!sale) return null;

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      setPrinted(true);
      setTimeout(() => {
        setPrinted(false);
      }, 2000);
    }, 1500);
  };

  return (
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
          maxWidth: '420px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div className="flex-between">
          <h3 className="flex-align" style={{ fontSize: '1.125rem' }}>
            <Printer size={18} style={{ color: 'var(--primary)' }} />
            <span>Comprobante de Venta</span>
          </h3>
          <button 
            className="btn btn-ghost" 
            onClick={onClose}
            style={{ borderRadius: '50%', width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Thermal Ticket Container */}
        <div 
          style={{
            background: '#f8fafc',
            color: '#0f172a',
            padding: '1.5rem 1.25rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}
        >
          {/* Jagged thermal paper edges */}
          <div 
            style={{
              position: 'absolute',
              top: '-6px',
              left: 0,
              right: 0,
              height: '6px',
              backgroundImage: 'linear-gradient(-45deg, #f8fafc 4px, transparent 0), linear-gradient(45deg, #f8fafc 4px, transparent 0)',
              backgroundSize: '8px 8px',
              pointerEvents: 'none'
            }}
          />

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a' }}>FARMAFLOW SYSTEM</h4>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.75rem' }}>SUCURSAL CENTRAL 001</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.75rem' }}>Av. Corrientes 1482, CABA</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.75rem' }}>TEL: (011) 4821-9988</p>
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <div><strong>TICKET:</strong> {sale.id}</div>
            <div><strong>FECHA:</strong> {sale.date}</div>
            <div><strong>VEND:</strong> {sale.sellerName}</div>
            <div><strong>COB:</strong> {sale.insuranceName}</div>
          </div>

          {/* Ticket Items */}
          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <div style={{ flex: 2 }}>DESCRIPCION</div>
              <div style={{ flex: 0.5, textAlign: 'center' }}>CANT</div>
              <div style={{ flex: 1, textAlign: 'right' }}>TOTAL</div>
            </div>
            
            {sale.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', marginBottom: '0.25rem', color: '#334155' }}>
                <div style={{ flex: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name}
                </div>
                <div style={{ flex: 0.5, textAlign: 'center' }}>{item.qty}</div>
                <div style={{ flex: 1, textAlign: 'right' }}>${item.total.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Totals calculation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <span>SUBTOTAL:</span>
              <span>${sale.subtotal.toLocaleString()}</span>
            </div>
            {sale.insuranceDiscount > 0 && (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>DESC ({sale.insuranceDiscount}%):</span>
                <span>-${sale.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1rem', borderTop: '1px solid #cbd5e1', paddingTop: '0.25rem', color: '#0f172a' }}>
              <span>TOTAL NETO:</span>
              <span>${sale.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <div><strong>FORMA DE PAGO:</strong> {sale.paymentMethod.toUpperCase()}</div>
          </div>

          {/* Mock Barcode */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', gap: '0.25rem' }}>
            <div 
              style={{
                width: '100%',
                height: '40px',
                backgroundImage: 'linear-gradient(90deg, #000 2px, transparent 2px, #000 4px, transparent 4px, #000 8px, transparent 8px, #000 12px, transparent 12px, #000 13px, transparent 13px, #000 15px, transparent 15px, #000 18px, transparent 18px, #000 22px, transparent 22px, #000 24px)',
                backgroundSize: '28px 100%'
              }}
            />
            <span style={{ fontSize: '0.625rem', letterSpacing: '2px', color: '#64748b' }}>*FLW{sale.id.replace('sal-','')}*</span>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.7rem', color: '#64748b' }}>
            ¡GRACIAS POR SU COMPRA!
            <br />
            - PROTOTIPO DE DEMOSTRACIÓN -
          </div>
        </div>

        {/* Print controls */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ flex: 1 }}
            onClick={handlePrint}
            disabled={printing}
          >
            {printing ? (
              <span>Imprimiendo...</span>
            ) : printed ? (
              <span className="flex-align"><CheckCircle size={16} /> ¡Impreso con éxito!</span>
            ) : (
              <span className="flex-align"><Printer size={16} /> Simular Impresión</span>
            )}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
