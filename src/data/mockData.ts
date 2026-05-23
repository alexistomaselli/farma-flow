// FarmaFlow SaaS Mock Data Types and Initial Data

export interface Pharmacy {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  plan: 'Básico' | 'Pro' | 'Enterprise';
  status: 'Activo' | 'Suspendido' | 'En Prueba';
  address: string;
  joinedDate: string;
  mrr: number; // Costo de suscripción mensual
  logoColor: string;
}

export interface Medication {
  id: string;
  pharmacyId: string;
  sku: string;
  name: string;
  laboratory: string;
  category: 'Analgésico' | 'Antibiótico' | 'Cardiovascular' | 'Diabetes' | 'Pediátrico' | 'Ventas Libres' | 'Otros';
  stock: number;
  minStock: number; // Para alertas de stock crítico
  priceCost: number;
  priceSale: number;
  requiresPrescription: boolean;
  batchNumber: string;
  expirationDate: string; // Formato YYYY-MM-DD
}

export interface Seller {
  id: string;
  pharmacyId: string;
  name: string;
  email: string;
  totalSales: number;
  commissionRate: number; // Porcentaje, ej: 2 para 2%
  status: 'Online' | 'Offline';
}

export interface AttendanceRecord {
  id: string;
  sellerId: string;
  date: string;
  clockIn: string; // HH:MM:SS
  clockOut: string | null;
  status: 'A Tiempo' | 'Tarde' | 'Ausente';
}

export interface SaleItem {
  medicationId: string;
  name: string;
  qty: number;
  priceSale: number;
  total: number;
}

export interface Sale {
  id: string;
  pharmacyId: string;
  sellerId: string;
  sellerName: string;
  date: string; // YYYY-MM-DD HH:MM
  items: SaleItem[];
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  insuranceName: string; // "PAMI", "OSDE", "Particular", etc.
  insuranceDiscount: number; // Porcentaje, ej: 80 para 80%
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
}

// ==========================================
// 1. INITIAL PHARMACIES (SaaS Level)
// ==========================================
export const initialPharmacies: Pharmacy[] = [
  {
    id: 'ph-1',
    name: 'Farmacia Nueva Central',
    ownerName: 'Dr. Alejandro Benítez',
    email: 'contacto@nuevacentral.com',
    plan: 'Pro',
    status: 'Activo',
    address: 'Av. Corrientes 1482, CABA',
    joinedDate: '2025-03-12',
    mrr: 79,
    logoColor: '#10b981'
  },
  {
    id: 'ph-2',
    name: 'FarmaSalud Belgrano',
    ownerName: 'Dra. Mónica Vázquez',
    email: 'contacto@farmasalud.com',
    plan: 'Enterprise',
    status: 'Activo',
    address: 'Juramento 2310, Belgrano',
    joinedDate: '2024-11-05',
    mrr: 149,
    logoColor: '#06b6d4'
  },
  {
    id: 'ph-3',
    name: 'Farmacia San Roque',
    ownerName: 'Julián Domínguez',
    email: 'julian@sanroque.com',
    plan: 'Básico',
    status: 'En Prueba',
    address: 'Calle 12 Nro 432, La Plata',
    joinedDate: '2026-05-10', // Reciente en Mayo 2026
    mrr: 39,
    logoColor: '#f59e0b'
  },
  {
    id: 'ph-4',
    name: 'PharmaExpress Sur',
    ownerName: 'Roberto Gómez',
    email: 'roberto@pharmaexpress.com',
    plan: 'Pro',
    status: 'Suspendido',
    address: 'Av. Colón 410, Bahía Blanca',
    joinedDate: '2025-01-20',
    mrr: 79,
    logoColor: '#ef4444'
  }
];

