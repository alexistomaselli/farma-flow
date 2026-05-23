import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, User, Store, KeyRound, Sparkles, LogIn, ChevronLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginUser, setView } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123'); // Preset password
  const [selectedRole, setSelectedRole] = useState<'superadmin' | 'manager' | 'seller'>('manager');
  const [phId, setPhId] = useState('ph-1');
  const [name, setName] = useState('Dr. Alejandro Benítez');
  const [sId, setSId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email || 'demo@farmaflow.com', selectedRole, phId, name, sId);
  };

  // Helper for quick logging in
  const handleQuickLogin = (
    role: 'superadmin' | 'manager' | 'seller', 
    mockEmail: string, 
    pharmacyId?: string, 
    userName?: string,
    sellerId?: string
  ) => {
    loginUser(mockEmail, role, pharmacyId, userName, sellerId);
  };

  return (
    <div 
      style={{
        backgroundColor: 'var(--bg-base)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative'
      }}
    >
      {/* Decorative back button */}
      <button 
        className="btn btn-ghost" 
        onClick={() => setView('landing')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
      >
        <ChevronLeft size={16} />
        <span>Volver al Inicio</span>
      </button>

      <div 
        className="glass-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{ 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'var(--text-inverse)',
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: '0.75rem',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            FF
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Ingreso al Sistema</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
            Accede a la consola de administración FarmaFlow
          </p>
        </div>

        {/* QUICK ROLE SELECTOR (DEMO HIGHLIGHT) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span 
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--secondary)', 
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textAlign: 'center'
            }}
          >
            💡 Selectores Rápidos de Demo (Recomendado)
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Superadmin Button */}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', width: '100%', fontSize: '0.75rem' }}
              onClick={() => handleQuickLogin('superadmin', 'admin@farmaflow.saas', undefined, 'SaaS Super-Admin')}
            >
              <ShieldAlert size={14} style={{ color: '#10b981' }} />
              <div style={{ textAlign: 'left' }}>
                <strong>Superadmin del SaaS</strong> — <span style={{ color: 'var(--text-muted)' }}>Métricas Globales de Cobros</span>
              </div>
            </button>

            {/* Pharmacy Owner Button */}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', width: '100%', fontSize: '0.75rem' }}
              onClick={() => handleQuickLogin('manager', 'contacto@nuevacentral.com', 'ph-1', 'Dr. Alejandro Benítez')}
            >
              <Store size={14} style={{ color: '#06b6d4' }} />
              <div style={{ textAlign: 'left' }}>
                <strong>Dueño de Farmacia</strong> — <span style={{ color: 'var(--text-muted)' }}>Farmacia Nueva Central (Full)</span>
              </div>
            </button>

            {/* Seller Button */}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', width: '100%', fontSize: '0.75rem' }}
              onClick={() => handleQuickLogin('seller', 'carlos@nuevacentral.com', 'ph-1', 'Carlos Gómez', 'sel-1')}
            >
              <User size={14} style={{ color: '#f59e0b' }} />
              <div style={{ textAlign: 'left' }}>
                <strong>Vendedor Comercial</strong> — <span style={{ color: 'var(--text-muted)' }}>Carlos Gómez (Punto de Venta POS)</span>
              </div>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '0.5rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>o ingresar manualmente</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        </div>

        {/* STANDARD MANUAL LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="ejemplo@farmacia.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <KeyRound size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', fontSize: '0.9375rem' }}
          >
            <LogIn size={16} />
            <span>Ingresar de Forma Segura</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>¿No tienes una cuenta de farmacia? </span>
          <button 
            type="button" 
            className="btn btn-ghost" 
            style={{ padding: '0.25rem', color: 'var(--primary)', fontWeight: 600 }}
            onClick={() => setView('register')}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};
