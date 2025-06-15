
import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

const locations = [
  {
    id: 1,
    city: "New York",
    address: "123 Wall Street, New York, NY 10005, USA",
    hours: "Mon–Fri 9:00am – 5:30pm",
    phone: "+1 (212) 555-1234",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=New+York+NY&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7CNew+York+NY"
  },
  {
    id: 2,
    city: "London",
    address: "8 King’s Road, London SW3 4RY, UK",
    hours: "Mon–Fri 8:30am – 5:00pm",
    phone: "+44 20 7345 6789",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=London+UK&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7CLondon+UK"
  },
  {
    id: 3,
    city: "Lagos",
    address: "55B Allen Avenue, Ikeja, Lagos, Nigeria",
    hours: "Mon–Sat 9:00am – 6:00pm",
    phone: "+234 1 270 5678",
    img: "https://maps.googleapis.com/maps/api/staticmap?center=Lagos+Nigeria&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7CLagos+Nigeria"
  }
];

const LocationsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-center flex justify-center items-center gap-2">
        <MapPin className="w-7 h-7 text-[#ff4747]" />
        Our Locations
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Visit any of our global branches to send, receive, or track your transfers with our friendly staff. Find a location near you.
      </p>

      <div className="space-y-8">
        {locations.map(loc => (
          <div key={loc.id} className="border rounded-lg bg-white dark:bg-zinc-900/80 shadow-md flex flex-col md:flex-row overflow-hidden">
            <img
              src={loc.img}
              alt={`${loc.city} map preview`}
              className="h-40 w-full md:w-64 object-cover"
              loading="lazy"
            />
            <div className="flex-1 p-4 flex flex-col gap-1 justify-center">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-[#ff4747]" />
                <span className="text-lg font-semibold">{loc.city} Branch</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">{loc.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <a className="text-blue-600 hover:underline text-sm" href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}>
                  {loc.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{loc.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
