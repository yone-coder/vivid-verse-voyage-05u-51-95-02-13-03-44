
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductPaymentOptionsProps {
  paymentOptions: string[];
}

const ProductPaymentOptions: React.FC<ProductPaymentOptionsProps> = ({
  paymentOptions
}) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-gray-700">Payment Options:</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 text-xs text-blue-600"
          onClick={() => setShowPaymentOptions(!showPaymentOptions)}
        >
          {showPaymentOptions ? "Hide" : "View All"}
        </Button>
      </div>
  
      <div className="mt-1 flex flex-wrap gap-1">
        <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
          <img 
            src="/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png" 
            alt="Visa" 
            className="h-3.5 w-6 object-contain"
          />
        </div>
        
        <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
            <circle fill="#EA001B" cx="8" cy="12" r="5"/>
            <circle fill="#F79E1B" cx="16" cy="12" r="5"/>
            <path fill="#FF5F00" d="M12 7.5v9a5 5 0 0 0 0-9z"/>
          </svg>
        </div>
        
        <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
          <img 
            src="/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png" 
            alt="Venmo" 
            className="h-3.5 w-6 object-contain"
          />
        </div>
        
        {showPaymentOptions && (
          <>
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
                <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
                <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
              </svg>
            </div>
            
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                <path d="M19.665 17.082c-.37.9-.54 1.3-1.01 2.09-.66 1.12-1.6 2.52-2.76 2.53-1.04.01-1.3-.68-2.72-.67-1.42 0-1.72.67-2.76.66-1.16-.01-2.05-1.27-2.71-2.39-1.86-3.05-2.05-6.64-.9-8.53.82-1.35 2.12-2.14 3.33-2.14 1.24 0 2.01.68 3.03.68.98 0 1.58-.68 3-.68 1.07 0 2.2.59 3 1.57-2.66 1.63-2.22 5.89.5 7.48zm-4.17-12.97c-1.2.1-2.61 1.21-3.08 2.72-.42 1.35.37 2.95 1.11 3.77.87.79 2.1 1.08 2.81.25-.69-1.24-1.2-2.54-1.07-4.21.12-1.46.8-2.22 1.74-2.81-.45-.23-.95-.37-1.51-.37-.11 0-.11 0 0 .65z" fill="#000"/>
              </svg>
            </div>
            
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                <path d="M16.46 6.66V4.89H16v7.25h.46V8.81h2.71v3.33h.46V4.89h-.46v1.77h-2.71z" fill="#3C4043"/>
                <path d="M13.51 9.2V8.88h2.39v-.48h-2.39V8.07h2.54v-.72h-3v3.3h3.08v-.72h-2.62V9.2z" fill="#3C4043"/>
                <path d="M12.13 10.35c-.32.26-.75.4-1.19.4-.94 0-1.66-.77-1.66-1.72s.72-1.72 1.66-1.72c.45 0 .88.14 1.2.4l.29-.33c-.42-.32-.96-.5-1.5-.5-1.19 0-2.12.93-2.12 2.14S9.81 11.17 11 11.17c.54 0 1.08-.17 1.49-.5l-.36-.32z" fill="#3C4043"/>
                <path d="M6.82 11.45c1.37 0 2.17-.69 2.17-1.96v-3.2h-.88v3.2c0 .82-.45 1.23-1.29 1.23s-1.29-.41-1.29-1.23v-3.2h-.88v3.2c0 1.27.8 1.96 2.17 1.96z" fill="#3C4043"/>
              </svg>
            </div>
          </>
        )}
      </div>
      
      {showPaymentOptions && (
        <div className="mt-2 text-xs text-gray-600">
          Buy Now, Pay Later options available at checkout with Klarna and Afterpay.
        </div>
      )}
    </div>
  );
};

export default ProductPaymentOptions;
