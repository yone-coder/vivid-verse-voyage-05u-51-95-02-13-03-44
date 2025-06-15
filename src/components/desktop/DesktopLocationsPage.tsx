
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Phone, Star } from 'lucide-react';

const DesktopLocationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const locations = [
    {
      id: 1,
      name: 'Downtown Transfer Center',
      address: '123 Main Street, Port-au-Prince',
      phone: '+509 1234-5678',
      hours: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM',
      rating: 4.8,
      services: ['Cash Pickup', 'Money Transfer', 'Bill Payment'],
      distance: '0.5 miles'
    },
    {
      id: 2,
      name: 'Airport Transfer Point',
      address: '456 Airport Road, Port-au-Prince',
      phone: '+509 2345-6789',
      hours: 'Daily 6AM-10PM',
      rating: 4.6,
      services: ['Cash Pickup', 'Money Transfer'],
      distance: '2.1 miles'
    },
    {
      id: 3,
      name: 'City Mall Location',
      address: '789 Commercial Ave, Port-au-Prince',
      phone: '+509 3456-7890',
      hours: 'Mon-Sun 10AM-8PM',
      rating: 4.9,
      services: ['Cash Pickup', 'Money Transfer', 'Bill Payment', 'Mobile Top-up'],
      distance: '1.8 miles'
    },
    {
      id: 4,
      name: 'North District Branch',
      address: '321 North Street, Port-au-Prince',
      phone: '+509 4567-8901',
      hours: 'Mon-Fri 9AM-5PM',
      rating: 4.5,
      services: ['Cash Pickup', 'Money Transfer'],
      distance: '3.2 miles'
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Locations</h1>
          <p className="text-gray-600">Locate nearby pickup points and transfer centers</p>
        </div>

        {/* Search and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Search Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by location or address"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-400">Showing {filteredLocations.length} nearby locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Locations List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Nearby Locations ({filteredLocations.length})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{location.rating}</span>
                        <span className="text-sm text-gray-400 ml-2">{location.distance}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{location.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{location.hours}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {location.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopLocationsPage;
