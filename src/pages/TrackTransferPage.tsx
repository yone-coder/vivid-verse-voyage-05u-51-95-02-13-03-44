import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, XCircle, AlertCircle, MapPin, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface TransferStatus {
  code: string;
  status: 'pending' | 'processing' | 'ready_for_pickup' | 'completed' | 'cancelled';
  amount: string;
  currency: string;
  sender: {
    name: string;
    phone: string;
  };
  receiver: {
    name: string;
    phone: string;
    location: string;
  };
  sentDate: string;
  estimatedDelivery: string;
  pickupLocation?: {
    name: string;
    address: string;
    phone: string;
  };
  fees: string;
  exchangeRate?: string;
  timeline: Array<{
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }>;
}

const mockTransferData: { [key: string]: TransferStatus } = {
  'TXN123456789': {
    code: 'TXN123456789',
    status: 'ready_for_pickup',
    amount: '500.00',
    currency: 'USD',
    sender: {
      name: 'John Smith',
      phone: '+1 (555) 123-4567'
    },
    receiver: {
      name: 'Marie Dupuis',
      phone: '+509 1234-5678',
      location: 'Port-au-Prince, Haiti'
    },
    sentDate: '2024-06-12',
    estimatedDelivery: '2024-06-14',
    pickupLocation: {
      name: 'Western Union - Downtown Branch',
      address: '123 Main Street, Port-au-Prince, Haiti',
      phone: '+509 1234-5678'
    },
    fees: '15.00',
    exchangeRate: '1 USD = 150 HTG',
    timeline: [
      {
        status: 'Transfer Initiated',
        date: '2024-06-12 10:30 AM',
        description: 'Transfer request submitted and payment processed',
        completed: true
      },
      {
        status: 'Processing',
        date: '2024-06-12 11:15 AM',
        description: 'Transfer is being processed and verified',
        completed: true
      },
      {
        status: 'Ready for Pickup',
        date: '2024-06-13 2:45 PM',
        description: 'Funds are ready for pickup at the selected location',
        completed: true
      },
      {
        status: 'Completed',
        date: '',
        description: 'Transfer has been collected by the receiver',
        completed: false
      }
    ]
  },
  'TXN987654321': {
    code: 'TXN987654321',
    status: 'processing',
    amount: '200.00',
    currency: 'USD',
    sender: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543'
    },
    receiver: {
      name: 'Pierre Laurent',
      phone: '+509 9876-5432',
      location: 'Cap-Haïtien, Haiti'
    },
    sentDate: '2024-06-14',
    estimatedDelivery: '2024-06-15',
    fees: '8.00',
    exchangeRate: '1 USD = 150 HTG',
    timeline: [
      {
        status: 'Transfer Initiated',
        date: '2024-06-14 9:15 AM',
        description: 'Transfer request submitted and payment processed',
        completed: true
      },
      {
        status: 'Processing',
        date: '2024-06-14 9:45 AM',
        description: 'Transfer is being processed and verified',
        completed: true
      },
      {
        status: 'Ready for Pickup',
        date: '',
        description: 'Funds will be ready for pickup at the selected location',
        completed: false
      },
      {
        status: 'Completed',
        date: '',
        description: 'Transfer has been collected by the receiver',
        completed: false
      }
    ]
  }
};

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'ready_for_pickup':
      return <Package className="h-5 w-5 text-blue-600" />;
    case 'processing':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    case 'pending':
      return <AlertCircle className="h-5 w-5 text-orange-600" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Clock className="h-5 w-5 text-gray-600" />;
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

export default function TrackTransferPage() {
  const [transferCode, setTransferCode] = useState('');
  const [transfer, setTransfer] = useState<TransferStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrackTransfer = async () => {
    if (!transferCode.trim()) {
      toast.error('Please enter a transfer code');
      return;
    }

    setLoading(true);
    setNotFound(false);
    
    // Simulate API call
    setTimeout(() => {
      const foundTransfer = mockTransferData[transferCode.toUpperCase()];
      if (foundTransfer) {
        setTransfer(foundTransfer);
        setNotFound(false);
        toast.success('Transfer found!');
      } else {
        setTransfer(null);
        setNotFound(true);
        toast.error('Transfer not found. Please check your code and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackTransfer();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Transfer</h1>
        <p className="text-muted-foreground">Enter your transfer code to check the status of your money transfer</p>
      </div>

      {/* Search Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Transfer Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your transfer code (e.g., TXN123456789)"
              value={transferCode}
              onChange={(e) => setTransferCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleTrackTransfer} disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Track
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            You can find your transfer code in your confirmation email or receipt.
          </p>
        </CardContent>
      </Card>

      {/* Demo Codes Info */}
      {!transfer && !notFound && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Try Demo Transfer Codes</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <code className="bg-white px-2 py-1 rounded">TXN123456789</code> - Ready for pickup</p>
                  <p>• <code className="bg-white px-2 py-1 rounded">TXN987654321</code> - Processing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transfer Not Found */}
      {notFound && (
        <Card className="text-center py-12">
          <CardContent>
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Transfer Not Found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find a transfer with code "{transferCode}". Please check your code and try again.
            </p>
            <Button variant="outline" onClick={() => {
              setTransferCode('');
              setNotFound(false);
            }}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Transfer Details */}
      {transfer && (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transfer Status</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transfer.status)}
                  <Badge variant="outline" className={getStatusColor(transfer.status)}>
                    {getStatusLabel(transfer.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transfer Code</p>
                  <p className="font-mono text-lg">{transfer.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="font-semibold text-lg">{transfer.amount} {transfer.currency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sent Date</p>
                  <p>{new Date(transfer.sentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Delivery</p>
                  <p>{new Date(transfer.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>

              {transfer.exchangeRate && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Exchange Rate</p>
                      <p>{transfer.exchangeRate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Transfer Fee</p>
                      <p>{transfer.fees} {transfer.currency}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Sender and Receiver Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sender Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full p-2">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transfer.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{transfer.sender.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receiver Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-full p-2">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transfer.receiver.name}</p>
                    <p className="text-sm text-muted-foreground">{transfer.receiver.phone}</p>
                  </div>
                </div>
                {transfer.receiver.location && (
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full p-2">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{transfer.receiver.location}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pickup Location */}
          {transfer.pickupLocation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Pickup Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{transfer.pickupLocation.name}</p>
                  <p className="text-sm text-muted-foreground">{transfer.pickupLocation.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{transfer.pickupLocation.phone}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Transfer Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transfer.timeline.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.status}
                        </p>
                        {step.date && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {step.date}
                          </div>
                        )}
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {transfer.status === 'ready_for_pickup' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Ready for Pickup!</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      Your transfer is ready for pickup. The receiver can collect the funds at the pickup location with a valid ID.
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      Share Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Call Receiver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
