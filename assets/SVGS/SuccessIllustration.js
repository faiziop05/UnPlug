import React from 'react';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';

// Success - Checkmark with celebration
export function SuccessIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Large success checkmark circle */}
      <G transform="translate(150, 140)">
        {/* Outer glow circles */}
        <Circle cx="0" cy="0" r="85" fill="#dcfce7" opacity="0.3"/>
        <Circle cx="0" cy="0" r="70" fill="#dcfce7" opacity="0.5"/>
        
        {/* Main circle */}
        <Circle cx="0" cy="0" r="55" fill="#10b981"/>
        
        {/* Checkmark */}
        <Path
          d="M-20 0 L-5 20 L25 -20"
          stroke="#fff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Inner shine */}
        <Circle cx="-15" cy="-15" r="8" fill="#86efac" opacity="0.6"/>
      </G>
      
      {/* Confetti pieces */}
      <Rect x="70" y="50" width="8" height="8" fill="#fbbf24" transform="rotate(15 74 54)"/>
      <Rect x="230" y="60" width="8" height="8" fill="#ec4899" transform="rotate(-20 234 64)"/>
      <Rect x="60" y="220" width="10" height="10" fill="#8b5cf6" transform="rotate(25 65 225)"/>
      <Rect x="240" y="210" width="10" height="10" fill="#06b6d4" transform="rotate(-15 245 215)"/>
      
      <Circle cx="90" cy="90" r="5" fill="#f59e0b"/>
      <Circle cx="210" cy="100" r="5" fill="#10b981"/>
      <Circle cx="80" cy="190" r="6" fill="#ef4444"/>
      <Circle cx="220" cy="200" r="6" fill="#3b82f6"/>
      
      {/* Streamers */}
      <Path
        d="M50 80 Q60 100 55 120"
        stroke="#fbbf24"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <Path
        d="M250 90 Q240 110 245 130"
        stroke="#ec4899"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <Path
        d="M40 180 Q50 200 45 220"
        stroke="#8b5cf6"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <Path
        d="M260 170 Q250 190 255 210"
        stroke="#06b6d4"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      
      {/* Stars */}
      <Path d="M100 40 L102 48 L110 50 L102 52 L100 60 L98 52 L90 50 L98 48 Z" fill="#fbbf24"/>
      <Path d="M200 45 L202 53 L210 55 L202 57 L200 65 L198 57 L190 55 L198 53 Z" fill="#fde047"/>
      <Path d="M110 240 L112 246 L118 248 L112 250 L110 256 L108 250 L102 248 L108 246 Z" fill="#fbbf24"/>
      <Path d="M190 245 L192 251 L198 253 L192 255 L190 261 L188 255 L182 253 L188 251 Z" fill="#fde047"/>
      
      {/* Small sparkles */}
      <Path d="M130 60 L131 63 L134 64 L131 65 L130 68 L129 65 L126 64 L129 63 Z" fill="#c4b5fd"/>
      <Path d="M170 70 L171 73 L174 74 L171 75 L170 78 L169 75 L166 74 L169 73 Z" fill="#a78bfa"/>
      <Path d="M120 220 L121 223 L124 224 L121 225 L120 228 L119 225 L116 224 L119 223 Z" fill="#fbbf24"/>
      <Path d="M180 230 L181 233 L184 234 L181 235 L180 238 L179 235 L176 234 L179 233 Z" fill="#f59e0b"/>
    </Svg>
  );
}
