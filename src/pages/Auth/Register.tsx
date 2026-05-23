import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Store, CreditCard, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';

export const Register: React.FC = () => {
  const { registerPharmacySaaS, setView } = useApp();
  const [step, setStep] = useState(1);

  // Form Fields
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [pharmacyName, setPharmacyName] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [plan, setPlan] = useState<'Básico' | 'Pro' | 'Enterprise'>('Pro');

  const [ccNumber, setCcNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvc, setCcCvc] = useState('');

  const nextStep = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !email || !pharmacyName || !address) {
      alert('Por favor complete los campos requeridos.');
      return;
    }
    // Call Context to register new pharmacy
    registerPharmacySaaS({
      pharmacyName,
      ownerName,
      email,
      plan,
      address
    });
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
          maxWidth: '520px',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Registro de Nueva Farmacia</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
            Únete a FarmaFlow y moderniza tu sucursal en minutos
          </p>
        </div>

        {/* STEP PROGRESS BAR */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            position: 'relative',
            padding: '0 1rem'
          }}
        >
          {/* Connector Line */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '16px', 
              left: '10%', 
              right: '10%', 
              height: '2px', 
              backgroundColor: 'var(--border-color)',
              zIndex: 1
            }} 
          />
          <div 
            style={{ 
              position: 'absolute', 
              top: '16px', 
              left: '10%', 
              width: step === 1 ? '0%' : step === 2 ? '40%' : '80%', 
              height: '2px', 
              backgroundColor: 'var(--primary)',
              zIndex: 2,
              transition: 'width var(--transition-normal)'
            }} 
          />

          {/* Step 1 Indicator */}
          <div 
            style={{ 
              zIndex: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '0.25rem',
              cursor: 'pointer' 
            }}
            onClick={() => step > 1 && setStep(1)}
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--bg-surface)',
                color: step >= 1 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: `2px solid ${step >= 1 ? 'var(--primary)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              {step > 1 ? <Check size={14} /> : '1'}
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: step >= 1 ? 'white' : 'var(--text-muted)' }}>Propietario</span>
          </div>

          {/* Step 2 Indicator */}
          <div 
            style={{ 
              zIndex: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '0.25rem',
              cursor: 'pointer' 
            }}
            onClick={() => step > 2 && setStep(2)}
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--bg-surface)',
                color: step >= 2 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: `2px solid ${step >= 2 ? 'var(--primary)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              {step > 2 ? <Check size={14} /> : '2'}
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: step >= 2 ? 'white' : 'var(--text-muted)' }}>Farmacia</span>
          </div>

          {/* Step 3 Indicator */}
          <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step === 3 ? 'var(--primary)' : 'var(--bg-surface)',
                color: step === 3 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: `2px solid ${step === 3 ? 'var(--primary)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              '3'
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: step === 3 ? 'white' : 'var(--text-muted)' }}>Suscripción</span>
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <form onSubmit={handleSubmit} style={{ minHeight: '260px', display: 'flex', flexDirection: 'column' }}>
          
          {/* STEP 1: OWNER DETAILS */}
          {step === 1 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }} className="flex-align">
                <User size={16} />
                <span>Datos del Propietario / Farmacéutico</span>
              </h3>
              
              <div className="form-group">
                <label>Nombre y Apellido *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Dr. Alejandro Benítez"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email de Contacto *</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="contacto@farmacia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contraseña de Acceso *</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 2: PHARMACY DETAILS */}
          {step === 2 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }} className="flex-align">
                <Store size={16} />
                <span>Información Comercial de la Farmacia</span>
              </h3>
              
              <div className="form-group">
                <label>Nombre Comercial de la Farmacia *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Farmacia Nueva Central"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dirección Física *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Av. Corrientes 1482, CABA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>RUT / CUIT (Tax ID)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="30-71123456-9"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Plan Inicial</label>
                  <select 
                    className="form-control" 
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as any)}
                  >
                    <option value="Básico">Básico ($39/mes)</option>
                    <option value="Pro">Pro ($79/mes)</option>
                    <option value="Enterprise">Enterprise ($149/mes)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BILLING & CHECKOUT */}
          {step === 3 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }} className="flex-align">
                <CreditCard size={16} />
                <span>Simulación de Pasarela de Cobro</span>
              </h3>
              
              <div 
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px', 
                  padding: '1rem',
                  marginBottom: '0.5rem'
                }}
              >
                <div className="flex-between" style={{ fontSize: '0.875rem' }}>
                  <span>Plan Seleccionado:</span>
                  <strong>FarmaFlow {plan}</strong>
                </div>
                <div className="flex-between" style={{ fontSize: '1.125rem', marginTop: '0.25rem', fontWeight: 'bold' }}>
                  <span>A Cobrar Mensualmente:</span>
                  <span style={{ color: 'var(--primary)' }}>${plan === 'Básico' ? '39' : plan === 'Pro' ? '79' : '149'}/mes</span>
                </div>
              </div>

              <div className="form-group">
                <label>Número de Tarjeta de Crédito (Ficticia)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="4512 7709 8812 3400"
                  value={ccNumber}
                  onChange={(e) => setCcNumber(e.target.value)}
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Vencimiento</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="MM/AA"
                    value={ccExpiry}
                    onChange={(e) => setCcExpiry(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>CVC / Código de Seguridad</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="345"
                    value={ccCvc}
                    onChange={(e) => setCcCvc(e.target.value)}
                  />
                </div>
              </div>

              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block' }}>
                🔒 Este es un prototipo comercial. No se realizará ningún cargo real en tu tarjeta.
              </span>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div 
            style={{ 
              marginTop: 'auto', 
              display: 'flex', 
              justifyContent: 'space-between', 
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)' 
            }}
          >
            {step > 1 ? (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={prevStep}
              >
                <ChevronLeft size={16} />
                <span>Atrás</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-ghost"
                onClick={() => setView('login')}
              >
                ¿Ya tienes cuenta?
              </button>
            )}

            {step < 3 ? (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={nextStep}
                disabled={step === 1 ? (!ownerName || !email) : (!pharmacyName || !address)}
              >
                <span>Siguiente</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary pulse-glow"
                style={{ background: 'var(--primary)' }}
              >
                <Sparkles size={16} />
                <span>Finalizar Registro y Demo</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
