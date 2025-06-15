
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

// Mock data for transfer history
const transfers = [
  {
    id: 'T123456',
    recipient: 'John Doe',
    amount: '100.00 USD',
    date: '2025-06-14',
    status: 'Completed',
  },
  {
    id: 'T123457',
    recipient: 'Jane Smith',
    amount: '250.50 EUR',
    date: '2025-06-12',
    status: 'Completed',
  },
  {
    id: 'T123458',
    recipient: 'Peter Jones',
    amount: '50.00 GBP',
    date: '2025-06-11',
    status: 'Pending',
  },
  {
    id: 'T123459',
    recipient: 'Maria Garcia',
    amount: '500.00 MXN',
    date: '2025-06-10',
    status: 'Failed',
  },
  {
    id: 'T123460',
    recipient: 'Chen Wei',
    amount: '1200.00 CNY',
    date: '2025-06-09',
    status: 'Completed',
  },
];

const getStatusBadgeClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const TransferHistoryPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 pb-20"> {/* Added pb-20 for bottom nav */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transfer History</h1>
        <p className="text-muted-foreground">
          Here you can see your past transfers.
        </p>
      </div>
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="hidden sm:table-cell">Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>
                      <div className="font-medium">{transfer.recipient}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">
                        {transfer.amount}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{transfer.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">{transfer.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={cn('capitalize border-transparent', getStatusBadgeClasses(transfer.status))}>
                        {transfer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferHistoryPage;
