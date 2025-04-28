import React, { useState, useEffect } from 'react';
import { 
  Truck, Plane, Clock, Heart, AlertTriangle, 
  Check, Calendar, Globe, ChevronDown, ChevronUp, ShoppingBag,
  Shield, Info, Zap, ArrowRight, Star, DollarSign, Timer
} from 'lucide-react';

const ShippingOptionsComponent = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [savedOptions, setSavedOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 20 });
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAllOptions, setShowAllOptions] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('United States');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<number | null>(null);

  const carrierLogos = {
    DHL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL_logo.svg/640px-DHL_logo.svg.png",
    FedEx: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/FedEx_Express.svg/640px-FedEx_Express.svg.png",
    UPS: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/640px-United_Parcel_Service_logo_2014.svg.png",
    USPS: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/USPS_Eagle_Symbol.svg/640px-USPS_Eagle_Symbol.svg.png"
  };

  const getShippingOptions = () => {
    const baseDate = new Date();
    
    const deliveryDates = {
      express: {
        min: new Date(baseDate.getTime()),
        max: new Date(baseDate.getTime())
      },
      priority: {
        min: new Date(baseDate.getTime()),
        max: new Date(baseDate.getTime())
      },
      standard: {
        min: new Date(baseDate.getTime()),
        max: new Date(baseDate.getTime())
      },
      economy: {
        min: new Date(baseDate.getTime()),
        max: new Date(baseDate.getTime())
      }
    };
    
    deliveryDates.express.min.setDate(baseDate.getDate() + 1);
    deliveryDates.express.max.setDate(baseDate.getDate() + 2);
    
    deliveryDates.priority.min.setDate(baseDate.getDate() + 2);
    deliveryDates.priority.max.setDate(baseDate.getDate() + 3);
    
    deliveryDates.standard.min.setDate(baseDate.getDate() + 3);
    deliveryDates.standard.max.setDate(baseDate.getDate() + 5);
    
    deliveryDates.economy.min.setDate(baseDate.getDate() + 5);
    deliveryDates.economy.max.setDate(baseDate.getDate() + 10);

    const formatDate = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'short' });
      return `${month} ${date.getDate()}`;
    };

    const getTimeRemaining = (cutoffTime: string) => {
      const [hours, minutes] = cutoffTime.split(':').map(Number);
      const cutoff = new Date();
      cutoff.setHours(hours, minutes, 0, 0);
      const now = new Date();
      const diff = cutoff.getTime() - now.getTime();
      
      if (diff <= 0) return null;
      
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      return { hours: hoursLeft, minutes: minutesLeft };
    };

    return [
      {
        id: 1,
        name: 'AliExpress Direct',
        estimate: '1-2 days',
        price: 12.99,
        regularPrice: 19.99,
        icon: <Plane size={16} />,
        carrier: 'DHL',
        carrierLogoUrl: carrierLogos.DHL,
        dates: `${formatDate(deliveryDates.express.min)} - ${formatDate(deliveryDates.express.max)}`,
        recommended: true,
        trackingStatus: 'available',
        restrictions: false,
        badge: 'Free',
        protection: true,
        returnPolicy: '30-day free returns',
        carbonNeutral: true,
        guaranteedDelivery: true,
        detailedInfo: 'Premium expedited air shipping with full insurance',
        cutoffTime: '16:00',
        cutoffTimeDisplay: '4:00 PM',
        rating: 4.9,
        ratingCount: 1245,
        savings: 7.00
      },
      {
        id: 2,
        name: 'Priority Shipping',
        estimate: '2-3 days',
        price: 7.99,
        regularPrice: 9.99,
        icon: <Truck size={16} />,
        carrier: 'FedEx',
        carrierLogoUrl: carrierLogos.FedEx,
        dates: `${formatDate(deliveryDates.priority.min)} - ${formatDate(deliveryDates.priority.max)}`,
        recommended: true,
        trackingStatus: 'available',
        restrictions: false,
        badge: null,
        protection: true,
        returnPolicy: '15-day returns',
        carbonNeutral: false,
        guaranteedDelivery: false,
        detailedInfo: 'Reliable door-to-door service with confirmation',
        cutoffTime: '14:00',
        cutoffTimeDisplay: '2:00 PM',
        rating: 4.7,
        ratingCount: 842,
        savings: 2.00
      },
      {
        id: 3,
        name: 'Standard Shipping',
        estimate: '3-5 days',
        price: 4.99,
        regularPrice: 6.99,
        icon: <Truck size={16} />,
        carrier: 'UPS',
        carrierLogoUrl: carrierLogos.UPS,
        dates: `${formatDate(deliveryDates.standard.min)} - ${formatDate(deliveryDates.standard.max)}`,
        recommended: false,
        trackingStatus: 'available',
        restrictions: false,
        badge: null,
        protection: true,
        returnPolicy: '15-day returns',
        carbonNeutral: false,
        guaranteedDelivery: false,
        detailedInfo: 'Standard delivery service with package tracking',
        cutoffTime: '12:00',
        cutoffTimeDisplay: '12:00 PM',
        rating: 4.5,
        ratingCount: 638,
        savings: 2.00
      },
      {
        id: 4,
        name: 'Economy Shipping',
        estimate: '5-10 days',
        price: 0,
        regularPrice: 4.99,
        icon: <Truck size={16} />,
        carrier: 'USPS',
        carrierLogoUrl: carrierLogos.USPS,
        dates: `${formatDate(deliveryDates.economy.min)} - ${formatDate(deliveryDates.economy.max)}`,
        recommended: false,
        trackingStatus: 'available',
        restrictions: true,
        badge: 'Free',
        protection: false,
        returnPolicy: 'No free returns',
        carbonNeutral: false,
        guaranteedDelivery: false,
        detailedInfo: 'Economy service with limited package protection',
        cutoffTime: '10:00',
        cutoffTimeDisplay: '10:00 AM',
        rating: 4.0,
        ratingCount: 426,
        savings: 4.99
      }
    ];
  };

  const shippingOptions = getShippingOptions();
  const selectedShipping = shippingOptions.find(option => option.id === selectedOption);

  const toggleSave = (id: number) => {
    if (savedOptions.includes(id)) {
      setSavedOptions(savedOptions.filter(optionId => optionId !== id));
    } else {
      setSavedOptions([...savedOptions, id]);
    }
  };

  const toggleDetails = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setExpandedDetails(expandedDetails === id ? null : id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        } else {
          clearInterval(interval);
          return { hours: 0, minutes: 0 };
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const calculateCutoffTime = (cutoffTime: string) => {
    const [hours, minutes] = cutoffTime.split(':').map(Number);
    const cutoff = new Date();
    cutoff.setHours(hours, minutes, 0, 0);
    const now = new Date();
    const diff = cutoff.getTime() - now.getTime();
    
    if (diff <= 0) return { expired: true };
    
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { 
      expired: false, 
      hours: hoursLeft, 
      minutes: minutesLeft
    };
  };

  useEffect(() => {
    const handleClickOutside = () => setShowTooltip(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderTooltip = (content: React.ReactNode) => {
    return (
      <div className="absolute z-10 bg-white shadow-lg rounded border border-gray-200 p-2 text-xs w-48 bottom-full mb-2">
        {content}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
      </div>
    );
  };

  const displayOptions = showAllOptions ? shippingOptions : [shippingOptions[0]];

  const toggleShowAllOptions = () => {
    setShowAllOptions(!showAllOptions);
  };

  const renderMiniTimer = (option: any) => {
    const timeRemaining = calculateCutoffTime(option.cutoffTime);
    
    if (timeRemaining.expired) {
      return (
        <div className="flex items-center text-gray-400 text-xs">
          <Clock size={10} className="mr-0.5" />
          <span>Ships tomorrow</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-green-600 text-xs">
        <Clock size={10} className="mr-0.5" />
        <span>{timeRemaining.hours}h {timeRemaining.minutes}m left</span>
      </div>
    );
  };

  const renderRating = (rating: number, count: number) => {
    return (
      <div className="flex items-center">
        <span className="text-amber-500 flex items-center">
          <Star size={10} fill="currentColor" />
          <span className="ml-0.5 text-xs">{rating}</span>
        </span>
        <span className="text-xs text-gray-500 ml-1">({count})</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md font-sans">
      <div className="mt-1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Truck size={16} className="text-red-500 mr-1" />
            <h2 className="font-medium text-sm text-gray-800">Delivery Options</h2>
          </div>
          
          {selectedShipping && (
            <div className="text-xs text-red-600 font-medium flex items-center">
              <Calendar size={12} className="mr-1" />
              {selectedShipping.dates}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {displayOptions.map(option => {
            const isSelected = selectedOption === option.id;
            const isSaved = savedOptions.includes(option.id);
            const isExpanded = expandedDetails === option.id;
            
            return (
              <div 
                key={option.id}
                className={`flex flex-col items-center justify-between px-2 py-1 w-full rounded-md ${isSelected ? 'border-2 border-red-500 bg-red-50' : 'border border-gray-200'} transition-all hover:shadow-sm cursor-pointer relative`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <div className={`mr-1.5 ${isSelected ? 'text-red-600' : 'text-gray-600'}`}>{option.icon}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className={`font-medium text-sm ${isSelected ? 'text-red-600' : ''}`}>{option.name}</h3>
                        {option.recommended && (
                          <span className="ml-1">
                            <Zap size={12} className="text-red-500" />
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <img 
                          src={option.carrierLogoUrl} 
                          alt={`${option.carrier} logo`} 
                          className="h-4 mr-1" 
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/api/placeholder/40/20";
                          }}
                        />
                        <span>{option.carrier}</span>
                        <span className="mx-1">•</span>
                        <span>{option.estimate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className={`font-medium text-sm mr-2 ${option.price === 0 ? 'text-green-500' : isSelected ? 'text-red-600' : 'text-gray-900'}`}>
                        {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                      </span>
                      <div onClick={(e) => { e.stopPropagation(); toggleSave(option.id); }}>
                        <Heart size={16} className={`cursor-pointer ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    
                    {option.savings > 0 && (
                      <div className="text-xs text-green-600 flex items-center">
                        <DollarSign size={10} className="mr-0.5" />
                        <span>Save ${option.savings.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-1.5 w-full">
                  {renderMiniTimer(option)}
                  
                  {renderRating(option.rating, option.ratingCount)}
                </div>
                
                <div className="flex flex-wrap items-center mt-1.5 gap-x-2 gap-y-1 w-full">
                  {option.badge && (
                    <span className={`text-xs px-1 py-0.5 rounded inline-flex items-center
                      ${option.badge === 'Free' ? 'bg-green-100 text-green-600' : 
                        option.badge === 'Local' ? 'bg-blue-100 text-blue-600' : ''}`}>
                      {option.badge}
                    </span>
                  )}
                  
                  {option.protection && (
                    <div className="relative" onClick={(e) => {
                      e.stopPropagation(); 
                      setShowTooltip(showTooltip === `protection-${option.id}` ? null : `protection-${option.id}`);
                    }}>
                      <span className="text-xs flex items-center text-gray-600">
                        <Shield size={10} className="mr-0.5 text-green-500" />
                        Protected
                        <Info size={8} className="ml-0.5 text-gray-400" />
                      </span>
                      {showTooltip === `protection-${option.id}` && renderTooltip(
                        <div>
                          <p className="font-medium mb-1">Buyer Protection</p>
                          <p className="mt-0.5">Returns: {option.returnPolicy}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {option.carbonNeutral && (
                    <span className="text-xs flex items-center text-gray-600">
                      <Globe size={10} className="mr-0.5 text-green-500" />
                      Eco
                    </span>
                  )}
                  
                  {option.restrictions && (
                    <div className="relative" onClick={(e) => {
                      e.stopPropagation(); 
                      setShowTooltip(showTooltip === `restrictions-${option.id}` ? null : `restrictions-${option.id}`);
                    }}>
                      <span className="text-xs flex items-center text-amber-600">
                        <AlertTriangle size={10} className="mr-0.5" />
                        Restrictions
                        <Info size={8} className="ml-0.5 text-gray-400" />
                      </span>
                      {showTooltip === `restrictions-${option.id}` && renderTooltip(
                        <p>Some items may have delivery restrictions. Check individual product pages for details.</p>
                      )}
                    </div>
                  )}
                  
                  <button 
                    className="text-xs flex items-center text-blue-600 ml-auto"
                    onClick={(e) => toggleDetails(e, option.id)}
                  >
                    <Info size={10} className="mr-0.5" />
                    Details
                    {isExpanded ? 
                      <ChevronUp size={10} className="ml-0.5" /> : 
                      <ChevronDown size={10} className="ml-0.5" />
                    }
                  </button>
                </div>
                
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-700 w-full">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex items-center">
                        <Clock size={10} className="text-gray-500 mr-1" />
                        <span>Order by: {option.cutoffTimeDisplay}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield size={10} className="text-gray-500 mr-1" />
                        <span>{option.returnPolicy}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck size={10} className="text-gray-500 mr-1" />
                        <span>{option.carrier} Tracking</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={10} className="text-gray-500 mr-1" />
                        <span>Delivers {option.dates}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-start">
                      <Info size={10} className="text-gray-500 mr-1 mt-0.5" />
                      <span>{option.detailedInfo}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <button 
          className="w-full flex items-center justify-center mt-3 text-xs text-red-500 py-2 border border-red-200 rounded-md hover:bg-red-50"
          onClick={toggleShowAllOptions}
        >
          {showAllOptions ? (
            <>
              <ChevronUp size={12} className="mr-1" />
              View Less Options
            </>
          ) : (
            <>
              <ArrowRight size={12} className="mr-1" />
              View More Options
            </>
          )}
        </button>
        
        <div className="mt-3 flex justify-between items-center text-xs">
          <div className="text-red-600 flex items-center">
            <Globe size={12} className="mr-0.5" />
            <span>Free shipping over $35</span>
          </div>
          <div className="text-gray-500 flex items-center">
            <Info size={12} className="mr-0.5" />
            <span>Delivery times may vary</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingOptionsComponent;
