'use client';

import React, { useState } from 'react';
import OrderForm from './OrderForm';
import OrderDashboard from './OrderDashboard';
import { Plus, Package, Users, Settings } from 'lucide-react';
import { Dialog } from 'primereact/dialog';

const Orders = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleCreateOrder = () => {
    setShowOrderForm(true);
  };

  const handleOrderSuccess = () => {
    // Refresh would happen here in real app
    console.log('Order created successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Package size={32} className="text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">CaseFlow</h1>
              </div>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package size={16} />
                  Dashboard
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateOrder}
                style={{ cursor: 'pointer'}}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                New Case
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'dashboard' && <OrderDashboard />}
      </main>

      {/* Order Form Modal */}
      <Dialog header="New Case Order" visible={showOrderForm} onHide={()=>setShowOrderForm(false)}>
      <OrderForm
          onClose={() => setShowOrderForm(false)}
          onSuccess={handleOrderSuccess}
        />
      </Dialog>

    </div>
  );
}

export default Orders;