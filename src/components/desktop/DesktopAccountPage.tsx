
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, CreditCard, Shield, Bell, HelpCircle, LogOut, User, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DesktopAccountPage = () => {
  const { user } = useAuth();

  const accountStats = [
    { label: 'Total Transfers', value: '24', icon: '📊' },
    { label: 'Amount Sent', value: '$5,420', icon: '💰' },
    { label: 'Countries', value: '3', icon: '🌍' },
    { label: 'Member Since', value: '2023', icon: '📅' }
  ];

  const menuItems = [
    { icon: User, label: 'Personal Information', description: 'Update your profile details' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage your cards and accounts' },
    { icon: Shield, label: 'Security & Privacy', description: 'Password, 2FA, and privacy settings' },
    { icon: Bell, label: 'Notifications', description: 'Email and SMS preferences' },
    { icon: HelpCircle, label: 'Help & Support', description: 'FAQs, contact support' },
    { icon: Settings, label: 'Settings', description: 'App preferences and configurations' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {user?.email?.slice(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.user_metadata?.full_name || 'User Account'}
                  </h1>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {user?.email || 'user@example.com'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {accountStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
            
            <div className="space-y-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">June 14, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$500.00</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Marie Claire</p>
                      <p className="text-sm text-gray-600">June 13, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$250.00</p>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">Pierre Jean</p>
                      <p className="text-sm text-gray-600">June 12, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$750.00</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Transfers
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Send Money
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Statements
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopAccountPage;
