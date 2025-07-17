import { useState, useEffect } from 'react';
//import { Order, StatusUpdate } from '../types/order';

// Mock data for demonstration
const generateMockOrders = () => [
  {
    id: '1',
    subject: '35 RAVS Programs',
    companyName: 'TechCorp Solutions',
    contactName: 'Sarah Johnson',
    priority: 'high',
    handlingPerson: 'Mike Chen',
    requestingPerson: 'Sarah Johnson',
    orderType: 'Safety Policies',
    loginInfo: 'client@techcorp.com',
    description: 'Create a comprehensive set of RAVS programs for OSHA compliance, including training materials and implementation guidelines.',
    notes: 'Client prefers blue color scheme and wants to launch by end of month.',
    status: 'in-progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    statusHistory: [
      {
        id: '1',
        status: 'pending',
        timestamp: new Date('2024-01-15'),
        updatedBy: 'System',
        comment: 'Order created'
      },
      {
        id: '2',
        status: 'in-progress',
        timestamp: new Date('2024-01-16'),
        updatedBy: 'Mike Chen',
        comment: 'Started initial design mockups'
      }
    ]
  },
  {
    id: '2',
    subject: 'Site Safety Management Plan',
    companyName: 'Joes Contracting Inc',
    contactName: 'David Rodriguez',
    priority: 'urgent',
    handlingPerson: 'Lisa Wang',
    requestingPerson: 'David Rodriguez',
    orderType: 'Custom Documents',
    loginInfo: 'david@fashionforward.com',
    description: 'Create Site Safety Management plan for clients specific site.',
    notes: 'Rush order - needs to be completed within 2 weeks.',
    status: 'review',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
    statusHistory: [
      {
        id: '3',
        status: 'pending',
        timestamp: new Date('2024-01-10'),
        updatedBy: 'System',
        comment: 'Order created'
      },
      {
        id: '4',
        status: 'in-progress',
        timestamp: new Date('2024-01-11'),
        updatedBy: 'Lisa Wang',
        comment: 'Started platform development'
      },
      {
        id: '5',
        status: 'review',
        timestamp: new Date('2024-01-20'),
        updatedBy: 'Lisa Wang',
        comment: 'Development complete, awaiting client review'
      }
    ]
  },
  {
    id: '3',
    subject: 'OSHA Safety Manual',
    companyName: 'StartupXYZ',
    contactName: 'Emma Thompson',
    priority: 'medium',
    handlingPerson: 'Alex Kumar',
    requestingPerson: 'Emma Thompson',
    orderType: 'Manuals',
    loginInfo: 'emma@startupxyz.com',
    description: 'Create OSHA Compliance Safety Manual for new startup.',
    notes: 'Client wants to see wireframes before development begins.',
    status: 'pending',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    statusHistory: [
      {
        id: '6',
        status: 'pending',
        timestamp: new Date('2024-01-22'),
        updatedBy: 'System',
        comment: 'Order created'
      }
    ]
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState(generateMockOrders());
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      statusHistory: [{
        id: Date.now().toString(),
        status: 'pending',
        timestamp: new Date(),
        updatedBy: 'System',
        comment: 'Order created'
      }]
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setLoading(false);
    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus, comment, updatedBy = 'Admin') => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const statusUpdate = {
          id: Date.now().toString(),
          status: newStatus,
          timestamp: new Date(),
          updatedBy,
          comment
        };
        
        return {
          ...order,
          status: newStatus,
          updatedAt: new Date(),
          statusHistory: [...order.statusHistory, statusUpdate]
        };
      }
      return order;
    }));
    
    setLoading(false);
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    getOrderById
  };
};