'use client'

import React, { useState } from 'react';
//import { Order } from '../types/order';
import { useOrders } from '../hooks/useOrders';
import { X, Edit, Save, Clock, User, Building, Flag, Calendar, MessageSquare } from 'lucide-react';

// interface OrderDetailsProps {
//   order: Order;
//   onClose: () => void;
// }

const OrderDetails = ({ order, onClose }) => {
  const { updateOrderStatus, loading } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);
  const [comment, setComment] = useState('');

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

  const handleStatusUpdate = async () => {
    if (newStatus !== order.status) {
      await updateOrderStatus(order.id, newStatus, comment || undefined);
    }
    setIsEditing(false);
    setComment('');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{order.subject}</h2>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.status]}`}>
                {order.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[order.priority]}`}>
                {order.priority.toUpperCase()} PRIORITY
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-medium">{order.companyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-medium">{order.contactName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Flag size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Order Type</p>
                  <p className="font-medium">{order.orderType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Handling Person</p>
                  <p className="font-medium">{order.handlingPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Requesting Person</p>
                  <p className="font-medium">{order.requestingPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Information */}
          {order.loginInfo && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Login Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{order.loginInfo}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{order.description}</p>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Status Update Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} />
                  Update Status
                </button>
              )}
            </div>

            {isEditing && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a comment about this status change..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewStatus(order.status);
                      setComment('');
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Update Status
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status History</h3>
            <div className="space-y-3">
              {order.statusHistory.map((update) => (
                <div key={update.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className={`inline-block w-3 h-3 rounded-full ${statusColors[update.status].replace('text-', 'bg-').replace('border-', 'bg-')}`}></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {update.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        by {update.updatedBy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock size={14} />
                      <span>{formatDate(update.timestamp)}</span>
                    </div>
                    {update.comment && (
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MessageSquare size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{update.comment}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;