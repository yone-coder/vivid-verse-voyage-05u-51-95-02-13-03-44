
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
import { Calendar, DollarSign, MapPin, User, Eye, Download, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
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

  const MobileTransferCard = ({ transfer }: { transfer: Transfer }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-red-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <User className="h-4 w-4 text-gray-500" />
              <p className="font-semibold text-gray-900">{transfer.recipient}</p>
            </div>
            <p className="text-sm text-gray-500 font-mono">{transfer.id}</p>
          </div>
          <Badge className={`${getStatusColor(transfer.status)} border flex items-center space-x-1`}>
            {getStatusIcon(transfer.status)}
            <span className="capitalize">{transfer.status}</span>
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-xl text-red-600">
              {formatAmount(transfer.amount, transfer.currency)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Destination</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-gray-900">{transfer.destination}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Method</span>
            <span className="text-gray-900">{transfer.method}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date</span>
            <span className="text-gray-900">{formatDate(transfer.date)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Transfer History</h1>
          <p className="text-gray-600">Track all your money transfers in one place</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sent</p>
                  <p className="text-2xl font-bold text-gray-900">$2,750</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">4 transfers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Countries</p>
                  <p className="text-2xl font-bold text-gray-900">4 destinations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfers List */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Recent Transfers</CardTitle>
              <Button variant="outline" size="sm" className="self-start sm:self-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isMobile ? (
              <div className="p-4">
                {sampleTransfers.map((transfer) => (
                  <MobileTransferCard key={transfer.id} transfer={transfer} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">Transaction ID</TableHead>
                      <TableHead className="font-semibold">Recipient</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Destination</TableHead>
                      <TableHead className="font-semibold">Method</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleTransfers.map((transfer) => (
                      <TableRow key={transfer.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm text-gray-600">
                          {transfer.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="font-medium">{transfer.recipient}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-red-600">
                          {formatAmount(transfer.amount, transfer.currency)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{transfer.destination}</span>
                          </div>
                        </TableCell>
                        <TableCell>{transfer.method}</TableCell>
                        <TableCell className="text-gray-600">{formatDate(transfer.date)}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(transfer.status)} border flex items-center space-x-1 w-fit`}>
                            {getStatusIcon(transfer.status)}
                            <span className="capitalize">{transfer.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Empty State */}
        {sampleTransfers.length === 0 && (
          <Card className="text-center py-16 shadow-sm">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No transfers yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                When you send money, your transfer history will appear here. Start your first transfer now!
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Send Your First Transfer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransferHistoryPage;
