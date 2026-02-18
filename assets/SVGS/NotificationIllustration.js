import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Notifications - Bell with alerts
export function NotificationIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Large notification bell */}
      <G transform="translate(150, 140)">
        {/* Bell body */}
        <Path
          d="M-40 20 Q-40 -20 -35 -35 Q-35 -55 0 -55 Q35 -55 35 -35 Q40 -20 40 20 Q50 30 50 40 L-50 40 Q-50 30 -40 20 Z"
          fill="#6366f1"
        />
        
        {/* Bell clapper */}
        <Rect x="-5" y="40" width="10" height="15" rx="3" fill="#4f46e5"/>
        <Circle cx="0" cy="58" r="8" fill="#fbbf24"/>
        
        {/* Bell top */}
        <Rect x="-8" y="-60" width="16" height="8" rx="4" fill="#4f46e5"/>
        
        {/* Notification badge */}
        <Circle cx="35" cy="-30" r="18" fill="#ef4444"/>
        <Path
          d="M35 -38 L35 -27 M35 -24 L35 -22"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Sound waves */}
        <G opacity="0.6">
          <Path d="M-60 -10 Q-70 0 -60 10" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <Path d="M-70 -20 Q-85 0 -70 20" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" fill="none"/>
          
          <Path d="M60 -10 Q70 0 60 10" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <Path d="M70 -20 Q85 0 70 20" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </G>
        
        {/* Glow effect */}
        <Circle cx="0" cy="0" r="70" fill="#e0e7ff" opacity="0.2"/>
      </G>
      
      {/* Floating notification cards */}
      <G transform="translate(70, 70)">
        <Rect width="60" height="45" rx="8" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <Circle cx="12" cy="12" r="6" fill="#10b981"/>
        <Rect x="22" y="8" width="30" height="4" rx="2" fill="#d1d5db"/>
        <Rect x="22" y="16" width="25" height="3" rx="1.5" fill="#e5e7eb"/>
        <Rect x="8" y="28" width="44" height="3" rx="1.5" fill="#e5e7eb"/>
        <Rect x="8" y="35" width="35" height="3" rx="1.5" fill="#e5e7eb"/>
      </G>
      
      <G transform="translate(170, 230)">
        <Rect width="60" height="45" rx="8" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <Circle cx="12" cy="12" r="6" fill="#8b5cf6"/>
        <Rect x="22" y="8" width="30" height="4" rx="2" fill="#d1d5db"/>
        <Rect x="22" y="16" width="25" height="3" rx="1.5" fill="#e5e7eb"/>
        <Rect x="8" y="28" width="44" height="3" rx="1.5" fill="#e5e7eb"/>
        <Rect x="8" y="35" width="35" height="3" rx="1.5" fill="#e5e7eb"/>
      </G>
      
      {/* Message bubbles */}
      <G transform="translate(230, 100)">
        <Circle cx="0" cy="0" r="20" fill="#10b981"/>
        <Path d="M-8 -3 L8 -3 M-8 3 L5 3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        <Path d="M0 20 L5 25 L10 20" fill="#10b981"/>
      </G>
      
      {/* Email icon */}
      <G transform="translate(70, 230)">
        <Rect x="-15" y="-10" width="30" height="20" rx="3" fill="#fbbf24"/>
        <Path d="M-15 -10 L0 3 L15 -10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
      
      {/* Alert indicators */}
      <Circle cx="240" cy="200" r="8" fill="#ef4444"/>
      <Circle cx="260" cy="180" r="6" fill="#f97316"/>
      <Circle cx="60" cy="180" r="8" fill="#ec4899"/>
      
      {/* Stars for attention */}
      <Path d="M240 50 L242 56 L248 58 L242 60 L240 66 L238 60 L232 58 L238 56 Z" fill="#fbbf24"/>
      <Path d="M60 120 L62 124 L66 126 L62 128 L60 132 L58 128 L54 126 L58 124 Z" fill="#fde047"/>
      
      {/* Sparkles */}
      <Path d="M100 240 L101 243 L104 244 L101 245 L100 248 L99 245 L96 244 L99 243 Z" fill="#c4b5fd"/>
      <Path d="M200 60 L201 63 L204 64 L201 65 L200 68 L199 65 L196 64 L199 63 Z" fill="#a78bfa"/>
    </Svg>
  );
}
