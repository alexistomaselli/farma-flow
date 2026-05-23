import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, Shield, Key, Database, Globe, 
  Terminal, Sparkles, AlertCircle, Copy, Check 
} from 'lucide-react';

export const PharmacyProfile: React.FC = () => {
  const { currentUser, pharmacies, changePharmacyPlan } = useApp();
  const [copiedText, setCopiedText] = useState(false);

  if (!currentUser?.pharmacyId) return null;
  const phId = currentUser.pharmacyId;

  const pharmacy = pharmacies.find(p => p.id === phId);
  if (!pharmacy) return null;

  const sqlCode = `-- TABLAS SUPABASE PARA EL SaaS FARMAFLOW
-- 1. Tabla de Medicamentos
CREATE TABLE medications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pharmacy_id UUID REFERENCES pharmacies(id) ON DELETE CASCADE,
  sku VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  laboratory VARCHAR(100),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 10,
  price_cost DECIMAL(10, 2) NOT NULL,
  price_sale DECIMAL(10, 2) NOT NULL,
  requires_prescription BOOLEAN DEFAULT FALSE,
  batch_number VARCHAR(100),
  expiration_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Tabla de Ventas / POS
CREATE TABLE sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pharmacy_id UUID REFERENCES pharmacies(id),
  seller_id UUID REFERENCES sellers(id),
  payment_method VARCHAR(50) NOT NULL,
  insurance_name VARCHAR(100),
  insurance_discount INTEGER,
  subtotal DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Upper split layout: settings left, plan details right */}
      <div className="grid-2" style={{ gap: '2rem' }}>
        
        {/* General settings form mockup */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 className="flex-align" style={{ fontSize: '1rem', fontWeight: 600 }}>
            <Store size={18} style={{ color: 'var(--primary)' }} />
            <span>Perfil de la Sucursal</span>
          </h3>

          <div className="form-group">
            <label>Nombre Comercial de la Farmacia</label>
            <input type="text" className="form-control" defaultValue={pharmacy.name} readOnly />
          </div>

          <div className="form-group">
            <label>Dirección Operativa</label>
            <input type="text" className="form-control" defaultValue={pharmacy.address} readOnly />
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group">
              <label>Identificador Único Cajas</label>
              <input type="text" className="form-control" defaultValue={`CJS-${pharmacy.id.toUpperCase()}`} readOnly style={{ fontFamily: 'monospace' }} />
            </div>

            <div className="form-group">
              <label>Administrador Responsable</label>
              <input type="text" className="form-control" defaultValue={pharmacy.ownerName} readOnly />
            </div>
          </div>
        </div>

        {/* Subscription / Plan management */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem',
            border: '1px solid var(--border-color-active)',
            background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05), transparent 60%)'
          }}
        >
          <h3 className="flex-align" style={{ fontSize: '1rem', fontWeight: 600 }}>
            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
            <span>Estado de mi Plan SaaS</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between">
              <span>Suscripción Activa:</span>
              <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                FarmaFlow {pharmacy.plan}
              </span>
            </div>
            
            <div className="flex-between">
              <span>Mensualidad:</span>
              <strong style={{ fontSize: '1.25rem', color: 'white' }}>${pharmacy.mrr}/mes</strong>
            </div>

            <div className="flex-between">
              <span>Fecha Alta:</span>
              <span style={{ color: 'var(--text-secondary)' }}>{pharmacy.joinedDate}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              💡 Para cambiar de plan o actualizar los datos de pago, puedes simularlo desde el Selector Rápido del Panel General.
            </span>
          </div>
        </div>
      </div>

      {/* LOWER COMPONENT: Supabase Integration Panel (Highly technical proof of concept) */}
      <div 
        className="glass-card" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}
      >
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 className="flex-align" style={{ fontSize: '1.125rem', fontWeight: 700 }}>
              <Database size={20} style={{ color: 'var(--secondary)' }} />
              <span>Conexión Técnica Supabase (Listo para Desplegar)</span>
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '650px' }}>
              Este prototipo en React está construido sobre una arquitectura limpia y tipada que mapea perfectamente con las tablas de bases de datos relacionales en la nube de Supabase.
            </p>
          </div>

          <span className="badge badge-info" style={{ animation: 'pulseGlow 2s infinite' }}>
            🔒 Listo Para Conectar (Supabase Ready)
          </span>
        </div>

        {/* Integration guides split */}
        <div className="grid-2" style={{ gap: '2rem' }}>
          
          {/* JS Connection Code snippet */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Terminal size={14} />
              Código de Conexión del Cliente (JS / TS SDK)
            </span>
            
            <div 
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#34d399',
                lineHeight: 1.4,
                overflowX: 'auto'
              }}
            >
              <div style={{ color: 'var(--text-muted)' }}>// 1. Inicializar cliente Supabase</div>
              <div>import &#123; createClient &#125; from '@supabase/supabase-js';</div>
              <div>const supabase = createClient(URL, KEY);</div>
              <br />
              <div style={{ color: 'var(--text-muted)' }}>// 2. Transacción de Ventas reactiva con RLS</div>
              <div>export const supabaseProcessSale = async (sale) =&gt; &#123;</div>
              <div style={{ paddingLeft: '1rem' }}>const &#123; data, error &#125; = await supabase</div>
              <div style={{ paddingLeft: '2rem' }}>.from('sales')</div>
              <div style={{ paddingLeft: '2rem' }}>.insert([sale])</div>
              <div style={{ paddingLeft: '2rem' }}>.select();</div>
              <br />
              <div style={{ paddingLeft: '1rem' }}>if (error) throw error;</div>
              <div style={{ paddingLeft: '1rem' }}>return data[0];</div>
              <div>&#125;</div>
            </div>
          </div>

          {/* Supabase SQL DDL declarations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Key size={14} />
                Esquema DDL SQL para Supabase Editor
              </span>
              <button 
                className="btn btn-ghost" 
                style={{ fontSize: '0.6875rem', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                onClick={copyToClipboard}
              >
                {copiedText ? <Check size={12} style={{ color: 'var(--primary)' }} /> : <Copy size={12} />}
                <span>{copiedText ? 'Copiado' : 'Copiar SQL'}</span>
              </button>
            </div>

            <div 
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#e2e8f0',
                lineHeight: 1.4,
                maxHeight: '175px',
                overflowY: 'auto'
              }}
            >
              {sqlCode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
