import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useProduct } from '@/hooks/useProduct';

import SocialProof from './buy-button/SocialProof';
import VisualEffects from './buy-button/VisualEffects';
import Price from './buy-button/Price';
import InteractionControls from './buy-button/InteractionControls';
import StockAndTimer from './buy-button/StockAndTimer';
import FeatureDisplay from './buy-button/FeatureDisplay';
import ProductControls from './buy-button/ProductControls';
import ActionButtons from './buy-button/ActionButtons';
import StockIndicator from './buy-button/StockIndicator';
import PaymentOptions from './buy-button/PaymentOptions';
import VariantDropdown from './buy-button/VariantDropdown';
import DeliveryDropdown from './buy-button/DeliveryDropdown';
import { animationStyles } from './buy-button/animations';

import { ShoppingCart, Clock, Check, ChevronDown, Star, Info, TrendingUp, Heart, ShieldCheck, ArrowRight, AlertTriangle, Plus, Minus, Truck, Gift, RefreshCw, Share2, Lock, Zap } from 'lucide-react';

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
            ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'][Math.floor(Math.random() * 4)], 
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
          ['#FFD700', '#FFA500', '#FF4500', '#FF8C00'][Math.floor(Math.random() * 4)],
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

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 font-sans" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setVariantOpen(false);
        setDeliveryOptions(false);
        setPaymentExpanded(false);
      }}
    >
      <SocialProof 
        showSocialProof={showSocialProof}
        currentSocialProofMessage={currentSocialProofMessage}
        slideAnimations={slideAnimations}
        showPriceIncrease={showPriceIncrease}
      />
      
      <VisualEffects 
        mouseTrail={mouseTrail}
        sparkleEffect={sparkleEffect}
        confettiEffects={confettiEffects}
        particleEffects={particleEffects}
        bubbleEffects={bubbleEffects}
        floatingHearts={floatingHearts}
        showAddedAnimation={showAddedAnimation}
      />
      
      {isHovering && (
        <div 
          className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-lg animate-bounce"
          style={{ animation: 'fadeIn 0.3s ease-in-out, bounce 1s infinite' }}
        >
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
          <span className="inline-flex items-center">
            Hurry! Almost gone!
          </span>
        </div>
      )}
      
      <VariantDropdown 
        variantOpen={variantOpen}
        variants={variants}
        selectedVariant={selectedVariant}
        handleVariantChange={handleVariantChange}
        variantColors={variantColors}
      />
      
      <DeliveryDropdown 
        deliveryOptions={deliveryOptions}
        deliveryFeatures={deliveryFeatures}
      />
      
      <div className={`relative bg-white shadow-lg border-t border-gray-200 ${rainbowBorder ? 'rainbow-border' : ''}`}>
        <StockIndicator 
          stockRemaining={stockRemaining}
          highlightStock={highlightStock}
          rotateIcons={rotateIcons}
          pulseDiscount={pulseDiscount}
          stockPercentage={stockPercentage}
          stockProgressAnimation={stockProgressAnimation}
        />
        
        <div className="flex flex-col px-3 py-1.5 bg-white">
          <div className="flex items-center justify-between mb-1">
            <Price 
              currentPrice={currentPrice}
              animatePrice={animatePrice}
              pulseDiscount={pulseDiscount}
              discountPercentage={discountPercentage}
              rotateIcons={rotateIcons}
              setShowPriceIncrease={setShowPriceIncrease}
              variantColors={variantColors}
              selectedVariant={selectedVariant}
              variantChangeAnimation={variantChangeAnimation}
            />
            
            <InteractionControls 
              shareProduct={shareProduct}
              toggleHeart={toggleHeart}
              rotateIcons={rotateIcons}
              isHearted={isHearted}
              heartCount={heartCount}
            />
            
            <StockAndTimer 
              timeLeft={timeLeft}
              highlightStock={highlightStock}
              stockRemaining={stockRemaining}
              itemsInCart={itemsInCart}
            />
          </div>
          
          <FeatureDisplay 
            features={features}
            activeFeature={activeFeature}
            rotateIcons={rotateIcons}
            totalPrice={totalPrice}
            animatePrice={animatePrice}
          />
          
          <div className="flex items-center space-x-2 justify-between">
            <ProductControls 
              variantColors={variantColors}
              selectedVariant={selectedVariant}
              variantOpen={variantOpen}
              setVariantOpen={setVariantOpen}
              variantChangeAnimation={variantChangeAnimation}
              deliveryOptions={deliveryOptions}
              setDeliveryOptions={setDeliveryOptions}
              rotateIcons={rotateIcons}
              wiggleQuantity={wiggleQuantity}
              quantity={quantity}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
            />
            
            <div className="relative">
              <ActionButtons 
                handleBuyNow={handleBuyNow}
                buttonHover={buttonHover}
                setButtonHover={setButtonHover}
                setShowInstantBuy={setShowInstantBuy}
                rotateIcons={rotateIcons}
                shakeButton={shakeButton}
                bounceButton={bounceButton}
                showInstantBuy={showInstantBuy}
                handleInstantBuy={handleInstantBuy}
              />
            </div>
          </div>
        </div>
        
        <PaymentOptions 
          rotateIcons={rotateIcons}
          setSparkleEffect={setSparkleEffect}
          rainbowBorder={rainbowBorder}
          colorCycle={colorCycle}
          hueRotate={hueRotate}
        />
      </div>
      
      <style>{animationStyles}</style>
      
      <style>
        {`
          @keyframes slide-left {
            0% { opacity: 0; transform: translateX(20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-right {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-top {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-bottom {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .slide-left {
            animation: slide-left 0.5s ease-out forwards;
          }
          
          .slide-right {
            animation: slide-right 0.5s ease-out forwards;
          }
          
          .slide-top {
            animation: slide-top 0.5s ease-out forwards;
          }
          
          .slide-bottom {
            animation: slide-bottom 0.5s ease-out forwards;
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ModernBuyButton;
