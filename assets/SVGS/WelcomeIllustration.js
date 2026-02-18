import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

// Welcome screen - Rocket launching
export function WelcomeIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Rocket */}
      <G transform="translate(150, 120)">
        {/* Rocket body */}
        <Path
          d="M-20 40 L-20 -20 Q-20 -50 0 -70 Q20 -50 20 -20 L20 40 L0 50 Z"
          fill="#6366f1"
        />
        
        {/* Rocket nose cone */}
        <Path d="M-20 -20 Q-20 -50 0 -70 Q20 -50 20 -20 Z" fill="#4f46e5"/>
        
        {/* Window */}
        <Circle cx="0" cy="-10" r="12" fill="#bfdbfe"/>
        <Circle cx="0" cy="-10" r="9" fill="#3b82f6"/>
        
        {/* Fins */}
        <Path d="M-20 20 L-40 40 L-20 40 Z" fill="#ef4444"/>
        <Path d="M20 20 L40 40 L20 40 Z" fill="#ef4444"/>
        
        {/* Bottom detail */}
        <Rect x="-15" y="40" width="30" height="8" fill="#1e40af"/>
        
        {/* Fire/exhaust */}
        <G transform="translate(0, 50)">
          <Path d="M-12 0 Q-15 15 -8 25 Q0 30 8 25 Q15 15 12 0 Z" fill="#fbbf24"/>
          <Path d="M-8 0 Q-10 12 -5 20 Q0 25 5 20 Q10 12 8 0 Z" fill="#f97316"/>
          <Path d="M-5 0 Q-6 8 -2 15 Q0 18 2 15 Q6 8 5 0 Z" fill="#fde047"/>
        </G>
        
        {/* Side boosters fire */}
        <G transform="translate(-20, 40)">
          <Path d="M-5 0 Q-8 8 -4 15 L0 0 Z" fill="#fbbf24"/>
          <Path d="M-3 0 Q-5 6 -2 12 L0 0 Z" fill="#f97316"/>
        </G>
        <G transform="translate(20, 40)">
          <Path d="M5 0 Q8 8 4 15 L0 0 Z" fill="#fbbf24"/>
          <Path d="M3 0 Q5 6 2 12 L0 0 Z" fill="#f97316"/>
        </G>
        
        {/* Stars on rocket */}
        <Circle cx="-8" cy="10" r="2" fill="#fff"/>
        <Circle cx="8" cy="15" r="2" fill="#fff"/>
      </G>
      
      {/* Stars in sky */}
      <Path d="M60 50 L62 56 L68 58 L62 60 L60 66 L58 60 L52 58 L58 56 Z" fill="#fbbf24"/>
      <Path d="M230 60 L232 66 L238 68 L232 70 L230 76 L228 70 L222 68 L228 66 Z" fill="#fde047"/>
      <Path d="M80 180 L82 184 L86 186 L82 188 L80 192 L78 188 L74 186 L78 184 Z" fill="#fbbf24"/>
      <Path d="M220 190 L222 194 L226 196 L222 198 L220 202 L218 198 L214 196 L218 194 Z" fill="#fde047"/>
      
      {/* Small stars */}
      <Circle cx="100" cy="80" r="2" fill="#fff"/>
      <Circle cx="200" cy="100" r="2" fill="#fff"/>
      <Circle cx="70" cy="140" r="2" fill="#fff"/>
      <Circle cx="240" cy="150" r="2" fill="#fff"/>
      <Circle cx="180" cy="240" r="2" fill="#fff"/>
      
      {/* Planets */}
      <Circle cx="50" cy="220" r="20" fill="#8b5cf6" opacity="0.6"/>
      <Circle cx="250" cy="240" r="15" fill="#06b6d4" opacity="0.6"/>
      <Ellipse cx="250" cy="240" rx="25" ry="5" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6"/>
      
      {/* Sparkles/twinkles */}
      <Path d="M40 100 L41 102 L43 103 L41 104 L40 106 L39 104 L37 103 L39 102 Z" fill="#c4b5fd"/>
      <Path d="M260 120 L261 122 L263 123 L261 124 L260 126 L259 124 L257 123 L259 122 Z" fill="#a78bfa"/>
      <Path d="M120 240 L121 242 L123 243 L121 244 L120 246 L119 244 L117 243 L119 242 Z" fill="#fbbf24"/>
    </Svg>
  );
}
