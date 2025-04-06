
export const addBubbleEffect = (
  bubbleEffects: Array<{x: number, y: number, size: number, duration: number}>, 
  setBubbleEffects: React.Dispatch<React.SetStateAction<Array<{x: number, y: number, size: number, duration: number}>>>,
  x: number, 
  y: number
) => {
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

export const addFloatingHeart = (
  floatingHearts: Array<{id: number, x: number}>,
  setFloatingHearts: React.Dispatch<React.SetStateAction<Array<{id: number, x: number}>>>,
) => {
  const newHeart = {
    id: Date.now(),
    x: Math.random() * 30 - 15
  };
  
  setFloatingHearts(prev => [...prev, newHeart]);
  
  setTimeout(() => {
    setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
  }, 1500);
};

export const formatTime = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const formatMilliseconds = (ms: number) => {
  return Math.floor(ms / 10).toString().padStart(2, '0');
};

// Animation keyframes styles to be included in the main component
export const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scale-up-down {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
    75% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes rise {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
  }
  
  @keyframes float {
    0% { transform: translateY(0) translateX(0); opacity: 1; }
    100% { transform: translateY(-50px) translateX(var(--float-x, 0)); opacity: 0; }
  }
  
  @keyframes colorChange {
    0% { border-color: #f87171; }
    25% { border-color: #fbbf24; }
    50% { border-color: #34d399; }
    75% { border-color: #60a5fa; }
    100% { border-color: #f87171; }
  }
  
  .scale-up-down {
    animation: scale-up-down 0.5s ease-in-out;
  }
  
  .animate-heartbeat {
    animation: heartbeat 1s ease-in-out;
  }
  
  .animate-wiggle {
    animation: wiggle 0.5s ease-in-out;
  }
  
  .rainbow-border {
    border-image: linear-gradient(45deg, #f87171, #fbbf24, #34d399, #60a5fa, #f87171) 1;
    animation: colorChange 2s linear infinite;
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(-1deg); }
    50% { transform: rotate(1deg); }
  }
  
  .countdown-container {
    display: flex;
    align-items: center;
    background: rgba(254, 226, 226, 0.4);
    border-radius: 4px;
    padding: 2px 4px;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .countdown-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .countdown-value {
    font-family: monospace;
    font-weight: bold;
    font-size: 12px;
    color: #ef4444;
    min-width: 18px;
    text-align: center;
  }

  .countdown-value.milliseconds {
    font-size: 10px;
    color: #ef4444;
    width: 16px;
  }

  .countdown-label {
    font-size: 8px;
    color: #6b7280;
    text-transform: uppercase;
  }

  .countdown-separator {
    color: #ef4444;
    font-weight: bold;
    margin: 0 1px;
    font-size: 12px;
  }
  
  @keyframes twinkle {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  @keyframes fade-out {
    0% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;
