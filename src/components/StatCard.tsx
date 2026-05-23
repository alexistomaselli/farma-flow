import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    type: 'up' | 'down' | 'neutral';
  };
  glowColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  glowColor = '#10b981'
}) => {
  return (
    <div 
      className="glass-card animate-fade-in"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: glowColor,
          opacity: 0.08,
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />
      
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <span 
          style={{ 
            fontSize: '0.8125rem', 
            fontWeight: 600, 
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </span>
        <div 
          style={{ 
            color: glowColor, 
            background: `rgba(${glowColor === '#10b981' ? '16, 185, 129' : glowColor === '#06b6d4' ? '6, 182, 212' : '245, 158, 11'}, 0.1)`,
            padding: '0.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
      </div>
      
      <div>
        <h3 
          style={{ 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            marginBottom: '0.25rem' 
          }}
        >
          {value}
        </h3>
        
        {description && (
          <div className="flex-align" style={{ fontSize: '0.75rem' }}>
            {trend && (
              <span 
                style={{ 
                  fontWeight: 600,
                  color: trend.type === 'up' ? '#34d399' : trend.type === 'down' ? '#f87171' : 'var(--text-muted)',
                  marginRight: '0.25rem'
                }}
              >
                {trend.type === 'up' ? '▲' : trend.type === 'down' ? '▼' : '●'} {trend.value}
              </span>
            )}
            <span style={{ color: 'var(--text-muted)' }}>{description}</span>
          </div>
        )}
      </div>
    </div>
  );
};
