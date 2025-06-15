
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const DesktopTrackTransferPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = () => {
    // Simulate tracking result
    setTrackingResult({
      id: trackingNumber || 'TR123456',
      status: 'In Transit',
      recipient: 'John Doe',
      amount: '$500.00',
      destination: 'Port-au-Prince, Haiti',
      estimatedDelivery: '2024-06-16',
      steps: [
        { step: 'Transfer Initiated', completed: true, date: '2024-06-14 10:00 AM' },
        { step: 'Payment Processed', completed: true, date: '2024-06-14 10:15 AM' },
        { step: 'In Transit', completed: true, date: '2024-06-14 11:00 AM' },
        { step: 'Ready for Pickup', completed: false, date: 'Pending' },
        { step: 'Completed', completed: false, date: 'Pending' }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Transfer</h1>
          <p className="text-gray-600">Enter your tracking number to see the status of your transfer</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track Your Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter tracking number (e.g., TR123456)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
              <Button onClick={handleTrack} className="px-8 py-6 bg-red-600 hover:bg-red-700">
                <Search className="w-5 h-5 mr-2" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Result */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Transfer Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="text-lg font-semibold">{trackingResult.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-semibold text-blue-600">{trackingResult.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recipient</p>
                    <p className="text-lg font-semibold">{trackingResult.recipient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-lg font-semibold">{trackingResult.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="text-lg font-semibold">{trackingResult.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="text-lg font-semibold">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Transfer Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingResult.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.step}
                        </p>
                        <p className="text-sm text-gray-600">{step.date}</p>
                      </div>
                      {index < trackingResult.steps.length - 1 && (
                        <div className={`w-px h-8 ${
                          step.completed ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Support</h4>
                    <p className="text-gray-600 mb-2">Have questions about your transfer?</p>
                    <Button variant="outline">Contact Us</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transfer Receipt</h4>
                    <p className="text-gray-600 mb-2">Download your transfer confirmation</p>
                    <Button variant="outline">Download Receipt</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopTrackTransferPage;
