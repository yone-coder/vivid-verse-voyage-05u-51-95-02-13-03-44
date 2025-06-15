
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

const DesktopTransferHistoryPage = () => {
  const transfers = [
    {
      id: 'TR001',
      recipient: 'John Doe',
      amount: '$500.00',
      fee: '$15.00',
      status: 'completed',
      date: '2024-06-14',
      country: 'Haiti',
      type: 'international'
    },
    {
      id: 'TR002',
      recipient: 'Marie Claire',
      amount: '$250.00',
      fee: '$8.00',
      status: 'pending',
      date: '2024-06-13',
      country: 'Haiti',
      type: 'national'
    },
    {
      id: 'TR003',
      recipient: 'Pierre Jean',
      amount: '$750.00',
      fee: '$22.50',
      status: 'completed',
      date: '2024-06-12',
      country: 'Haiti',
      type: 'international'
    },
    {
      id: 'TR004',
      recipient: 'Rose Michel',
      amount: '$100.00',
      fee: '$3.00',
      status: 'failed',
      date: '2024-06-11',
      country: 'Haiti',
      type: 'national'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer History</h1>
          <p className="text-gray-600">View and manage your past money transfers</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sent</p>
                  <p className="text-2xl font-bold text-gray-900">$1,600</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Fees</p>
                  <p className="text-2xl font-bold text-gray-900">$48.50</p>
                </div>
                <ArrowDownLeft className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfers List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(transfer.status)}
                    <div>
                      <p className="font-semibold text-gray-900">{transfer.recipient}</p>
                      <p className="text-sm text-gray-600">{transfer.country} • {transfer.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className={`${getStatusColor(transfer.status)} border-0`}>
                      {transfer.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{transfer.amount}</p>
                      <p className="text-sm text-gray-600">Fee: {transfer.fee}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesktopTransferHistoryPage;
