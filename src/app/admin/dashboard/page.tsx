'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../presentation/components/admin/DashboardLayout';
import DashboardOverview from '../../../presentation/components/admin/DashboardOverview';
import InventoryManagement from '../../../presentation/components/admin/InventoryManagement';
import ReportsSection from '../../../presentation/components/admin/ReportsSection';
import Settings from '../../../presentation/components/admin/Settings';
import { getUserFromStorage } from '../../../shared/utils/auth.utils';
import { User } from '../../../domain/entities';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserFromStorage();
    if (!userData) {
      router.push('/admin/login');
      return;
    }
    setUser(userData);
  }, [router]);

  useEffect(() => {
    // Handle navigation to specific pages
    if (activeSection === 'products') {
      router.push('/admin/product');
    }
  }, [activeSection, router]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        // Navigation handled in useEffect
        return <DashboardOverview />;
      case 'inventory':
        return <InventoryManagement />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      user={user} 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
