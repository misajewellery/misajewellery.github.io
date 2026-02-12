import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import WhatsAppAppointment from './pages/WhatsAppAppointment';
import ShippingReturns from './pages/ShippingReturns';
import JewelleryCare from './pages/JewelleryCare';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:category" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/whatsapp-appointment" element={<WhatsAppAppointment />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/jewellery-care" element={<JewelleryCare />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          {/* Authentication */}


          {/* Protected Dashboard Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

