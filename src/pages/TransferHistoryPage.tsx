
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, DollarSign, MapPin, User, Eye, Download } from 'lucide-react';

interface Transfer {
  id: string;
  recipient: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  destination: string;
  method: string;
}

const sampleTransfers: Transfer[] = [
  {
    id: 'TXN-001',
    recipient: 'John Smith',
    amount: 500,
    currency: 'USD',
    status: 'completed',
    date: '2024-01-15',
    destination: 'United Kingdom',
    method: 'Bank Transfer'
  },
  {
    id: 'TXN-002',
    recipient: 'Maria Garcia',
    amount: 750,
    currency: 'USD',
    status: 'pending',
    date: '2024-01-14',
    destination: 'Mexico',
    method: 'Cash Pickup'
  },
  {
    id: 'TXN-003',
    recipient: 'David Chen',
    amount: 1200,
    currency: 'USD',
    status: 'completed',
    date: '2024-01-12',
    destination: 'China',
    method: 'Mobile Wallet'
  },
  {
    id: 'TXN-004',
    recipient: 'Sarah Johnson',
    amount: 300,
    currency: 'USD',
    status: 'failed',
    date: '2024-01-10',
    destination: 'Canada',
    method: 'Bank Transfer'
  },
];

const TransferHistoryPage: React.FC = () => {
  const getStatusColor = (status: Transfer['status']) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="p-4 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transfer History</h1>
        <p className="text-gray-600">View and manage your past money transfers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Sent</p>
                <p className="text-xl font-semibold">$2,750</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-semibold">4 transfers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-xl font-semibold">4 destinations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Transfers</span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-mono text-sm">
                      {transfer.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{transfer.recipient}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatAmount(transfer.amount, transfer.currency)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{transfer.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.method}</TableCell>
                    <TableCell>{formatDate(transfer.date)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transfer.status)}>
                        {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State (hidden when there are transfers) */}
      {sampleTransfers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transfers yet</h3>
            <p className="text-gray-600 mb-4">
              When you send money, your transfer history will appear here.
            </p>
            <Button>Send Your First Transfer</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransferHistoryPage;
