
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Eye, MoreHorizontal, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Transfer {
  id: string;
  code: string;
  receiverName: string;
  amount: string;
  currency: string;
  status: 'pending' | 'processing' | 'ready_for_pickup' | 'completed' | 'cancelled';
  sentDate: string;
  completedDate?: string;
  destination: string;
  fees: string;
  exchangeRate?: string;
  method: 'cash_pickup' | 'bank_deposit' | 'mobile_wallet';
}

const mockTransfers: Transfer[] = [
  {
    id: '1',
    code: 'TXN123456789',
    receiverName: 'Marie Dupuis',
    amount: '500.00',
    currency: 'USD',
    status: 'completed',
    sentDate: '2024-06-12',
    completedDate: '2024-06-13',
    destination: 'Port-au-Prince, Haiti',
    fees: '15.00',
    exchangeRate: '1 USD = 150 HTG',
    method: 'cash_pickup'
  },
  {
    id: '2',
    code: 'TXN987654321',
    receiverName: 'Pierre Laurent',
    amount: '200.00',
    currency: 'USD',
    status: 'ready_for_pickup',
    sentDate: '2024-06-14',
    destination: 'Cap-Haïtien, Haiti',
    fees: '8.00',
    exchangeRate: '1 USD = 150 HTG',
    method: 'cash_pickup'
  },
  {
    id: '3',
    code: 'TXN456789123',
    receiverName: 'Jean Baptiste',
    amount: '750.00',
    currency: 'USD',
    status: 'processing',
    sentDate: '2024-06-15',
    destination: 'Les Cayes, Haiti',
    fees: '22.50',
    exchangeRate: '1 USD = 150 HTG',
    method: 'bank_deposit'
  },
  {
    id: '4',
    code: 'TXN789123456',
    receiverName: 'Lucie Joseph',
    amount: '100.00',
    currency: 'USD',
    status: 'cancelled',
    sentDate: '2024-06-10',
    destination: 'Jacmel, Haiti',
    fees: '5.00',
    method: 'mobile_wallet'
  },
  {
    id: '5',
    code: 'TXN321654987',
    receiverName: 'Michel Pierre',
    amount: '300.00',
    currency: 'USD',
    status: 'completed',
    sentDate: '2024-06-08',
    completedDate: '2024-06-09',
    destination: 'Gonaïves, Haiti',
    fees: '12.00',
    exchangeRate: '1 USD = 150 HTG',
    method: 'cash_pickup'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'ready_for_pickup':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'pending':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'ready_for_pickup':
      return 'Ready for Pickup';
    case 'processing':
      return 'Processing';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

const getMethodLabel = (method: string) => {
  switch (method) {
    case 'cash_pickup':
      return 'Cash Pickup';
    case 'bank_deposit':
      return 'Bank Deposit';
    case 'mobile_wallet':
      return 'Mobile Wallet';
    default:
      return method;
  }
};

export default function TransferHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort transfers
  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = transfer.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || transfer.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime();
      case 'date_asc':
        return new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime();
      case 'amount_desc':
        return parseFloat(b.amount) - parseFloat(a.amount);
      case 'amount_asc':
        return parseFloat(a.amount) - parseFloat(b.amount);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransfers = filteredTransfers.slice(startIndex, startIndex + itemsPerPage);

  // Summary statistics
  const totalTransfers = mockTransfers.length;
  const totalAmount = mockTransfers.reduce((sum, transfer) => sum + parseFloat(transfer.amount), 0);
  const totalFees = mockTransfers.reduce((sum, transfer) => sum + parseFloat(transfer.fees), 0);
  const completedTransfers = mockTransfers.filter(t => t.status === 'completed').length;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Transfer History</h1>
        <p className="text-muted-foreground">View and manage all your money transfers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{totalTransfers}</p>
              <p className="text-sm text-muted-foreground">Total Transfers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Sent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">${totalFees.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Fees</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{completedTransfers}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by receiver name, transfer code, or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Method</label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash_pickup">Cash Pickup</SelectItem>
                  <SelectItem value="bank_deposit">Bank Deposit</SelectItem>
                  <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">Date (Newest First)</SelectItem>
                  <SelectItem value="date_asc">Date (Oldest First)</SelectItem>
                  <SelectItem value="amount_desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount_asc">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setMethodFilter('all');
                setSortBy('date_desc');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-foreground">{Math.min(startIndex + itemsPerPage, filteredTransfers.length)}</span> of{' '}
          <span className="font-semibold text-foreground">{filteredTransfers.length}</span> transfers
        </p>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Transfers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transfer Code</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>
                    <div className="font-mono text-sm">{transfer.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transfer.receiverName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">{transfer.amount} {transfer.currency}</div>
                    <div className="text-xs text-muted-foreground">Fee: {transfer.fees} {transfer.currency}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(transfer.status)}>
                      {getStatusLabel(transfer.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(transfer.sentDate).toLocaleDateString()}</div>
                    {transfer.completedDate && (
                      <div className="text-xs text-muted-foreground">
                        Completed: {new Date(transfer.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{getMethodLabel(transfer.method)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{transfer.destination}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                        {transfer.status === 'ready_for_pickup' && (
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Share Details
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {filteredTransfers.length === 0 && (
        <Card className="text-center py-12 mt-6">
          <CardContent>
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No transfers found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setMethodFilter('all');
            }}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
