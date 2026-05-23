import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';

// Public Pages
import { LandingPage } from './pages/Landing/LandingPage';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// SuperAdmin Pages
import { SuperDashboard } from './pages/SuperAdmin/SuperDashboard';
import { PharmacyManagement } from './pages/SuperAdmin/PharmacyManagement';
import { SubscriptionBilling } from './pages/SuperAdmin/SubscriptionBilling';

// Pharmacy Pages
import { PharmacyDashboard } from './pages/Pharmacy/PharmacyDashboard';
import { MedicationManagement } from './pages/Pharmacy/MedicationManagement';
import { SalesPOS } from './pages/Pharmacy/SalesPOS';
import { SellersAttendance } from './pages/Pharmacy/SellersAttendance';
import { PharmacyProfile } from './pages/Pharmacy/PharmacyProfile';

const AppContent: React.FC = () => {
  const { currentUser, currentView } = useApp();

  // 1. Render Public Views (Unauthenticated)
  if (!currentUser) {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      default:
        return <LandingPage />;
    }
  }

  // 2. Render Authenticated Views inside the Sidebar/Navbar Layout
  const renderInnerView = () => {
    switch (currentView) {
      // SuperAdmin Views
      case 'superadmin-dashboard':
        return <SuperDashboard />;
      case 'superadmin-pharmacies':
        return <PharmacyManagement />;
      case 'superadmin-billing':
        return <SubscriptionBilling />;

      // Pharmacy Owner / Manager / Seller Views
      case 'pharmacy-dashboard':
        return <PharmacyDashboard />;
      case 'pharmacy-medications':
        return <MedicationManagement />;
      case 'pharmacy-pos':
        return <SalesPOS />;
      case 'pharmacy-sellers':
        return <SellersAttendance />;
      case 'pharmacy-profile':
        return <PharmacyProfile />;

      // Fallback
      default:
        return currentUser.role === 'superadmin' 
          ? <SuperDashboard /> 
          : currentUser.role === 'seller' 
            ? <SalesPOS /> 
            : <PharmacyDashboard />;
    }
  };

  return (
    <Layout>
      {renderInnerView()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
