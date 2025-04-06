
import React from 'react';
import { Heart } from 'lucide-react';
import { Check } from 'lucide-react';

interface VisualEffectsProps {
  mouseTrail: Array<{x: number, y: number, size: number, color: string}>;
  sparkleEffect: boolean;
  confettiEffects: Array<{x: number, y: number, color: string, angle: number, speed: number}>;
  particleEffects: Array<{x: number, y: number, color: string, size: number, duration: number}>;
  bubbleEffects: Array<{x: number, y: number, size: number, duration: number}>;
  floatingHearts: Array<{id: number, x: number}>;
  showAddedAnimation: boolean;
}

const VisualEffects = ({ 
  mouseTrail, 
  sparkleEffect, 
  confettiEffects, 
  particleEffects, 
  bubbleEffects,
  floatingHearts,
  showAddedAnimation
}: VisualEffectsProps) => {
  return (
    <>
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
            animation: `rise ${confetti.speed}s ease-out forwards`
          }}
        />
      ))}
      
      {particleEffects.map((particle, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${particle.x}px`,
            bottom: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: 0.8,
            filter: 'blur(1px)',
            animation: `rise ${particle.duration}s ease-out forwards`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
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
            borderRadius: '50%',
            border: '2px solid #fff',
            opacity: 0,
            animation: `rise ${bubble.duration}s ease-out forwards`
          }}
        />
      ))}
      
      {floatingHearts.map((heart) => (
        <div 
          key={heart.id}
          className="absolute pointer-events-none z-20"
          style={{
            right: '50px',
            bottom: '60px',
            transform: `translateX(${heart.x}px)`,
            animation: 'float 1.5s ease-out forwards'
          }}
        >
          <Heart fill="red" size={16} className="text-red-500" />
        </div>
      ))}
      
      {showAddedAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-ping bg-green-500 p-4 rounded-full">
            <Check className="text-white animate-spin" size={24} />
          </div>
          <div className="absolute text-green-500 font-bold text-lg animate-bounce">
            Added to cart!
          </div>
        </div>
      )}
    </>
  );
};

export default VisualEffects;