// ==========================================
// 2. INITIAL SELLERS (Employees per Pharmacy)
// ==========================================
export const initialSellers: Seller[] = [
  // Farmacia Nueva Central (ph-1)
  { id: 'sel-1', pharmacyId: 'ph-1', name: 'Carlos Gómez', email: 'carlos@nuevacentral.com', totalSales: 84320, commissionRate: 2.0, status: 'Online' },
  { id: 'sel-2', pharmacyId: 'ph-1', name: 'Laura Martínez', email: 'laura@nuevacentral.com', totalSales: 112500, commissionRate: 2.5, status: 'Online' },
  { id: 'sel-3', pharmacyId: 'ph-1', name: 'Martín Díaz', email: 'martin@nuevacentral.com', totalSales: 45200, commissionRate: 1.8, status: 'Offline' },
  
  // FarmaSalud Belgrano (ph-2)
  { id: 'sel-4', pharmacyId: 'ph-2', name: 'Sofía Rodríguez', email: 'sofia@farmasalud.com', totalSales: 215400, commissionRate: 3.0, status: 'Online' },
  { id: 'sel-5', pharmacyId: 'ph-2', name: 'Diego Torres', email: 'diego@farmasalud.com', totalSales: 153000, commissionRate: 2.8, status: 'Offline' }
];

// ==========================================
// 3. INITIAL MEDICATIONS (Inventory)
// ==========================================
// Expiration dates relative to current date (May 2026)
export const initialMedications: Medication[] = [
  // Inventory for 'Farmacia Nueva Central' (ph-1)
  {
    id: 'med-1-1',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-01',
    name: 'Ibuprofeno 600mg (Actron)',
    laboratory: 'Bayer',
    category: 'Analgésico',
    stock: 120,
    minStock: 20,
    priceCost: 450,
    priceSale: 980,
    requiresPrescription: false,
    batchNumber: 'L-ACT8891',
    expirationDate: '2027-12-15' // Seguro (Safe)
  },
  {
    id: 'med-1-2',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-02',
    name: 'Amoxicilina 1g (Optamox)',
    laboratory: 'Roemmers',
    category: 'Antibiótico',
    stock: 12, // Stock Crítico (Critical Stock)
    minStock: 15,
    priceCost: 1200,
    priceSale: 2450,
    requiresPrescription: true,
    batchNumber: 'L-OPT9012',
    expirationDate: '2026-06-15' // Vence en < 1 mes (Expiring Soon!)
  },
  {
    id: 'med-1-3',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-03',
    name: 'Losartán 50mg (Cozaar)',
    laboratory: 'Merck',
    category: 'Cardiovascular',
    stock: 85,
    minStock: 10,
    priceCost: 800,
    priceSale: 1650,
    requiresPrescription: true,
    batchNumber: 'L-COZ1122',
    expirationDate: '2026-04-10' // Ya venció! (Expired)
  },
  {
    id: 'med-1-4',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-04',
    name: 'Metformina 850mg (DBI)',
    laboratory: 'Montpellier',
    category: 'Diabetes',
    stock: 40,
    minStock: 15,
    priceCost: 950,
    priceSale: 1850,
    requiresPrescription: true,
    batchNumber: 'L-DBI2345',
    expirationDate: '2026-08-10' // Vence en < 3 meses (Warning)
  },
  {
    id: 'med-1-5',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-05',
    name: 'Paracetamol 500mg (Tafirol)',
    laboratory: 'Genomma Lab',
    category: 'Analgésico',
    stock: 250,
    minStock: 30,
    priceCost: 200,
    priceSale: 420,
    requiresPrescription: false,
    batchNumber: 'L-TAF3212',
    expirationDate: '2028-01-20' // Seguro (Safe)
  },
  {
    id: 'med-1-6',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-06',
    name: 'Loratadina 10mg (Aerotina)',
    laboratory: 'Raffo',
    category: 'Ventas Libres',
    stock: 8, // Stock Crítico (Critical Stock)
    minStock: 10,
    priceCost: 310,
    priceSale: 680,
    requiresPrescription: false,
    batchNumber: 'L-AER8811',
    expirationDate: '2026-07-28' // Vence en < 2 meses (Warning)
  },
  {
    id: 'med-1-7',
    pharmacyId: 'ph-1',
    sku: 'MED-779810-07',
    name: 'Atorvastatina 20mg (Lipitor)',
    laboratory: 'Pfizer',
    category: 'Cardiovascular',
    stock: 62,
    minStock: 10,
    priceCost: 1500,
    priceSale: 3100,
    requiresPrescription: true,
    batchNumber: 'L-LIP9912',
    expirationDate: '2027-09-05' // Seguro (Safe)
  },

  // Inventory for 'FarmaSalud Belgrano' (ph-2)
  {
    id: 'med-2-1',
    pharmacyId: 'ph-2',
    sku: 'MED-789012-01',
    name: 'Ibuprofeno 600mg (Actron)',
    laboratory: 'Bayer',
    category: 'Analgésico',
    stock: 180,
    minStock: 25,
    priceCost: 450,
    priceSale: 980,
    requiresPrescription: false,
    batchNumber: 'L-ACT8891',
    expirationDate: '2027-12-15'
  },
  {
    id: 'med-2-2',
    pharmacyId: 'ph-2',
    sku: 'MED-789012-02',
    name: 'Amoxicilina 1g (Optamox)',
    laboratory: 'Roemmers',
    category: 'Antibiótico',
    stock: 45,
    minStock: 15,
    priceCost: 1200,
    priceSale: 2450,
    requiresPrescription: true,
    batchNumber: 'L-OPT9012',
    expirationDate: '2026-10-30'
  }
];

