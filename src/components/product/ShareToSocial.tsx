import React, { useState } from 'react';
import { Share2, X, Check, Copy, Facebook, Twitter, Link, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareToSocialProps {
  productName: string;
  productImage: string;
}

const ShareToSocial: React.FC<ShareToSocialProps> = ({
  productName,
  productImage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const currentUrl = window.location.href;
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${productName}!`)}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${productName}! ${currentUrl}`)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: productName,
            text: `Check out ${productName}!`,
            url: currentUrl,
          }).catch(console.error);
          return;
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    
    toast({
      title: "Shared successfully",
      description: `Shared to ${platform}`,
    });
    
    setIsOpen(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    
    toast({
      title: "Link copied!",
      description: "Product link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} /> },
    { id: 'twitter', name: 'Twitter', icon: <Twitter size={18} /> },
    { id: 'messenger', name: 'Messenger', icon: <Send size={18} /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <Send size={18} /> },
  ];
  
  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        size="sm"
        className="text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 size={16} className="mr-1" />
        Share
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="font-medium text-sm">Share this product</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-3">
            <div className="flex items-center mb-3">
              <img 
                src={productImage || "/placeholder.svg"} 
                alt={productName} 
                className="w-10 h-10 object-cover rounded border border-gray-200 mr-2"
              />
              <div className="text-sm line-clamp-2">{productName}</div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-3">
              {socialPlatforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => handleShare(platform.id)}
                  className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mb-1">
                    {platform.icon}
                  </div>
                  <span className="text-xs">{platform.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-50 p-2 border-r">
                <Link size={14} />
              </div>
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 text-xs p-2 outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-50 p-2 border-l text-gray-600 hover:text-gray-900"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareToSocial;
