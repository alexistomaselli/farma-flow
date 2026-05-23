import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Pill, ShoppingCart, Users, Store, LogOut, Menu, X, 
  ChevronRight, Sparkles, Building, CreditCard, ShieldCheck, RefreshCw 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, currentView, setView, logoutUser, pharmacies, sellers, loginUser } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);

  if (!currentUser) {
    return <>{children}</>;
  }

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (currentUser.role === 'superadmin') {
      return [
        { view: 'superadmin-dashboard', label: 'Dashboard SaaS', icon: <LayoutDashboard size={18} /> },
        { view: 'superadmin-pharmacies', label: 'Farmacias Clientes', icon: <Building size={18} /> },
        { view: 'superadmin-billing', label: 'Suscripciones y Cobros', icon: <CreditCard size={18} /> },
      ];
    } else {
      const links = [
        { view: 'pharmacy-pos', label: 'Punto de Venta (POS)', icon: <ShoppingCart size={18} /> },
        { view: 'pharmacy-medications', label: 'Inventario / Medicamentos', icon: <Pill size={18} /> },
        { view: 'pharmacy-sellers', label: 'Asistencia y Vendedores', icon: <Users size={18} /> },
      ];
      
      // Managers get access to the Dashboard and general Profile settings
      if (currentUser.role === 'manager') {
        links.unshift({ view: 'pharmacy-dashboard', label: 'Dashboard Negocio', icon: <LayoutDashboard size={18} /> });
        links.push({ view: 'pharmacy-profile', label: 'Configuración / Supabase', icon: <Store size={18} /> });
      }
      
      return links;
    }
  };

  const links = getNavLinks();

  const activePharmacy = pharmacies.find(p => p.id === currentUser.pharmacyId);

  // Quick switch function to easily show different parts of the demo
  const handleQuickSwitch = (role: 'superadmin' | 'manager' | 'seller', email: string, pharmacyId?: string, name?: string, sellerId?: string) => {
    loginUser(email, role, pharmacyId, name, sellerId);
    setShowQuickSwitcher(false);
    setMobileOpen(false);
  };

  return (
    <div 
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* SIDEBAR - DESKTOP */}
      <aside
        style={{
          width: '260px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          flexShrink: 0
        }}
        className="hide-mobile"
      >
        {/* Sidebar Header */}
        <div 
          style={{ 
            padding: '1.5rem', 
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem' 
          }}
        >
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
              fontWeight: 800,
              fontSize: '1.125rem',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            FF
          </div>
          <div>
            <h1 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 800, letterSpacing: '-0.5px' }}>FarmaFlow</h1>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              SaaS Prototipo
            </span>
          </div>
        </div>

        {/* User Info & Quick Switcher Launcher */}
        <div 
          style={{ 
            padding: '1.25rem', 
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="flex-between">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', minWidth: 0 }}>
              <div 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: activePharmacy?.logoColor || 'var(--primary)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  color: 'white',
                  flexShrink: 0
                }}
              >
                {currentUser.name[0]}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }} className="flex-align">
                  {currentUser.role === 'superadmin' ? (
                    <span className="badge badge-success" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}><ShieldCheck size={10} /> SaaS Admin</span>
                  ) : activePharmacy ? (
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                      {activePharmacy.name}
                    </span>
                  ) : (
                    <span>Farmacia Demo</span>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              className="btn btn-ghost" 
              style={{ padding: '0.25rem' }} 
              onClick={() => setShowQuickSwitcher(!showQuickSwitcher)}
              title="Cambiar de Rol Rápido (Demo)"
            >
              <RefreshCw size={14} style={{ color: 'var(--secondary)' }} />
            </button>
          </div>

          {/* QUICK ACCOUNT SWITCHER DROPDOWN */}
          {showQuickSwitcher && (
            <div 
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '0.25rem' }}>
                Simular Otro Perfil:
              </span>
              
              {/* Opción Superadmin */}
              <button 
                onClick={() => handleQuickSwitch('superadmin', 'admin@farmaflow.saas')}
                style={{
                  textAlign: 'left',
                  background: currentUser.role === 'superadmin' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                SaaS Super-Admin
              </button>

              {/* Opción Manager Farmacia 1 */}
              <button 
                onClick={() => handleQuickSwitch('manager', 'contacto@nuevacentral.com', 'ph-1', 'Dr. Alejandro Benítez')}
                style={{
                  textAlign: 'left',
                  background: (currentUser.role === 'manager' && currentUser.pharmacyId === 'ph-1') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#06b6d4' }} />
                Dueño Nueva Central
              </button>

              {/* Opción Vendedor Farmacia 1 */}
              <button 
                onClick={() => handleQuickSwitch('seller', 'carlos@nuevacentral.com', 'ph-1', 'Carlos Gómez', 'sel-1')}
                style={{
                  textAlign: 'left',
                  background: currentUser.role === 'seller' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                Vendedor Carlos (Central)
              </button>

              {/* Opción Manager Farmacia 2 */}
              <button 
                onClick={() => handleQuickSwitch('manager', 'contacto@farmasalud.com', 'ph-2', 'Dra. Mónica Vázquez')}
                style={{
                  textAlign: 'left',
                  background: (currentUser.role === 'manager' && currentUser.pharmacyId === 'ph-2') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                Dueño FarmaSalud
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {links.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => setView(link.view as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: isActive ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.15), transparent)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  paddingLeft: isActive ? 'calc(1rem - 3px)' : '1rem'
                }}
                className="sidebar-link-hover"
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={logoutUser}
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          display: 'none', // Shown in CSS media queries
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          zIndex: 99
        }}
        className="show-mobile-flex"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="btn btn-ghost"
            style={{ padding: '0.25rem' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <strong style={{ fontSize: '1rem', letterSpacing: '-0.5px' }}>FarmaFlow</strong>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
            {currentUser.role.toUpperCase()}
          </span>
          <button 
            className="btn btn-ghost" 
            style={{ padding: '0.25rem' }}
            onClick={logoutUser}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER DRAWER */}
      {mobileOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-base)',
            zIndex: 98,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            gap: '1rem'
          }}
          className="show-mobile"
        >
          {/* Quick account switch for mobile */}
          <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Cambiar Rol Demo:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleQuickSwitch('superadmin', 'admin@farmaflow.saas')}>SaaS Admin</button>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleQuickSwitch('manager', 'contacto@nuevacentral.com', 'ph-1', 'Dr. Alejandro Benítez')}>Dueño Central</button>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleQuickSwitch('seller', 'carlos@nuevacentral.com', 'ph-1', 'Carlos Gómez', 'sel-1')}>Vendedor Carlos</button>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {links.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => {
                    setView(link.view as any);
                    setMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1rem',
                    textAlign: 'left',
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          width: '100%'
        }}
      >
        {/* Top Header Panel - Desktop only */}
        <header
          style={{
            height: '60px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            background: 'var(--bg-surface)',
            flexShrink: 0
          }}
          className="hide-mobile"
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }} className="flex-align">
            {currentUser.role === 'superadmin' ? (
              <span style={{ color: 'var(--secondary)' }}>Panel de Control Global SaaS</span>
            ) : (
              <span>Farmacia: <strong style={{ color: 'var(--primary)' }}>{activePharmacy?.name}</strong></span>
            )}
          </h2>
          
          <div className="flex-align" style={{ gap: '1rem' }}>
            {currentUser.role === 'seller' && (
              <span className="badge badge-success" style={{ animation: 'pulseGlow 2s infinite' }}>
                🟢 Sesión de Ventas Activa
              </span>
            )}
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Acceso: <strong>{currentUser.email}</strong>
            </span>
          </div>
        </header>

        {/* Dynamic Inner View Content */}
        <div 
          style={{
            flex: 1,
            padding: '2rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
          className="view-content-padding"
        >
          {children}
        </div>
      </main>

      {/* Style overrides injected inside components to guarantee responsive execution without complex setups */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile-flex {
            display: flex !important;
          }
          .show-mobile {
            display: flex !important;
          }
          .view-content-padding {
            padding: 5.5rem 1rem 2rem 1rem !important; /* spacing for mobile top bar */
          }
        }
        
        .sidebar-link-hover:hover {
          background: rgba(255, 255, 255, 0.02) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
    </div>
  );
};
