import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, ShoppingCart, Users, BarChart3, Pill, Sparkles, 
  ArrowRight, Check, HelpCircle, ChevronDown, Award, FileText
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView } = useApp();
  
  // Calculator States
  const [branches, setBranches] = useState(1);
  const [employees, setEmployees] = useState(2);
  
  // FAQ accordion active state
  const [faqActive, setFaqActive] = useState<number | null>(null);

  // Set body background to white on mount, and restore on unmount
  React.useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  // Dynamic pricing calculation
  const calculatePrice = () => {
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
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        color: '#0f172a'
      }}
    >
      {/* LANDING HEADER NAV (White header with image logo) */}
      <header 
        style={{
          width: '100%',
          height: '90px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div 
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo with image */}
          <div 
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setView('landing')}
          >
            <img 
              src="/logo-horizonta-ff.png" 
              alt="FarmaFlow Logo" 
              style={{ 
                height: '42px', 
                objectFit: 'contain'
              }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={() => setView('login')} style={{ color: '#475569', fontWeight: 600 }}>
              Ingresar
            </button>
            <button className="btn btn-primary" onClick={() => setView('register')} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px' }}>
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* TOP BANNER WRAPPER (Hero background only) */}
      <div
        style={{
          backgroundImage: 'url(/background-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1.5rem',
          borderBottom: '1px solid rgba(15, 23, 42, 0.05)'
        }}
      >

      {/* HERO SECTION - TWO COLUMN GRID */}
      <section 
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '3rem 0 5rem 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '3rem',
          alignItems: 'center',
          zIndex: 10
        }}
        className="hero-grid"
      >
        {/* LEFT COLUMN: Texts and Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            gap: '1.5rem',
            textAlign: 'left'
          }}
          className="hero-left-content"
        >
          {/* Badge */}
          <div 
            className="badge badge-success flex-align"
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.75rem',
              background: 'rgba(16, 185, 129, 0.08)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              borderRadius: '999px',
              color: 'var(--primary)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Sparkles size={12} style={{ color: 'var(--primary)' }} />
            <span>SaaS de próxima generación para farmacias</span>
          </div>

          {/* H1 Title in Lowercase structure matching the mockup */}
          <h1 
            style={{ 
              fontSize: '3.4rem', 
              fontWeight: 800, 
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#0f172a',
              margin: 0,
              maxWidth: '550px'
            }}
          >
            Controla tu inventario, ventas y personal en <span style={{ color: '#10b981' }}>una sola interfaz</span>
          </h1>

          {/* Subtitle description */}
          <p 
            style={{ 
              fontSize: '1rem', 
              color: '#475569', 
              maxWidth: '460px',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Diseñado para farmacias modernas de cualquier tamaño. Centraliza el stock con alertas inteligentes, factura rápidamente con descuentos de obras sociales y supervisa a tus vendedores en tiempo real.
          </p>

          {/* CTA Buttons */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.8rem 1.75rem', fontSize: '0.9375rem', borderRadius: '10px' }}
              onClick={() => setView('register')}
            >
              <span>Crear mi Cuenta Demo</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '0.8rem 1.75rem', fontSize: '0.9375rem', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)', color: '#0f172a' }}
              onClick={() => setView('login')}
            >
              <span>Probar la Consola</span>
            </button>
          </div>

          {/* Mini-features bottom row */}
          <div 
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1.5rem',
              width: '100%',
              borderTop: '1px solid rgba(15,23,42,0.06)',
              paddingTop: '1.5rem'
            }}
            className="hero-features"
          >
            {/* feature 1 */}
            <div className="flex-align" style={{ gap: '0.5rem' }}>
              <div 
                style={{ 
                  background: 'rgba(16, 185, 129, 0.08)', 
                  color: 'var(--primary)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Pill size={14} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>Inventario inteligente</strong>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Stock siempre actualizado</span>
              </div>
            </div>

            {/* feature 2 */}
            <div className="flex-align" style={{ gap: '0.5rem' }}>
              <div 
                style={{ 
                  background: 'rgba(16, 185, 129, 0.08)', 
                  color: 'var(--primary)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <FileText size={14} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>Facturación ágil</strong>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Obras sociales y obras</span>
              </div>
            </div>

            {/* feature 3 */}
            <div className="flex-align" style={{ gap: '0.5rem' }}>
              <div 
                style={{ 
                  background: 'rgba(16, 185, 129, 0.08)', 
                  color: 'var(--primary)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Users size={14} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>Control de personal</strong>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Rendimiento en tiempo real</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: The Floating Console Dashboard Simulator */}
        <div 
          style={{ 
            position: 'relative',
            width: '100%',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          }}
          className="hero-right-console"
        >
          {/* Main Console Box */}
          <div 
            style={{
              width: '560px',
              height: '350px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid rgba(15, 23, 42, 0.06)',
              boxShadow: '0 20px 50px -12px rgba(15, 23, 42, 0.12)',
              display: 'flex',
              overflow: 'hidden',
              fontFamily: 'var(--font-sans)',
              zIndex: 1
            }}
          >
            {/* Sidebar of the Mock Console */}
            <div 
              style={{
                width: '125px',
                background: '#f8fafc',
                borderRight: '1px solid rgba(15, 23, 42, 0.05)',
                padding: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                flexShrink: 0
              }}
            >
              {/* Logo block */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.8rem' }}>
                <div style={{ width: '16px', height: '16px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '0.55rem', fontWeight: 900 }}>FF</div>
                <strong style={{ fontSize: '0.6875rem', color: '#0f172a' }}>FarmaFlow</strong>
              </div>

              {/* Sidebar items list */}
              {([
                { name: 'Inicio', active: true },
                { name: 'Inventario' },
                { name: 'Ventas' },
                { name: 'Compras' },
                { name: 'Clientes' },
                { name: 'Proveedores' },
                { name: 'Personal' },
                { name: 'Reportes' },
                { name: 'Configuración' }
              ] as any[]).map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: item.active ? 'var(--primary)' : '#64748b',
                    background: item.active ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: item.active ? 'var(--primary)' : 'transparent' }} />
                  {item.name}
                </div>
              ))}
            </div>

            {/* Main content of the Mock Console */}
            <div 
              style={{
                flex: 1,
                padding: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                minWidth: 0
              }}
            >
              {/* Card Header inside mock console */}
              <div className="flex-between">
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0f172a' }}>Resumen general</span>
                <span style={{ fontSize: '0.55rem', color: '#64748b', background: 'rgba(0,0,0,0.03)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>Hoy, 24 May 2024</span>
              </div>

              {/* 4 Stat Boxes inside console */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem' }}>
                {/* stat 1 */}
                <div style={{ background: '#f8fafc', border: '1px solid rgba(15,23,42,0.03)', padding: '0.35rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.5rem', color: '#64748b', display: 'block' }}>Ventas del día</span>
                  <strong style={{ fontSize: '0.65rem', color: '#0f172a', display: 'block', margin: '0.1rem 0' }}>$ 1.248.600</strong>
                  <span style={{ fontSize: '0.45rem', color: '#10b981', fontWeight: 600 }}>+12.5% vs ayer</span>
                </div>
                
                {/* stat 2 */}
                <div style={{ background: '#f8fafc', border: '1px solid rgba(15,23,42,0.03)', padding: '0.35rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.5rem', color: '#64748b', display: 'block' }}>Órdenes</span>
                  <strong style={{ fontSize: '0.65rem', color: '#0f172a', display: 'block', margin: '0.1rem 0' }}>156</strong>
                  <span style={{ fontSize: '0.45rem', color: '#10b981', fontWeight: 600 }}>+8.3% vs ayer</span>
                </div>

                {/* stat 3 */}
                <div style={{ background: '#f8fafc', border: '1px solid rgba(15,23,42,0.03)', padding: '0.35rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.5rem', color: '#64748b', display: 'block' }}>Productos</span>
                  <strong style={{ fontSize: '0.65rem', color: '#0f172a', display: 'block', margin: '0.1rem 0' }}>2.341</strong>
                  <span style={{ fontSize: '0.45rem', color: '#10b981', fontWeight: 600 }}>+3.1% vs ayer</span>
                </div>

                {/* stat 4 */}
                <div style={{ background: '#f8fafc', border: '1px solid rgba(15,23,42,0.03)', padding: '0.35rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.5rem', color: '#64748b', display: 'block' }}>Stock bajo</span>
                  <strong style={{ fontSize: '0.65rem', color: '#ef4444', display: 'block', margin: '0.1rem 0' }}>23</strong>
                  <span style={{ fontSize: '0.45rem', color: '#ef4444', fontWeight: 600 }}>Ver alertas</span>
                </div>
              </div>

              {/* Split lower panel (Chart left, Top products list right) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.6rem', flex: 1, minHeight: 0 }}>
                {/* Chart Box */}
                <div style={{ border: '1px solid rgba(15,23,42,0.04)', borderRadius: '8px', padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex-between">
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0f172a' }}>Ventas de los últimos 7 días</span>
                    <span style={{ fontSize: '0.45rem', color: '#64748b' }}>Ventas ▼</span>
                  </div>
                  {/* SVG Chart */}
                  <div style={{ flex: 1, minHeight: 0, marginTop: '0.25rem' }}>
                    <svg viewBox="0 0 200 65" width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="c-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 5 55 Q 35 45, 65 52 T 125 25 T 165 30 T 195 10 L 195 65 L 5 65 Z" fill="url(#c-grad)" />
                      <path d="M 5 55 Q 35 45, 65 52 T 125 25 T 165 30 T 195 10" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="125" cy="25" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
                      <circle cx="195" cy="10" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.45rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    <span>18 May</span>
                    <span>20 May</span>
                    <span>22 May</span>
                    <span>24 May</span>
                  </div>
                </div>

                {/* Top products list */}
                <div style={{ border: '1px solid rgba(15,23,42,0.04)', borderRadius: '8px', padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex-between" style={{ borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '0.2rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0f172a' }}>Top productos</span>
                    <span style={{ fontSize: '0.45rem', color: '#10b981', fontWeight: 600 }}>Ver todos</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1, justifyContent: 'space-between', fontSize: '0.5rem' }}>
                    {[
                      { name: 'Amoxicilina 500mg', qty: '320 u.' },
                      { name: 'Ibuprofeno 400mg', qty: '280 u.' },
                      { name: 'Losartán 50mg', qty: '215 u.' },
                      { name: 'Paracetamol 500mg', qty: '190 u.' },
                      { name: 'Omeprazol 20mg', qty: '175 u.' }
                    ].map((p, idx) => (
                      <div key={idx} className="flex-between" style={{ color: '#475569' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                          {p.name}
                        </span>
                        <strong style={{ color: '#0f172a' }}>{p.qty}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CARD 1: Alertas de stock */}
          <div 
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '0px',
              width: '190px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '0.6rem 0.8rem',
              border: '1px solid rgba(15, 23, 42, 0.05)',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              zIndex: 2
            }}
          >
            <div className="flex-between" style={{ borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                🔔 Alertas de stock
              </span>
              <span style={{ fontSize: '0.45rem', color: '#10b981' }}>Ver todas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.5rem' }}>
              {[
                { name: 'Enalapril 10mg', stock: '8 u.' },
                { name: 'Salbutamol Inhalador', stock: '5 u.' },
                { name: 'Diclofenac 50mg', stock: '12 u.' }
              ].map((item, idx) => (
                <div key={idx} className="flex-between">
                  <span style={{ color: '#475569' }}>{item.name}</span>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Stock actual: {item.stock}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FLOATING CARD 2: Actividad del personal */}
          <div 
            style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-10px',
              width: '200px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '0.6rem 0.8rem',
              border: '1px solid rgba(15, 23, 42, 0.05)',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              zIndex: 2
            }}
          >
            <div className="flex-between" style={{ borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                👥 Actividad del personal
              </span>
              <span style={{ fontSize: '0.45rem', color: '#10b981' }}>Ver reporte</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.5rem' }}>
              {[
                { name: 'María González', amt: '$ 528.400' },
                { name: 'Juan Pérez', amt: '$ 412.200' },
                { name: 'Lucía Fernández', amt: '$ 308.700' }
              ].map((item, idx) => (
                <div key={idx} className="flex-between" style={{ color: '#475569' }}>
                  <span>{item.name}</span>
                  <strong style={{ color: '#0f172a' }}>{item.amt} ↗</strong>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      </div>

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
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1px dashed rgba(16, 185, 129, 0.3)',
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
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
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

      {/* Responsive styles injected to ensure grid collapse on tablets and mobiles */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .hero-left-content {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-left-content h1 {
            font-size: 2.5rem !important;
            text-align: center !important;
          }
          .hero-left-content p {
            text-align: center !important;
          }
          .hero-right-console {
            display: none !important; /* Esconde la consola mock en celulares para evitar desbordes */
          }
          .hero-features {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
