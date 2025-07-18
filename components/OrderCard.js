'use client';


import React from 'react';
//import { Order } from '../types/order';
import { Clock, User, Building, Flag, Calendar } from 'lucide-react';
import { Card } from 'primereact/card';
// interface OrderCardProps {
//   order: Order;
//   onClick: (order: Order) => void;
// }

const OrderCard = ({ order, onClick }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    review: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      className="bg-white transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(order)}
      style={{backgroundColor:'#374151'}}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {order.subject}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-200 mb-2">
              <Building size={16} />
              <span>{order.companyName}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
              {order.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[order.priority]}`}>
              {order.priority.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <User size={16} />
            <span>Contact: {order.contactName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <Flag size={16} />
            <span>Type: {order.orderType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <User size={16} />
            <span>Handler: {order.handlingPerson}</span>
          </div>
        </div>

        <div className="text-sm text-gray-300 mb-4 line-clamp-2">
          {order.description}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Created: {formatDate(order.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Updated: {formatDate(order.updatedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;