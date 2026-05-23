import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Pharmacy, Medication, Seller, AttendanceRecord, Sale, SaleItem,
  initialPharmacies, initialMedications, initialSellers, initialAttendance, initialSales 
} from '../data/mockData';

export type ViewType = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'superadmin-dashboard' 
  | 'superadmin-pharmacies' 
  | 'superadmin-billing' 
  | 'pharmacy-dashboard' 
  | 'pharmacy-medications' 
  | 'pharmacy-pos' 
  | 'pharmacy-sellers' 
  | 'pharmacy-profile';

export interface CurrentUser {
  name: string;
  email: string;
  role: 'superadmin' | 'manager' | 'seller';
  pharmacyId?: string; // Si es manager o seller
  sellerId?: string; // Si es seller
}

interface AppContextProps {
  // State
  currentUser: CurrentUser | null;
  currentView: ViewType;
  pharmacies: Pharmacy[];
  medications: Medication[];
  sellers: Seller[];
  attendance: AttendanceRecord[];
  sales: Sale[];
  
  // Navigation
  setView: (view: ViewType) => void;
  
  // Auth
  loginUser: (email: string, role: 'superadmin' | 'manager' | 'seller', pharmacyId?: string, name?: string, sellerId?: string) => void;
  logoutUser: () => void;
  registerPharmacySaaS: (data: { pharmacyName: string; ownerName: string; email: string; plan: 'Básico' | 'Pro' | 'Enterprise'; address: string }) => void;
  
  // SuperAdmin Methods
  togglePharmacyStatus: (id: string) => void;
  changePharmacyPlan: (id: string, plan: 'Básico' | 'Pro' | 'Enterprise') => void;
  
  // Pharmacy Manager & Inventory
  addMedicationItem: (med: Omit<Medication, 'id' | 'pharmacyId'>) => void;
  updateMedicationItem: (id: string, med: Partial<Medication>) => void;
  deleteMedicationItem: (id: string) => void;
  
  // POS & Sales
  processSale: (data: { 
    sellerId: string; 
    items: { medicationId: string; qty: number }[]; 
    paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia'; 
    insuranceName: string; 
    insuranceDiscount: number; 
  }) => Sale | null;
  
