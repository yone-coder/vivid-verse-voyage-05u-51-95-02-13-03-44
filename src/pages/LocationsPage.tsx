
import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const locations = [
  {
    id: 1,
    city: "New York",
    address: "123 Wall Street, New York, NY 10005, USA",
    hours: "Mon–Fri 9:00am – 5:30pm",
    phone: "+1 (212) 555-1234",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=40.7061,-74.0092&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C40.7061,-74.0092&style=feature:poi|visibility:off&style=feature:transit|visibility:off"
  },
  {
    id: 2,
    city: "London",
    address: "8 King’s Road, London SW3 4RY, UK",
    hours: "Mon–Fri 8:30am – 5:00pm",
    phone: "+44 20 7345 6789",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=51.4886,-0.1622&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.4886,-0.1622&style=feature:poi|visibility:off&style=feature:transit|visibility:off"
  },
  {
    id: 3,
    city: "Lagos",
    address: "55B Allen Avenue, Ikeja, Lagos, Nigeria",
    hours: "Mon–Sat 9:00am – 6:00pm",
    phone: "+234 1 270 5678",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=6.6018,3.3515&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C6.6018,3.3515&style=feature:poi|visibility:off&style=feature:transit|visibility:off"
  }
];

const LocationsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex justify-center items-center gap-3">
          <MapPin className="w-8 h-8 text-[#ff4747]" />
          Our Global Locations
        </h1>
        <p className="text-lg text-muted-foreground">
          Find a branch near you to manage your transfers with our expert team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map(loc => (
          <Card key={loc.id} className="flex flex-col overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
            <img
              src={loc.img}
              alt={`${loc.city} map preview`}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                {loc.city}
              </CardTitle>
              <CardDescription>{loc.address}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground/90">{loc.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a className="text-blue-500 hover:text-blue-600 hover:underline font-medium" href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}>
                  {loc.phone}
                </a>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
