
import React, { useState } from 'react';
import { MapPin, Search, Filter, Clock, Phone, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  hours: string;
  type: 'bank' | 'agent' | 'post_office' | 'money_transfer';
  distance?: string;
  isOpen: boolean;
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Western Union - Downtown Branch',
    address: '123 Main Street',
    city: 'Port-au-Prince',
    country: 'Haiti',
    phone: '+509 1234-5678',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM',
    type: 'money_transfer',
    distance: '0.5 km',
    isOpen: true,
  },
  {
    id: '2',
    name: 'MoneyGram Agent - Petion-Ville',
    address: '456 Rue Lamarre',
    city: 'Petion-Ville',
    country: 'Haiti',
    phone: '+509 2345-6789',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    type: 'money_transfer',
    distance: '2.1 km',
    isOpen: true,
  },
  {
    id: '3',
    name: 'Banque de la République d\'Haïti',
    address: '789 Boulevard Jean-Jacques Dessalines',
    city: 'Port-au-Prince',
    country: 'Haiti',
    phone: '+509 3456-7890',
    hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    type: 'bank',
    distance: '1.2 km',
    isOpen: false,
  },
  {
    id: '4',
    name: 'CAP Bank - Delmas Branch',
    address: '321 Rue Delmas',
    city: 'Delmas',
    country: 'Haiti',
    phone: '+509 4567-8901',
    hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    type: 'bank',
    distance: '3.5 km',
    isOpen: true,
  },
  {
    id: '5',
    name: 'Sogebank Agent',
    address: '654 Avenue Christophe',
    city: 'Cap-Haïtien',
    country: 'Haiti',
    phone: '+509 5678-9012',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
    type: 'agent',
    distance: '5.2 km',
    isOpen: true,
  },
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'bank':
      return 'Bank';
    case 'agent':
      return 'Agent';
    case 'post_office':
      return 'Post Office';
    case 'money_transfer':
      return 'Money Transfer Service';
    default:
      return 'Pickup Location';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'bank':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'agent':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'post_office':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'money_transfer':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || location.type === selectedType;
    const matchesCity = selectedCity === 'all' || location.city === selectedCity;
    
    return matchesSearch && matchesType && matchesCity;
  });

  const cities = [...new Set(mockLocations.map(location => location.city))];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cash Pickup Locations</h1>
        <p className="text-muted-foreground">Find nearby locations where receivers can collect their money transfers</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by location name, address, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Location Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="money_transfer">Money Transfer Service</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="post_office">Post Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found <span className="font-semibold text-foreground">{filteredLocations.length}</span> pickup location{filteredLocations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{location.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getTypeColor(location.type)}>
                      {getTypeLabel(location.type)}
                    </Badge>
                    <Badge variant={location.isOpen ? "default" : "secondary"}>
                      {location.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                    {location.distance && (
                      <Badge variant="outline">
                        {location.distance}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{location.address}</p>
                  <p className="text-sm text-muted-foreground">{location.city}, {location.country}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{location.phone}</p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-sm">{location.hours}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredLocations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No locations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find pickup locations.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedCity('all');
            }}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Banner */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Receivers will need a valid government-issued ID to collect the transfer</li>
                <li>• Some locations may charge additional fees for cash pickup</li>
                <li>• Operating hours may vary during holidays and weekends</li>
                <li>• Call ahead to confirm location availability and requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
