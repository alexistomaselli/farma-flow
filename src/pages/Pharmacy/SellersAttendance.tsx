import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, UserCheck, Play, Power, Calendar, ShieldCheck } from 'lucide-react';

export const SellersAttendance: React.FC = () => {
  const { currentUser, sellers, attendance, clockInSeller, clockOutSeller } = useApp();
  
  if (!currentUser?.pharmacyId) return null;
  const phId = currentUser.pharmacyId;

  // Filter for CURRENT pharmacy
  const pharmacySellers = sellers.filter(s => s.pharmacyId === phId);
  const sellerIds = pharmacySellers.map(s => s.id);
  const pharmacyAttendance = attendance.filter(r => sellerIds.includes(r.sellerId));

  // Determine if the currently logged-in user is a SELLER, to enable the Clock action
  const activeSeller = pharmacySellers.find(s => s.email === currentUser.email);
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Find today's log for the active seller
  const todayRecord = activeSeller 
    ? pharmacyAttendance.find(r => r.sellerId === activeSeller.id && r.date === todayStr) 
    : null;

  const isClockedIn = todayRecord && todayRecord.clockOut === null;
  const isClockedOut = todayRecord && todayRecord.clockOut !== null;

  const handleClockIn = () => {
    if (activeSeller) {
      clockInSeller(activeSeller.id);
      alert(`🕒 Entrada registrada con éxito a las ${new Date().toLocaleTimeString()}`);
    }
  };

  const handleClockOut = () => {
    if (activeSeller) {
      clockOutSeller(activeSeller.id);
      alert(`🕒 Salida registrada con éxito a las ${new Date().toLocaleTimeString()}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. CLOCK-IN / OUT ACTION CARD (Seller Specific Widget) */}
      {activeSeller ? (
        <div 
          className="glass-card flex-between"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06), rgba(16, 185, 129, 0.06))',
            borderColor: 'var(--border-color-active)'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: isClockedIn ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isClockedIn ? 'var(--text-inverse)' : 'var(--text-secondary)'
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                Control de Horario de Personal
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Vendedor: <strong>{activeSeller.name}</strong> | Estado: {' '}
                {isClockedIn ? (
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>CONECTADO</span>
                ) : isClockedOut ? (
                  <span style={{ color: 'var(--text-muted)' }}>TURNO FINALIZADO</span>
                ) : (
                  <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>DESCONECTADO (Pendiente Entrada)</span>
                )}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!todayRecord ? (
              <button 
                className="btn btn-primary flex-align"
                style={{ padding: '0.6rem 1.25rem' }}
                onClick={handleClockIn}
              >
                <Play size={14} />
                <span>Marcar Entrada</span>
              </button>
            ) : isClockedIn ? (
              <button 
                className="btn btn-danger flex-align"
                style={{ padding: '0.6rem 1.25rem', animation: 'pulseGlow 2s infinite' }}
                onClick={handleClockOut}
              >
                <Power size={14} />
                <span>Marcar Salida</span>
              </button>
            ) : (
              <span className="badge badge-success">Jornada Completada</span>
            )}
          </div>
        </div>
      ) : (
        <div 
          className="glass-card"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderStyle: 'dashed'
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }} className="flex-align">
            <ShieldCheck size={16} />
            <span>Consola de Propietario: Acceso de lectura de asistencia para todos los empleados de la farmacia.</span>
          </span>
        </div>
      )}

      {/* 2. SELLERS COMMISSION & PERFORMANCE BOARD */}
      <div className="glass-card table-container">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, padding: '1rem 1rem 0 1rem', margin: 0 }}>Ventas Totales y Comisiones</h3>
        <table className="custom-table" style={{ marginTop: '0.5rem' }}>
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Contacto</th>
              <th>Estado Conexión</th>
              <th>Tasa Comisión</th>
              <th>Monto Total Vendido</th>
              <th>Comisión Acumulada</th>
            </tr>
          </thead>
          <tbody>
            {pharmacySellers.map((seller) => {
              // Calc Commission
              const commissionVal = Math.round(seller.totalSales * (seller.commissionRate / 100));
              
              return (
                <tr key={seller.id}>
                  <td>
                    <strong>{seller.name}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{seller.email}</span>
                  </td>
                  <td>
                    {seller.status === 'Online' ? (
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Online / En Caja</span>
                    ) : (
                      <span className="badge badge-info" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>Offline</span>
                    )}
                  </td>
                  <td>
                    <span>{seller.commissionRate}%</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.9375rem' }}>${seller.totalSales.toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--primary)' }}>${commissionVal.toLocaleString()}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. SHIFT ATTENDANCE LOGS */}
      <div className="glass-card table-container">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, padding: '1rem 1rem 0 1rem', margin: 0 }} className="flex-align">
          <Calendar size={16} />
          <span>Historial de Marcación de Entrada/Salida</span>
        </h3>
        <table className="custom-table" style={{ marginTop: '0.5rem' }}>
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Fecha Turno</th>
              <th>Hora Ingreso</th>
              <th>Hora Salida</th>
              <th>Estado Entrada</th>
            </tr>
          </thead>
          <tbody>
            {pharmacyAttendance.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                  No hay marcas de asistencia registradas para esta farmacia.
                </td>
              </tr>
            ) : (
              pharmacyAttendance.map((record) => {
                const seller = pharmacySellers.find(s => s.id === record.sellerId);
                const sName = seller ? seller.name : 'Vendedor';

                return (
                  <tr key={record.id}>
                    <td>
                      <strong>{sName}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{record.date}</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace' }}>{record.clockIn}</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace' }}>{record.clockOut || '--:--:-- (En Caja)'}</span>
                    </td>
                    <td>
                      <span 
                        className={`badge ${
                          record.status === 'A Tiempo' 
                            ? 'badge-success' 
                            : record.status === 'Tarde' 
                            ? 'badge-warning' 
                            : 'badge-danger'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
