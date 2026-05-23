import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { 
  TrendingUp, Users, Building, Activity, DollarSign, 
  Sparkles, CheckCircle2, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export const SuperDashboard: React.FC = () => {
  const { pharmacies, sales } = useApp();

  // 1. Calculate SaaS metrics
  const activePharmacies = pharmacies.filter(p => p.status === 'Activo').length;
  const trialPharmacies = pharmacies.filter(p => p.status === 'En Prueba').length;
  const totalPharmacies = pharmacies.length;
  
  // Calculate SaaS MRR (Monthly Recurring Revenue) based on active pharmacies
  const totalMRR = pharmacies
    .filter(p => p.status === 'Activo' || p.status === 'En Prueba') // En prueba count but Básico
    .reduce((sum, p) => sum + p.mrr, 0);

  // Total sales volume across all pharmacies on the platform
  const totalTxVolume = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  // 2. Tiers counts
  const planCounts = pharmacies.reduce((acc, p) => {
    acc[p.plan] = (acc[p.plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div 
        className="glass-card flex-between"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08))',
          borderColor: 'var(--border-color-active)'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--primary)' }} />
            <span>Consola del Super-Administrador SaaS</span>
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Supervisa el crecimiento de suscripciones, estados de facturación y métricas de transacciones globales.
          </p>
        </div>
        <span className="badge badge-success">Consola Activa</span>
      </div>

      {/* SaaS KPIs */}
      <div className="grid-4">
        <StatCard 
          title="MRR Plataforma" 
          value={`$${totalMRR.toLocaleString()}`} 
          icon={<TrendingUp size={20} />} 
          description="Ingreso Recurrente Mensual"
          trend={{ value: '+12.4%', type: 'up' }}
          glowColor="#10b981"
        />
        
        <StatCard 
          title="Farmacias Activas" 
          value={activePharmacies} 
          icon={<Building size={20} />} 
          description={`${totalPharmacies} total registradas`}
          trend={{ value: `${trialPharmacies} en prueba`, type: 'neutral' }}
          glowColor="#06b6d4"
        />

        <StatCard 
          title="Ventas Totales (POS)" 
          value={`$${totalTxVolume.toLocaleString()}`} 
          icon={<DollarSign size={20} />} 
          description="Volumen procesado en cajas"
          trend={{ value: '+8.2%', type: 'up' }}
          glowColor="#f59e0b"
        />

        <StatCard 
          title="Uso de la Plataforma" 
          value="99.98%" 
          icon={<Activity size={20} />} 
          description="Tiempo de actividad del server"
          trend={{ value: 'Estable', type: 'up' }}
          glowColor="#3b82f6"
        />
      </div>

      {/* Main SaaS Analytics Grid */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        
        {/* Left Side: Monthly growth simulator */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Crecimiento del MRR SaaS (Últimos 5 meses)</h3>
          
          {/* Custom SVG Bar Graph */}
          <div 
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 1rem',
              gap: '1rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.5rem'
            }}
          >
            {/* Ene */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '60px', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '4px 4px 0 0',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '0.6875rem' }}>$180</div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ene</span>
            </div>

            {/* Feb */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '85px', 
                  background: 'rgba(255,255,255,0.08)', 
                  borderRadius: '4px 4px 0 0',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '0.6875rem' }}>$230</div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Feb</span>
            </div>

            {/* Mar */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '110px', 
                  background: 'rgba(255,255,255,0.12)', 
                  borderRadius: '4px 4px 0 0',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '0.6875rem' }}>$278</div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mar</span>
            </div>

            {/* Abr */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '135px', 
                  background: 'rgba(6, 182, 212, 0.4)', 
                  borderRadius: '4px 4px 0 0',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '0.6875rem' }}>$320</div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Abr</span>
            </div>

            {/* May (Current dynamic month based on MRR calculation) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: `${Math.min(180, (totalMRR / 500) * 180)}px`, 
                  background: 'linear-gradient(to top, var(--primary-hover), var(--primary))', 
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  boxShadow: 'var(--shadow-glow)',
                  transition: 'height var(--transition-slow)'
                }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '0.6875rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                  ${totalMRR}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>Mayo</span>
            </div>
          </div>
          
          <div className="flex-between" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <span>Métrica calculada en tiempo real según suscripciones de farmacias.</span>
            <span style={{ color: 'var(--primary)' }}>Crecimiento Mayo: +{Math.round(((totalMRR - 320)/320)*100)}%</span>
          </div>
        </div>

        {/* Right Side: Subscription tier distributions */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Distribución de Planes</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Enterprise Tier */}
            <div>
              <div className="flex-between" style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                <span>Enterprise ($149)</span>
                <strong>{planCounts['Enterprise'] || 0} ({Math.round(((planCounts['Enterprise'] || 0) / totalPharmacies) * 100)}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${((planCounts['Enterprise'] || 0) / totalPharmacies) * 100}%`, height: '100%', background: 'var(--secondary)' }} />
              </div>
            </div>

            {/* Pro Tier */}
            <div>
              <div className="flex-between" style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                <span>Pro ($79)</span>
                <strong>{planCounts['Pro'] || 0} ({Math.round(((planCounts['Pro'] || 0) / totalPharmacies) * 100)}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${((planCounts['Pro'] || 0) / totalPharmacies) * 100}%`, height: '100%', background: 'var(--primary)' }} />
              </div>
            </div>

            {/* Básico Tier */}
            <div>
              <div className="flex-between" style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                <span>Básico ($39)</span>
                <strong>{planCounts['Básico'] || 0} ({Math.round(((planCounts['Básico'] || 0) / totalPharmacies) * 100)}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${((planCounts['Básico'] || 0) / totalPharmacies) * 100}%`, height: '100%', background: '#f59e0b' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layout: Latest Pharmacies Feed */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Actividad Reciente del SaaS</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pharmacies.map((pharmacy) => (
            <div 
              key={pharmacy.id} 
              className="flex-between"
              style={{
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <div className="flex-align" style={{ gap: '0.75rem' }}>
                <div 
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: pharmacy.status === 'Activo' ? '#10b981' : pharmacy.status === 'En Prueba' ? '#f59e0b' : '#ef4444'
                  }}
                />
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>{pharmacy.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Registrada el {pharmacy.joinedDate} por {pharmacy.ownerName}
                  </div>
                </div>
              </div>

              <div className="flex-align" style={{ gap: '1rem' }}>
                <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{pharmacy.plan}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>+${pharmacy.mrr}/mes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