  // Attendance & Timekeeping
  clockInSeller: (sellerId: string) => void;
  clockOutSeller: (sellerId: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  
  // In-memory Database state
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(initialPharmacies);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [sales, setSales] = useState<Sale[]>(initialSales);

  // 1. Navigation Helper
  const setView = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Auth Methods
  const loginUser = (
    email: string, 
    role: 'superadmin' | 'manager' | 'seller', 
    pharmacyId?: string, 
    name?: string,
    sellerId?: string
  ) => {
    const user: CurrentUser = {
      name: name || (role === 'superadmin' ? 'SaaS Super-Admin' : 'Usuario Farmacia'),
      email,
      role,
      pharmacyId,
      sellerId
    };
    setCurrentUser(user);
    
    // Auto-route based on role
    if (role === 'superadmin') {
      setView('superadmin-dashboard');
    } else if (role === 'manager') {
      setView('pharmacy-dashboard');
    } else if (role === 'seller') {
      setView('pharmacy-pos');
      // Poner al vendedor en estado "Online" si no lo estaba
      if (sellerId) {
        setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'Online' } : s));
      }
    }
  };

  const logoutUser = () => {
    // Si era vendedor, ponerlo offline al salir
    if (currentUser?.role === 'seller' && currentUser.sellerId) {
      const sId = currentUser.sellerId;
      setSellers(prev => prev.map(s => s.id === sId ? { ...s, status: 'Offline' } : s));
    }
    
    setCurrentUser(null);
    setView('landing');
  };

  const registerPharmacySaaS = (data: { 
    pharmacyName: string; 
    ownerName: string; 
    email: string; 
    plan: 'Básico' | 'Pro' | 'Enterprise'; 
    address: string; 
  }) => {
    const newId = `ph-${pharmacies.length + 1}`;
    const mrrValues = { Básico: 39, Pro: 79, Enterprise: 149 };
    const logoColors = ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6', '#8b5cf6'];
    const randomColor = logoColors[Math.floor(Math.random() * logoColors.length)];

    const newPharmacy: Pharmacy = {
      id: newId,
      name: data.pharmacyName,
      ownerName: data.ownerName,
      email: data.email,
      plan: data.plan,
      status: 'Activo',
      address: data.address,
      joinedDate: new Date().toISOString().split('T')[0],
      mrr: mrrValues[data.plan],
      logoColor: randomColor
    };

    // Add Pharmacy
    setPharmacies(prev => [newPharmacy, ...prev]);

    // Bootstrap initial medications for this pharmacy so the demo looks full
    const newMeds: Medication[] = [
      {
        id: `med-${newId}-1`,
        pharmacyId: newId,
        sku: `MED-${Math.floor(100000 + Math.random() * 900000)}-01`,
        name: 'Ibuprofeno 600mg (Actron)',
        laboratory: 'Bayer',
        category: 'Analgésico',
        stock: 100,
        minStock: 20,
        priceCost: 450,
        priceSale: 980,
        requiresPrescription: false,
        batchNumber: `L-ACT${Math.floor(1000 + Math.random() * 9000)}`,
        expirationDate: '2028-02-15'
      },
      {
        id: `med-${newId}-2`,
        pharmacyId: newId,
        sku: `MED-${Math.floor(100000 + Math.random() * 900000)}-02`,
        name: 'Amoxicilina 1g (Optamox)',
        laboratory: 'Roemmers',
        category: 'Antibiótico',
        stock: 8, // Stock bajo
        minStock: 15,
        priceCost: 1200,
        priceSale: 2450,
        requiresPrescription: true,
        batchNumber: `L-OPT${Math.floor(1000 + Math.random() * 9000)}`,
        expirationDate: '2026-06-30' // Pronto a vencer
      },
      {
        id: `med-${newId}-3`,
        pharmacyId: newId,
        sku: `MED-${Math.floor(100000 + Math.random() * 900000)}-03`,
        name: 'Paracetamol 500mg (Tafirol)',
        laboratory: 'Genomma Lab',
        category: 'Analgésico',
        stock: 150,
        minStock: 30,
        priceCost: 200,
        priceSale: 420,
        requiresPrescription: false,
        batchNumber: `L-TAF${Math.floor(1000 + Math.random() * 9000)}`,
        expirationDate: '2027-10-10'
      }
    ];
    setMedications(prev => [...prev, ...newMeds]);

    // Bootstrap initial sellers for this pharmacy
    const newSels: Seller[] = [
      {
        id: `sel-${newId}-1`,
        pharmacyId: newId,
        name: `Vendedor 1 - ${data.pharmacyName}`,
        email: `vend1@${newId}.com`,
        totalSales: 0,
        commissionRate: 2.0,
        status: 'Offline'
      },
      {
        id: `sel-${newId}-2`,
        pharmacyId: newId,
        name: `Vendedor 2 - ${data.pharmacyName}`,
        email: `vend2@${newId}.com`,
        totalSales: 0,
        commissionRate: 2.0,
        status: 'Offline'
      }
    ];
    setSellers(prev => [...prev, ...newSels]);

    // Auto-login as the manager of this new pharmacy!
    loginUser(data.email, 'manager', newId, data.ownerName);
  };

  // 3. SuperAdmin Administer
  const togglePharmacyStatus = (id: string) => {
    setPharmacies(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Activo' ? 'Suspendido' : 'Activo';
        return { ...p, status: nextStatus as any };
      }
      return p;
    }));
  };

  const changePharmacyPlan = (id: string, plan: 'Básico' | 'Pro' | 'Enterprise') => {
    const mrrValues = { Básico: 39, Pro: 79, Enterprise: 149 };
    setPharmacies(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, plan, mrr: mrrValues[plan] };
      }
      return p;
    }));
  };

  // 4. Pharmacy Inventory Methods
  const addMedicationItem = (med: Omit<Medication, 'id' | 'pharmacyId'>) => {
    if (!currentUser?.pharmacyId) return;
    const newId = `med-${currentUser.pharmacyId}-${Date.now()}`;
    const newMed: Medication = {
      ...med,
      id: newId,
      pharmacyId: currentUser.pharmacyId
    };
    setMedications(prev => [newMed, ...prev]);
  };

  const updateMedicationItem = (id: string, med: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...med } : m));
  };

  const deleteMedicationItem = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  // 5. Point of Sale & Sales Logic
  const processSale = (data: { 
    sellerId: string; 
    items: { medicationId: string; qty: number }[]; 
    paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia'; 
    insuranceName: string; 
    insuranceDiscount: number; 
  }): Sale | null => {
    if (!currentUser?.pharmacyId) return null;
    const phId = currentUser.pharmacyId;
    
    // Find Seller details
    const seller = sellers.find(s => s.id === data.sellerId);
    const sName = seller ? seller.name : 'Vendedor Desconocido';
    
    // Calculate items list & check stock
    const saleItems: SaleItem[] = [];
    let subtotal = 0;
    
    // Verificaciones y cálculo de importes
    for (const item of data.items) {
      const med = medications.find(m => m.id === item.medicationId);
      if (!med) continue;
      
      // Stock warning or subtraction (we subtract but allow negative mock if needed, though we block in POS UI)
      const qty = item.qty;
      const priceSale = med.priceSale;
      const total = priceSale * qty;
      
      saleItems.push({
        medicationId: item.medicationId,
        name: med.name,
        qty,
        priceSale,
        total
      });
      
      subtotal += total;
    }
    
    if (saleItems.length === 0) return null;
    
    // Apply discount
    const discountAmount = Math.round(subtotal * (data.insuranceDiscount / 100));
    const totalAmount = subtotal - discountAmount;
    
    // Create new Sale object
    const newSaleId = `sal-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newSale: Sale = {
      id: newSaleId,
      pharmacyId: phId,
      sellerId: data.sellerId,
      sellerName: sName,
      date: formattedDate,
      items: saleItems,
      paymentMethod: data.paymentMethod,
      insuranceName: data.insuranceName,
      insuranceDiscount: data.insuranceDiscount,
      subtotal,
      discountAmount,
      totalAmount
    };

    // 1. Deduct Stock in inventory
    setMedications(prev => prev.map(m => {
      const purchased = data.items.find(pi => pi.medicationId === m.id);
      if (purchased) {
        return { ...m, stock: Math.max(0, m.stock - purchased.qty) };
      }
      return m;
    }));
    
    // 2. Increment Seller Total Sales
    setSellers(prev => prev.map(s => {
      if (s.id === data.sellerId) {
        return { ...s, totalSales: s.totalSales + totalAmount };
      }
      return s;
    }));
    
    // 3. Add to Sales Database
    setSales(prev => [newSale, ...prev]);
    
    return newSale;
  };

  // 6. Timekeeping
  const clockInSeller = (sellerId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    const clockInStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    // Determinar si ingresó tarde (suponiendo entrada estándar 08:30)
    const isLate = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 30);
    const status = isLate ? 'Tarde' : 'A Tiempo';

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      sellerId,
      date: todayStr,
      clockIn: clockInStr,
      clockOut: null,
      status
    };

    setAttendance(prev => [newRecord, ...prev]);
    
    // Poner al vendedor online
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'Online' } : s));
  };

  const clockOutSeller = (sellerId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    const clockOutStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    setAttendance(prev => prev.map(r => {
      // Buscar el registro de hoy que esté abierto
      if (r.sellerId === sellerId && r.date === todayStr && r.clockOut === null) {
        return { ...r, clockOut: clockOutStr };
      }
      return r;
    }));
    
    // Poner al vendedor offline
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'Offline' } : s));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentView,
      pharmacies,
      medications,
      sellers,
      attendance,
      sales,
      setView,
      loginUser,
      logoutUser,
      registerPharmacySaaS,
      togglePharmacyStatus,
      changePharmacyPlan,
      addMedicationItem,
      updateMedicationItem,
      deleteMedicationItem,
      processSale,
      clockInSeller,
      clockOutSeller
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
