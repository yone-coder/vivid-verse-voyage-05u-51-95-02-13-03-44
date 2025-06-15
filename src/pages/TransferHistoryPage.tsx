
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
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  User, 
  Eye, 
  Download, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
      case 'failed':
        return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3.5 w-3.5" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5" />;
      case 'failed':
        return <XCircle className="h-3.5 w-3.5" />;
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-sm hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">{transfer.recipient}</p>
                <p className="text-sm text-gray-500 font-mono">{transfer.id}</p>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(transfer.status)} border-0 font-medium px-3 py-1 flex items-center space-x-1.5 transition-colors`}>
            {getStatusIcon(transfer.status)}
            <span className="capitalize text-xs font-semibold">{transfer.status}</span>
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Amount</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              {formatAmount(transfer.amount, transfer.currency)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Destination</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-gray-900 font-medium">{transfer.destination}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Method</span>
            <span className="text-gray-900 font-medium bg-gray-50 px-3 py-1 rounded-full text-sm">{transfer.method}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Date</span>
            <span className="text-gray-900 font-medium">{formatDate(transfer.date)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer History</h1>
              <p className="text-gray-600 text-lg">Manage and track all your money transfers</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Total Sent</p>
                  <p className="text-2xl font-bold text-emerald-900">$2,750</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">This Month</p>
                  <p className="text-2xl font-bold text-blue-900">4 transfers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700 uppercase tracking-wide">Countries</p>
                  <p className="text-2xl font-bold text-purple-900">4 destinations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-700 uppercase tracking-wide">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-900">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search transfers, recipients, or transaction IDs..." 
                  className="pl-10 border-gray-200 focus:border-red-300 focus:ring-red-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transfers List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isMobile ? (
              <div className="p-6 space-y-4">
                {sampleTransfers.map((transfer) => (
                  <MobileTransferCard key={transfer.id} transfer={transfer} />
                ))}
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700 py-4">Transaction</TableHead>
                      <TableHead className="font-semibold text-gray-700">Recipient</TableHead>
                      <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                      <TableHead className="font-semibold text-gray-700">Destination</TableHead>
                      <TableHead className="font-semibold text-gray-700">Method</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleTransfers.map((transfer) => (
                      <TableRow key={transfer.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                        <TableCell className="py-4">
                          <div className="font-mono text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md w-fit">
                            {transfer.id}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{transfer.recipient}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-lg bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                            {formatAmount(transfer.amount, transfer.currency)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                              <MapPin className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                            <span className="text-gray-900">{transfer.destination}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {transfer.method}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600 font-medium">{formatDate(transfer.date)}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(transfer.status)} border-0 font-medium px-3 py-1 flex items-center space-x-1.5 w-fit transition-colors`}>
                            {getStatusIcon(transfer.status)}
                            <span className="capitalize text-xs font-semibold">{transfer.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
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
          <Card className="text-center py-20 border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <CardContent>
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No transfers yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                When you send money, your transfer history will appear here. Start your first transfer now!
              </p>
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all">
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