// ==========================================
// 4. INITIAL ATTENDANCE LOGS
// ==========================================
export const initialAttendance: AttendanceRecord[] = [
  // Today's records (May 23, 2026)
  { id: 'att-1', sellerId: 'sel-1', date: '2026-05-23', clockIn: '08:02:15', clockOut: null, status: 'A Tiempo' },
  { id: 'att-2', sellerId: 'sel-2', date: '2026-05-23', clockIn: '08:45:30', clockOut: null, status: 'Tarde' }, // Entrada tarde, el turno empieza a las 08:30
  
  // Yesterday's records (May 22, 2026)
  { id: 'att-3', sellerId: 'sel-1', date: '2026-05-22', clockIn: '07:58:40', clockOut: '17:01:20', status: 'A Tiempo' },
  { id: 'att-4', sellerId: 'sel-2', date: '2026-05-22', clockIn: '08:15:10', clockOut: '17:15:00', status: 'A Tiempo' },
  { id: 'att-5', sellerId: 'sel-3', date: '2026-05-22', clockIn: '09:05:00', clockOut: '13:00:10', status: 'A Tiempo' } // Part-time
];

// ==========================================
// 5. INITIAL SALES (Transaction History)
// ==========================================
export const initialSales: Sale[] = [
  {
    id: 'sal-1',
    pharmacyId: 'ph-1',
    sellerId: 'sel-1',
    sellerName: 'Carlos Gómez',
    date: '2026-05-23 08:45',
    items: [
      { medicationId: 'med-1-1', name: 'Ibuprofeno 600mg (Actron)', qty: 2, priceSale: 980, total: 1960 },
      { medicationId: 'med-1-5', name: 'Paracetamol 500mg (Tafirol)', qty: 1, priceSale: 420, total: 420 }
    ],
    paymentMethod: 'Efectivo',
    insuranceName: 'Particular',
    insuranceDiscount: 0,
    subtotal: 2380,
    discountAmount: 0,
    totalAmount: 2380
  },
  {
    id: 'sal-2',
    pharmacyId: 'ph-1',
    sellerId: 'sel-2',
    sellerName: 'Laura Martínez',
    date: '2026-05-23 09:12',
    items: [
      { medicationId: 'med-1-2', name: 'Amoxicilina 1g (Optamox)', qty: 1, priceSale: 2450, total: 2450 },
      { medicationId: 'med-1-7', name: 'Atorvastatina 20mg (Lipitor)', qty: 2, priceSale: 3100, total: 6200 }
    ],
    paymentMethod: 'Tarjeta',
    insuranceName: 'OSDE',
    insuranceDiscount: 40,
    subtotal: 8650,
    discountAmount: 3460,
    totalAmount: 5190
  },
  {
    id: 'sal-3',
    pharmacyId: 'ph-1',
    sellerId: 'sel-1',
    sellerName: 'Carlos Gómez',
    date: '2026-05-22 15:30',
    items: [
      { medicationId: 'med-1-1', name: 'Ibuprofeno 600mg (Actron)', qty: 5, priceSale: 980, total: 4900 }
    ],
    paymentMethod: 'Transferencia',
    insuranceName: 'PAMI',
    insuranceDiscount: 80,
    subtotal: 4900,
    discountAmount: 3920,
    totalAmount: 980
  }
];
