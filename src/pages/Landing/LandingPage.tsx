import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, ShoppingCart, Users, BarChart3, Pill, Sparkles, 
  ArrowRight, Check, HelpCircle, ChevronDown, Award 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView } = useApp();
  
  // Calculator States
  const [branches, setBranches] = useState(1);
  const [employees, setEmployees] = useState(2);
  
  // FAQ accordion active state
  const [faqActive, setFaqActive] = useState<number | null>(null);

  // Dynamic pricing calculation
  const calculatePrice = () => {
    // Basic logic: base tier depends on branches + employees
    if (branches > 5 || employees > 15) {
      return { price: 149, tier: 'Enterprise', limit: 'Ilimitados' };
    } else if (branches > 1 || employees > 4) {
      return { price: 79, tier: 'Pro', limit: 'Hasta 5 sucursales' };
    } else {
      return { price: 39, tier: 'Básico', limit: '1 sucursal, 2 vendedores' };
    }
  };

  const planCalc = calculatePrice();

  const faqs = [
    {
      q: '¿Cómo funciona la demo del prototipo?',
      a: 'Este es un prototipo interactivo 100% reactivo. Puedes registrar una farmacia ficticia, simular ventas en el Punto de Venta (POS) que afectarán el inventario, registrar la asistencia de tus empleados y visualizar reportes con KPIs de rendimiento. Todo ocurre en memoria en tiempo real, facilitando la presentación comercial.'
    },
    {
      q: '¿Se puede conectar con lectores de código de barras y ticketeadoras?',
      a: 'Sí. FarmaFlow está diseñado para ser compatible con cualquier lector USB estándar en modo teclado y con impresoras térmicas de tickets (80mm/58mm) mediante controladores del navegador estándar.'
    },
    {
      q: '¿Cómo se integrará con Supabase en el futuro?',
      a: 'La arquitectura está construida sobre Contextos que replican la estructura relacional de Supabase. Una vez aprobada la interfaz, conectaremos las APIs y Row-Level Security (RLS) de Supabase para almacenar la información de forma segura en la nube en cuestión de horas.'
    },
    {
      q: '¿Ofrecen soporte y capacitación?',
      a: 'Sí. El plan Pro y Enterprise incluyen soporte técnico 24/7 y sesiones de onboarding para capacitar a tus vendedores y dueños de sucursales.'
    }
  ];

  return (
    <div 
      style={{
        backgroundColor: 'var(--bg-base)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 1rem'
      }}
    >
      {/* LANDING HEADER NAV */}
      <header 
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            style={{ 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'var(--text-inverse)',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}
          >
            FF
          </div>
          <strong style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>FarmaFlow</strong>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-ghost" onClick={() => setView('login')}>
            Ingresar
          </button>
          <button className="btn btn-primary" onClick={() => setView('register')}>
            Registrarse
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        style={{
          width: '100%',
          maxWidth: '1000px',
          textAlign: 'center',
          padding: '5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)), url(/background-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginTop: '1rem'
        }}
      >
        <div 
          className="badge badge-success flex-align pulse-glow"
          style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '0.8125rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'var(--primary)'
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--primary)' }} />
          <span>SaaS de Próxima Generación para Farmacias</span>
        </div>

        <h1 
          style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            background: 'linear-gradient(180deg, var(--text-primary) 30%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            maxWidth: '800px',
            margin: '0.5rem 0'
          }}
        >
          Controla tu Inventario, Ventas y Personal en una Sola Interfaz
        </h1>

        <p 
          style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '650px',
            lineHeight: 1.6
          }}
        >
          Diseñado para farmacias modernas de cualquier tamaño. Centraliza el stock con alertas inteligentes, factura rápidamente con descuentos de obras sociales y supervisa a tus vendedores en tiempo real.
        </p>

        <div 
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <button 
            className="btn btn-primary btn-large" 
            style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
            onClick={() => setView('register')}
          >
            <span>Crear mi Cuenta Demo</span>
            <ArrowRight size={18} />
          </button>
          <button 
            className="btn btn-secondary btn-large" 
            style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
            onClick={() => setView('login')}
          >
            <span>Probar la Consola</span>
          </button>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section 
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '4rem 1rem',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Una Plataforma Todo en Uno
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Herramientas robustas diseñadas para maximizar las ganancias y el control operativo.
          </p>
        </div>

        <div className="grid-4">
          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Pill size={32} /></div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Control de Medicamentos</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Alertas visuales automatizadas de stock crítico y vencimiento por lotes para evitar pérdidas financieras.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><ShoppingCart size={32} /></div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Punto de Venta POS</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Carrito intuitivo compatible con lector de barras y cálculo instantáneo de copagos por obras sociales.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ color: '#f59e0b', marginBottom: '1rem' }}><Users size={32} /></div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Gestión de Vendedores</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Registro de asistencia diaria (clock-in) y cálculo automatizado de comisiones por volumen vendido.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><BarChart3 size={32} /></div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>KPIs de Rendimiento</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Reportes financieros instantáneos: ventas totales, ganancias netas reales y ranking de vendedores.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICING CALCULATOR */}
      <section 
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '4rem 1.5rem',
          background: 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.05), transparent 60%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          margin: '3rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 className="flex-align" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', justifyContent: 'center', gap: '0.5rem' }}>
            <Award style={{ color: 'var(--secondary)' }} />
            <span>Calculadora de Precios Inteligente</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Ajusta los sliders según el tamaño de tu red y mira qué plan FarmaFlow necesitas.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Sucursales Slider */}
          <div>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Número de Sucursales:</span>
              <strong style={{ color: 'var(--secondary)', fontSize: '1.125rem' }}>{branches} {branches === 1 ? 'sucursal' : 'sucursales'}</strong>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={branches} 
              onChange={(e) => setBranches(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--secondary)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Vendedores Slider */}
          <div>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Empleados / Vendedores:</span>
              <strong style={{ color: 'var(--primary)', fontSize: '1.125rem' }}>{employees} {employees === 1 ? 'vendedor' : 'vendedores'}</strong>
            </div>
            <input 
              type="range" 
              min="1" 
              max="40" 
              value={employees} 
              onChange={(e) => setEmployees(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--primary)',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* Dynamic Calculator Output */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Plan Recomendado
            </span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
              FarmaFlow {planCalc.tier}
            </h4>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
              <span className="flex-align"><Check size={12} style={{ color: 'var(--primary)' }} /> {planCalc.limit}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Costo Mensual
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
              ${planCalc.price}
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/mes</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', justifyContent: 'center' }}
          onClick={() => setView('register')}
        >
          Comenzar en Plan {planCalc.tier} Gratis
        </button>
      </section>

      {/* FAQ ACCORDION */}
      <section 
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '4rem 1rem',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Preguntas Frecuentes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Todo lo que necesitas saber sobre el prototipo comercial y la plataforma SaaS.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isActive = faqActive === idx;
            return (
              <div 
                key={idx}
                className="glass-card"
                style={{ 
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
                  transition: 'border-color var(--transition-fast)'
                }}
                onClick={() => setFaqActive(isActive ? null : idx)}
              >
                <div className="flex-between">
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HelpCircle size={16} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transform: isActive ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)',
                      color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                    }} 
                  />
                </div>

                {isActive && (
                  <div 
                    style={{ 
                      marginTop: '0.75rem', 
                      paddingTop: '0.75rem', 
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      animation: 'fadeIn 0.2s forwards'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LANDING FOOTER */}
      <footer 
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '3rem 1rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div>
          <strong>FarmaFlow SaaS</strong> &copy; {new Date().getFullYear()} — Diseñado para presentaciones comerciales exclusivas.
        </div>
        <div>
          Prototipo de alta fidelidad construido en React y optimizado para visualizaciones cliente.
        </div>
      </footer>
    </div>
  );
};
