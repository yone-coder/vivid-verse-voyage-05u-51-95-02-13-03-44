import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Check, ChevronDown, Star, Info, TrendingUp, Heart, ShieldCheck, ArrowRight, AlertTriangle, Plus, Minus, Truck, Gift, RefreshCw, Share2, Lock, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useProduct } from '@/hooks/useProduct';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";

const ModernBuyButton = ({ productId }: { productId?: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Red');
  const [timeLeft, setTimeLeft] = useState({ minutes: 3, seconds: 20, milliseconds: 0 });
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(true);
  const [currentSocialProofMessage, setCurrentSocialProofMessage] = useState('');
  const [pulseDiscount, setPulseDiscount] = useState(false);
  const [highlightStock, setHighlightStock] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [showFeature, setShowFeature] = useState(0);
  const [shakeButton, setShakeButton] = useState(false);
  const [stockRemaining, setStockRemaining] = useState(100);
  const [basePrice, setBasePrice] = useState(49.99);
  const [priceIncrement, setPriceIncrement] = useState(0);
  const [showPriceIncrease, setShowPriceIncrease] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stockProgressAnimation, setStockProgressAnimation] = useState(false);
  const [heartCount, setHeartCount] = useState(432);
  const [isHearted, setIsHearted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState(false);
  const [showInstantBuy, setShowInstantBuy] = useState(false);
  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [bubbleEffects, setBubbleEffects] = useState<{x: number, y: number, size: number, duration: number}[]>([]);
  const [variantChangeAnimation, setVariantChangeAnimation] = useState(false);
  const [rotateIcons, setRotateIcons] = useState(false);
  const [wiggleQuantity, setWiggleQuantity] = useState(false);
  const [rainbowBorder, setRainbowBorder] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{id: number, x: number}[]>([]);
  const [bounceButton, setBounceButton] = useState(false);
  const [confettiEffects, setConfettiEffects] = useState<{x: number, y: number, color: string, angle: number, speed: number}[]>([]);
  const [glowEffect, setGlowEffect] = useState(false);
  const [colorCycle, setColorCycle] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number, size: number, color: string}[]>([]);
  const [slideAnimations, setSlideAnimations] = useState({left: false, right: false, top: false, bottom: false});
  const [pulse3D, setPulse3D] = useState(false);
  const [twistEffect, setTwistEffect] = useState(false);
  const [flipEffect, setFlipEffect] = useState(false);
  const [jitterEffect, setJitterEffect] = useState(false);
  const [popEffect, setPopEffect] = useState(false);
  const [waveEffect, setWaveEffect] = useState(false);
  const [compressEffect, setCompressEffect] = useState(false);
  const [swingEffect, setSwingEffect] = useState(false);
  const [danceEffect, setDanceEffect] = useState(false);
  const [hueRotate, setHueRotate] = useState(0);
  const [particleEffects, setParticleEffects] = useState<{x: number, y: number, color: string, size: number, duration: number}[]>([]);
  const { data: product } = useProduct(productId || '');

  const socialProofMessages = [
    "15 people bought this in the last hour!",
    "Someone from New York just purchased this.",
    "32 people are currently viewing this item.",
    "Back in stock! Limited quantity available.",
    "Hot right now! Selling 5x faster than usual.",
    "Only 2 left in stock - selling fast!",
    "Deal ends in 01:42:35 - don't miss out!",
    "Your size is almost gone!",
    "Next restock expected in 2 weeks.",
    "This item was sold out last week. Get it while you can!",
    "Rated 4.9/5 by 870 customers.",
    "\"Exactly what I needed!\" - James T.",
    "Over 3,000 people love this product.",
    "Top-rated in its category.",
    "\"Fast shipping and great quality!\" - Verified Buyer",
    "You've been looking at this for a while... ready to grab it?",
    "This item completes your vibe. Just sayin'.",
    "Seen on TikTok - going viral now!",
    "Buy now and get a surprise bonus!",
    "Cart's waiting... but this product won't!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newMilliseconds = prev.milliseconds - 10;
        
        if (newMilliseconds < 0) {
          const newSeconds = prev.seconds - 1;
          
          if (newSeconds < 0) {
            const newMinutes = prev.minutes - 1;
            
            if (newMinutes < 0) {
              clearInterval(timer);
              return { minutes: 0, seconds: 0, milliseconds: 0 };
            }
            
            return { minutes: newMinutes, seconds: 59, milliseconds: 990 };
          }
          
          return { ...prev, seconds: newSeconds, milliseconds: 990 };
        }
        
        return { ...prev, milliseconds: newMilliseconds };
      });
    }, 10);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.seconds === 0 && timeLeft.milliseconds === 0) {
      setHighlightStock(true);
      setWiggleQuantity(true);
      setTimeout(() => {
        setHighlightStock(false);
        setWiggleQuantity(false);
      }, 1000);
    }
  }, [timeLeft.seconds, timeLeft.milliseconds]);

  useEffect(() => {
    const socialProofTimer = setInterval(() => {
      const randomMessage = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
      
      setShowSocialProof(false);
      
      const directions = ['left', 'right', 'top', 'bottom'];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)] as keyof typeof slideAnimations;
      
      setSlideAnimations(prev => ({...prev, [randomDirection]: true}));
      
      setTimeout(() => {
        setCurrentSocialProofMessage(randomMessage);
        setShowSocialProof(true);
        
        setTimeout(() => {
          setSlideAnimations(prev => ({...prev, [randomDirection]: false}));
        }, 500);
      }, 500);
      
    }, 8000);
    
    setCurrentSocialProofMessage(socialProofMessages[0]);
    
    return () => clearInterval(socialProofTimer);
  }, []);

  useEffect(() => {
    const discountInterval = setInterval(() => {
      setPulseDiscount(true);
      setRainbowBorder(true);
      setColorCycle(true);
      setHueRotate(Math.random() * 360);
      
      setTimeout(() => {
        setPulseDiscount(false);
        setRainbowBorder(false);
        setColorCycle(false);
      }, 2000);
    }, 10000);
    
    return () => clearInterval(discountInterval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => {
        const newValue = (prev + 1) % 5;
        setRotateIcons(true);
        setPulse3D(true);
        setTwistEffect(true);
        
        setTimeout(() => {
          setRotateIcons(false);
          setPulse3D(false);
          setTwistEffect(false);
        }, 500);
        return newValue;
      });
    }, 3000);
    
    return () => clearInterval(featureInterval);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      if (stockRemaining <= 70 && Math.random() > 0.5) {
        const increaseFactor = (100 - stockRemaining) / 100;
        const newIncrement = priceIncrement + parseFloat((Math.random() * 2 * increaseFactor).toFixed(2));
        setPriceIncrement(newIncrement);
        setAnimatePrice(true);
        setShowPriceIncrease(true);
        setBounceButton(true);
        setFlipEffect(true);
        
        for (let i = 0; i < 15; i++) {
          addConfettiEffect(Math.random() * 300, 100, 
            ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)], 
            Math.random() * 360, 
            Math.random() * 2 + 1);
        }
        
        setTimeout(() => {
          setAnimatePrice(false);
          setBounceButton(false);
          setFlipEffect(false);
          
          setTimeout(() => {
            setShowPriceIncrease(false);
          }, 3000);
        }, 1000);
      } else {
        setAnimatePrice(true);
        setJitterEffect(true);
        setTimeout(() => {
          setAnimatePrice(false);
          setJitterEffect(false);
        }, 1000);
      }
    }, 15000);
    
    return () => clearInterval(priceInterval);
  }, [priceIncrement, stockRemaining]);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (!isHovering) {
        setShakeButton(true);
        setPopEffect(true);
        setGlowEffect(true);
        
        setTimeout(() => {
          setShakeButton(false);
          setPopEffect(false);
          setGlowEffect(false);
        }, 800);
      }
    }, 20000);
    
    return () => clearInterval(shakeInterval);
  }, [isHovering]);

  useEffect(() => {
    const stockInterval = setInterval(() => {
      if (Math.random() > 0.6 && stockRemaining > 1) {
        const reduction = Math.floor(Math.random() * 3) + 1;
        setStockRemaining(prev => Math.max(1, prev - reduction));
        
        setStockProgressAnimation(true);
        setSparkleEffect(true);
        setWaveEffect(true);
        
        for (let i = 0; i < 8; i++) {
          addParticleEffect(
            200 + Math.random() * 50, 
            50 + Math.random() * 20,
            ['#ff4136', '#ff851b', '#ffdc00', '#2ecc40'][Math.floor(Math.random() * 4)],
            Math.random() * 5 + 2,
            Math.random() * 2 + 1
          );
        }
        
        setTimeout(() => {
          setStockProgressAnimation(false);
          setSparkleEffect(false);
          setWaveEffect(false);
        }, 1000);
        
        setHighlightStock(true);
        setSwingEffect(true);
        setTimeout(() => {
          setHighlightStock(false);
          setSwingEffect(false);
        }, 1000);
        
        if (stockRemaining < 50) {
          const priceIncrease = parseFloat((Math.random() * 0.5).toFixed(2));
          setPriceIncrement(prev => prev + priceIncrease);
          setAnimatePrice(true);
          setCompressEffect(true);
          setTimeout(() => {
            setAnimatePrice(false);
            setCompressEffect(false);
          }, 1000);
        }
      }
    }, 10000);
    
    return () => clearInterval(stockInterval);
  }, [stockRemaining]);
  
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setRotateIcons(prev => !prev);
      setDanceEffect(true);
      setTimeout(() => setDanceEffect(false), 1000);
    }, 5000);
    
    return () => clearInterval(iconInterval);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPoint = {
      x,
      y,
      size: Math.random() * 8 + 4,
      color: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)],
    };
    
    setMouseTrail(prev => [...prev, newPoint]);
    
    if (mouseTrail.length > 15) {
      setMouseTrail(prev => prev.slice(1));
    }
  };

  const addConfettiEffect = (x: number, y: number, color: string, angle: number, speed: number) => {
    const newConfetti = {
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      color,
      angle,
      speed
    };
    
    setConfettiEffects(prev => [...prev, newConfetti]);
    
    setTimeout(() => {
      setConfettiEffects(prev => prev.filter(c => c !== newConfetti));
    }, speed * 1000);
  };
  
  const addParticleEffect = (x: number, y: number, color: string, size: number, duration: number) => {
    const newParticle = {
      x,
      y,
      color,
      size,
      duration
    };
    
    setParticleEffects(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticleEffects(prev => prev.filter(p => p !== newParticle));
    }, duration * 1000);
  };

  const addBubbleEffect = (x: number, y: number) => {
    const newBubble = {
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 2 + 1
    };
    
    setBubbleEffects(prev => [...prev, newBubble]);
    
    setTimeout(() => {
      setBubbleEffects(prev => prev.filter(b => b !== newBubble));
    }, newBubble.duration * 1000);
  };

  const handleBuyNow = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
      setStockProgressAnimation(true);
      setTimeout(() => setStockProgressAnimation(false), 1000);
    }
    
    setSparkleEffect(true);
    setTimeout(() => setSparkleEffect(false), 2000);
    
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        addBubbleEffect(Math.random() * 300, Math.random() * 100);
      }, i * 100);
    }
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        addConfettiEffect(
          Math.random() * 300, 
          Math.random() * 100, 
          ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#FF1493', '#9C27B0'][Math.floor(Math.random() * 6)],
          Math.random() * 360,
          Math.random() * 3 + 1
        );
      }, i * 50);
    }
    
    toast.success("Item added to cart!", { 
      description: `${quantity} x ${selectedVariant} variant added`,
      duration: 3000
    });
    
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 1500);
  };

  const handleInstantBuy = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
    }
    
    setSparkleEffect(true);
    setPulse3D(true);
    
    setTimeout(() => {
      setSparkleEffect(false);
      setPulse3D(false);
    }, 2000);
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        addBubbleEffect(Math.random() * 300, Math.random() * 100);
      }, i * 80);
    }
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        addParticleEffect(
          Math.random() * 300,
          Math.random() * 100,
          ['#FFD700', '#FFA500', '#FF4500', '#FF8C00'][Math.floor(Math.random() * 4)],
          Math.random() * 8 + 3,
          Math.random() * 2 + 0.5
        );
      }, i * 60);
    }
    
    toast.success("Express checkout initiated!", {
      description: `Processing ${quantity} x ${selectedVariant} for immediate purchase`,
      duration: 3000
    });
    
    setTimeout(() => {
      toast.info("Redirecting to payment...", {
        description: "You'll be redirected to complete your purchase"
      });
      setShowAddedAnimation(false);
    }, 1500);
  };

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    setVariantChangeAnimation(true);
    setFlipEffect(true);
    
    const variantColorMap = {
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Black': '#000000',
      'Green': '#008000'
    };
    
    const color = variantColorMap[variant as keyof typeof variantColorMap] || '#888888';
    
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        addParticleEffect(
          100 + Math.random() * 50,
          50 + Math.random() * 30,
          color,
          Math.random() * 6 + 2,
          Math.random() * 1.5 + 0.5
        );
      }, i * 50);
    }
    
    setTimeout(() => {
      setVariantChangeAnimation(false);
      setFlipEffect(false);
    }, 1000);
    
    setVariantOpen(false);
  };

  const incrementQuantity = () => {
    if (quantity < stockRemaining && quantity < 10) {
      setQuantity(prev => prev + 1);
      setWiggleQuantity(true);
      setPopEffect(true);
      
      setTimeout(() => {
        setWiggleQuantity(false);
        setPopEffect(false);
      }, 500);
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          addBubbleEffect(250, 50);
        }, i * 100);
      }
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setWiggleQuantity(true);
      setCompressEffect(true);
      
      setTimeout(() => {
        setWiggleQuantity(false);
        setCompressEffect(false);
      }, 500);
    }
  };

  const toggleHeart = () => {
    if (isHearted) {
      setHeartCount(prev => prev - 1);
    } else {
      setHeartCount(prev => prev + 1);
      setButtonHover(true);
      setTimeout(() => setButtonHover(false), 300);
      
      for (let i = 0; i < 5; i++) {
        const newHeart = {
          id: Date.now() + i,
          x: Math.random() * 30 - 15
        };
        
        setFloatingHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1500);
      }
      
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          addParticleEffect(
            270 + Math.random() * 20,
            60 + Math.random() * 20,
            ['#FF69B4', '#FF1493', '#DB7093', '#C71585'][Math.floor(Math.random() * 4)],
            Math.random() * 5 + 3,
            Math.random() * 1.5 + 0.5
          );
        }, i * 70);
      }
    }
    setIsHearted(!isHearted);
  };

  const variants = ['Red', 'Blue', 'Black', 'Green'];
  const variantColors = {
    'Red': 'bg-red-500',
    'Blue': 'bg-blue-500',
    'Black': 'bg-black',
    'Green': 'bg-green-500'
  };

  const features = [
    { icon: <ShieldCheck size={12} />, text: "Guaranteed quality" },
    { icon: <TrendingUp size={12} />, text: "Trending now" },
    { icon: <Heart size={12} />, text: "Customer favorite" },
    { icon: <Truck size={12} />, text: "Free shipping" },
    { icon: <Lock size={12} />, text: "Secure checkout" }
  ];

  const deliveryFeatures = [
    { icon: <Truck size={12} />, text: "Standard (3-5 days)" },
    { icon: <Zap size={12} />, text: "Express (1-2 days)" }
  ];

  const stockPercentage = (stockRemaining / 100) * 100;
  
  const currentPrice = (basePrice + priceIncrement).toFixed(2);
  const totalPrice = (parseFloat(currentPrice) * quantity).toFixed(2);
  const discountPercentage = Math.round(((79.99 - parseFloat(currentPrice)) / 79.99) * 100);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const formatMilliseconds = (ms: number) => {
    return Math.floor(ms / 10).toString().padStart(2, '0');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product',
        text: 'I found this amazing product you might like!',
        url: window.location.href,
      })
      .then(() => {
        toast.success("Shared successfully!");
        setSparkleEffect(true);
        setDanceEffect(true);
        
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            addParticleEffect(
              250 + Math.random() * 30,
              40 + Math.random() * 20,
              ['#4267B2', '#1DA1F2', '#E1306C', '#25D366'][Math.floor(Math.random() * 4)],
              Math.random() * 6 + 2,
              Math.random() * 2 + 1
            );
          }, i * 60);
        }
        
        setTimeout(() => {
          setSparkleEffect(false);
          setDanceEffect(false);
        }, 1000);
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast.success("Link copied to clipboard!");
          setSparkleEffect(true);
          setTwistEffect(true);
          
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              addConfettiEffect(
                250 + Math.random() * 20,
                40 + Math.random() * 20,
                ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107'][Math.floor(Math.random() * 4)],
                Math.random() * 360,
                Math.random() * 1.5 + 0.5
              );
            }, i * 50);
          }
          
          setTimeout(() => {
            setSparkleEffect(false);
            setTwistEffect(false);
          }, 1000);
        })
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 font-sans">
      <div 
        className={`absolute -top-10 left-4 bg-white shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2 
                   transition-all duration-500 
                   ${showSocialProof ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                   ${slideAnimations.left ? 'slide-left' : ''}
                   ${slideAnimations.right ? 'slide-right' : ''}
                   ${slideAnimations.top ? 'slide-top' : ''}
                   ${slideAnimations.bottom ? 'slide-bottom' : ''}`}
      >
        <div className="flex -space-x-1">
          <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white animate-[pulse_1s_ease-in-out_infinite]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white animate-[bounce_1.5s_ease-in-out_infinite]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white animate-[ping_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-xs font-medium text-gray-700">
          <span className="inline-flex items-center">
            <span className="animate-pulse text-red-500 mr-1">•</span>
            {currentSocialProofMessage}
          </span>
        </p>
      </div>
      
      {showPriceIncrease && (
        <div className="absolute -top-16 right-4 bg-amber-50 border border-amber-200 shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2"
             style={{ animation: 'slideDown 0.3s ease-out, pulse 2s infinite' }}>
          <TrendingUp className="text-amber-500 animate-bounce" size={14} />
          <p className="text-xs font-medium text-amber-800 animate-pulse">
            Price increased due to high demand!
          </p>
        </div>
      )}
      
      {mouseTrail.map((point, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            backgroundColor: point.color,
            borderRadius: '50%',
            opacity: 0.5 - (i / mouseTrail.length) * 0.5,
            filter: 'blur(2px)',
            transition: 'opacity 0.3s ease-out',
            animation: `fade-out ${0.5 + i * 0.1}s forwards`
          }}
        />
      ))}
      
      {sparkleEffect && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#FF1493', '#9C27B0'][Math.floor(Math.random() * 6)],
                borderRadius: '50%',
                opacity: Math.random(),
                animation: `twinkle ${Math.random() * 2 + 0.5}s infinite alternate`,
                transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
                filter: `blur(${Math.random() * 2}px)`
              }}
            />
          ))}
        </div>
      )}
      
      {confettiEffects.map((confetti, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${confetti.x}px`,
            bottom: `${confetti.y}px`,
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: confetti.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            opacity: 0.7,
            transform: `rotate(${confetti.angle}deg)`,
            animation: `fall-confetti ${confetti.speed}s linear forwards`
          }}
        />
      ))}

      {particleEffects.map((particle, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: 0.8,
            filter: 'blur(1px)',
            animation: `particle-float ${particle.duration}s ease-out forwards`
          }}
        />
      ))}

      {bubbleEffects.map((bubble, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${bubble.x}px`,
            bottom: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            opacity: 0.6,
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
            animation: `float-bubble ${bubble.duration}s ease-out forwards`
          }}
        />
      ))}

      {floatingHearts.map((heart) => (
        <div 
          key={heart.id}
          className="absolute pointer-events-none z-20 text-red-500"
          style={{
            right: '20px',
            bottom: '100px',
            transform: `translateX(${heart.x}px)`,
            animation: 'float-heart 1.5s ease-out forwards'
          }}
        >
          <Heart 
            size={16} 
            fill="currentColor" 
            style={{
              animation: 'heart-pulse 0.5s ease-out infinite alternate'
            }}
          />
        </div>
      ))}

      <div 
        className={`bg-white border-t shadow-lg p-3 ${bounceButton ? 'animate-bounce-once' : ''} ${rainbowBorder ? 'rainbow-border' : ''}`}
        style={{
          transform: `${jitterEffect ? 'translate(-1px, 1px)' : ''}`,
          filter: colorCycle ? `hue-rotate(${hueRotate}deg)` : 'none',
          transition: 'transform 0.1s, filter 0.5s'
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className={`h-3 w-3 mr-1 ${rotateIcons ? 'animate-spin-slow' : ''}`} /> 
              Flash sale ends in: 
              <span className={`ml-1 font-mono ${highlightStock ? 'text-red-500' : ''}`}>
                {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                <span className="text-xs opacity-70">.{formatMilliseconds(timeLeft.milliseconds)}</span>
              </span>
            </div>
          
            <div 
              className={`flex items-baseline mt-0.5 ${animatePrice ? 'animate-bounce-price' : ''}`}
              style={{
                transform: `${pulse3D ? 'perspective(200px) translateZ(10px)' : ''}`,
                transition: 'transform 0.3s'
              }}
            >
              <span className="text-lg font-bold text-red-600">
                ${currentPrice}
              </span>
              <span className="ml-1 text-xs line-through text-gray-500">${(parseFloat(currentPrice) * 1.4).toFixed(2)}</span>
              <span 
                className={`ml-1 text-xs px-1 bg-red-100 text-red-600 rounded ${pulseDiscount ? 'animate-pulse' : ''}`}
              >
                {discountPercentage}% OFF
              </span>
            </div>
          </div>
          
          <div 
            className={`flex items-center rounded-full px-2 py-0.5 bg-gray-100 ${stockProgressAnimation ? 'animate-pulse' : ''}`}
            style={{
              transform: `${swingEffect ? 'rotate(-2deg)' : ''}`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <ShieldCheck className="h-3 w-3 text-green-600 mr-1" />
            <span className={`text-xs ${highlightStock ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
              {stockRemaining} left
            </span>
          </div>
        </div>
        
        <div className="mb-3">
          <Progress 
            value={stockPercentage} 
            className={`h-1.5 ${stockProgressAnimation ? 'animate-pulse' : ''}`}
            style={{
              transform: `${waveEffect ? 'scaleY(1.5)' : ''}`,
              transition: 'transform 0.2s'
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-1">
            {variants.map(variant => (
              <div
                key={variant}
                className={`w-7 h-7 rounded-full cursor-pointer flex items-center justify-center border-2 transition-transform
                ${selectedVariant === variant 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200'} 
                ${variantChangeAnimation && selectedVariant === variant ? 'animate-pop' : ''}
                ${variantColors[variant as keyof typeof variantColors]}
                `}
                onClick={() => handleVariantChange(variant)}
                style={{
                  transform: `${flipEffect && selectedVariant === variant ? 'rotateY(180deg)' : ''}`,
                  transition: 'transform 0.3s'
                }}
              >
                {selectedVariant === variant && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center border rounded-full overflow-hidden">
            <button 
              onClick={decrementQuantity} 
              className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 border-r"
              style={{
                transform: `${compressEffect ? 'scale(0.95)' : ''}`,
                transition: 'transform 0.2s'
              }}
            >
              <Minus size={14} />
            </button>
            <div 
              className={`w-8 text-center ${wiggleQuantity ? 'animate-wiggle' : ''}`}
              style={{
                transform: `${popEffect ? 'scale(1.2)' : ''}`,
                transition: 'transform 0.15s'
              }}
            >
              {quantity}
            </div>
            <button 
              onClick={incrementQuantity} 
              className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 border-l"
              style={{
                transform: `${popEffect ? 'scale(1.1)' : ''}`,
                transition: 'transform 0.15s'
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-3">
          <button
            onClick={handleBuyNow}
            className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md flex items-center justify-center transition-transform ${showAddedAnimation ? 'animate-scale-bounce' : ''} ${shakeButton ? 'animate-shake' : ''}`}
            style={{
              boxShadow: glowEffect ? '0 0 20px rgba(239, 68, 68, 0.6)' : 'none',
              transform: `${danceEffect ? 'translateY(-2px)' : ''} ${twistEffect ? 'rotate(2deg)' : ''}`,
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ShoppingCart className={`h-4 w-4 mr-1 ${showAddedAnimation ? 'animate-wiggle-cart' : ''}`} />
            <span>Add to Cart</span>
            {itemsInCart > 0 && (
              <div className="ml-1 text-xs bg-white text-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                {itemsInCart}
              </div>
            )}
          </button>
          
          <button
            onClick={handleInstantBuy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center justify-center transition-all"
            style={{
              transform: `${bounceButton ? 'scale(1.05)' : ''}`,
              transition: 'transform 0.15s'
            }}
          >
            <Zap className={`h-4 w-4 ${sparkleEffect ? 'animate-pulse' : ''}`} />
          </button>
          
          <button
            onClick={toggleHeart}
            className={`border px-3 py-2 rounded-md flex items-center justify-center transition-colors ${isHearted ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
            style={{
              transform: `${buttonHover ? 'scale(1.1)' : ''} ${pulse3D ? 'perspective(200px) translateZ(10px)' : ''}`,
              transition: 'transform 0.15s'
            }}
          >
            <Heart className={`h-4 w-4 ${isHearted ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
          </button>
          
          <button
            onClick={shareProduct}
            className="border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-md flex items-center justify-center transition-colors"
          >
            <Share2 
              className="h-4 w-4 text-gray-500" 
              style={{
                transform: `${rotateIcons ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                transition: 'transform 0.3s ease-in-out'
              }} 
            />
          </button>
        </div>
        
        <div 
          className="grid grid-cols-5 gap-1" 
          style={{
            transform: `${rotateIcons ? 'translateY(-2px)' : 'translateY(0)'}`,
            transition: 'transform 0.2s'
          }}
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center justify-center p-1 rounded ${activeFeature === index ? 'bg-blue-50' : 'bg-gray-50'}`}
              style={{
                transform: `${activeFeature === index ? 'scale(1.05)' : 'scale(1)'}`,
                transition: 'transform 0.3s, background-color 0.3s'
              }}
            >
              <div 
                className={`h-5 w-5 rounded-full flex items-center justify-center ${activeFeature === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
                style={{
                  transform: `${rotateIcons && activeFeature === index ? 'rotate(360deg)' : 'rotate(0deg)'}`,
                  transition: 'transform 0.5s, background-color 0.3s, color 0.3s'
                }}
              >
                {feature.icon}
              </div>
              <div className="text-[10px] text-center mt-0.5 text-gray-600">{feature.text}</div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes float-heart {
            0% { transform: translateY(0) translateX(0); opacity: 1; }
            100% { transform: translateY(-80px) translateX(0); opacity: 0; }
          }
          
          @keyframes heart-pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.3); }
          }
          
          @keyframes fall-confetti {
            0% { transform: translateY(0) rotate(0); opacity: 0.7; }
            100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
          }
          
          @keyframes particle-float {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            100% { transform: translateY(-50px) scale(0); opacity: 0; }
          }
          
          @keyframes float-bubble {
            0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
            100% { transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px) scale(1.5); opacity: 0; }
          }
          
          @keyframes bounce-once {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes wiggle-cart {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
          }
          
          @keyframes bounce-price {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          @keyframes wiggle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
          
          @keyframes scale-bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1.1); }
          }
          
          @keyframes fade-out {
            0% { opacity: 0.5; }
            100% { opacity: 0; }
          }
          
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .rainbow-border {
            border-image: linear-gradient(45deg, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9) 1;
            animation: border-animation 2s linear infinite;
          }
          
          @keyframes border-animation {
            0% { border-image: linear-gradient(45deg, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9) 1; }
            20% { border-image: linear-gradient(45deg, #fb07d9, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8) 1; }
            40% { border-image: linear-gradient(45deg, #ba0cf8, #fb07d9, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2) 1; }
            60% { border-image: linear-gradient(45deg, #5f15f2, #ba0cf8, #fb07d9, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee) 1; }
            80% { border-image: linear-gradient(45deg, #1c7fee, #5f15f2, #ba0cf8, #fb07d9, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2) 1; }
            100% { border-image: linear-gradient(45deg, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9) 1; }
          }
          
          .slide-left {
            animation: slide-in-left 0.5s ease-out;
          }
          
          @keyframes slide-in-left {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          .slide-right {
            animation: slide-in-right 0.5s ease-out;
          }
          
          @keyframes slide-in-right {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          .slide-top {
            animation: slide-in-top 0.5s ease-out;
          }
          
          @keyframes slide-in-top {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .slide-bottom {
            animation: slide-in-bottom 0.5s ease-out;
          }
          
          @keyframes slide-in-bottom {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ModernBuyButton;
