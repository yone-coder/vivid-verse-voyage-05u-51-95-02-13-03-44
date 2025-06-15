
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, ShoppingCart, User, Menu } from 'lucide-react';

export default function PaytmDesktopHome() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div>Mobile view not supported for this component</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">Paytm</div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Recharge</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Bill Payment</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Shopping</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search for services..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
              <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer" />
              <User className="h-5 w-5 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span className="text-2xl mb-1">📱</span>
                  <span>Mobile Recharge</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span className="text-2xl mb-1">💡</span>
                  <span>Electricity</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span className="text-2xl mb-1">🚗</span>
                  <span>Book Travel</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span className="text-2xl mb-1">🏠</span>
                  <span>Rent Payment</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Balance */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Paytm Wallet</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹2,450</div>
              <p className="text-gray-600 mb-4">Available Balance</p>
              <Button className="w-full">Add Money</Button>
            </CardContent>
          </Card>

          {/* Offers */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Offers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Get 10% Cashback</p>
                    <p className="text-sm text-gray-600">On mobile recharge</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Flat ₹50 Off</p>
                    <p className="text-sm text-gray-600">On electricity bill</p>
                  </div>
                  <Badge variant="secondary">Hot</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
