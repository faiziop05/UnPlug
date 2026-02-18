import React from 'react';
import Svg, { G, Path, Line, Circle, Ellipse } from 'react-native-svg';

export function FocusIllustration({ width = 400, height = 400 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 400" fill="none">
      {/* Person meditating/focusing */}
      <G transform="translate(200, 200)">
        {/* Head */}
        <Circle cx="0" cy="-40" r="30" fill="#fbbf24"/>
        
        {/* Body */}
        <Ellipse cx="0" cy="0" rx="35" ry="45" fill="#3b82f6"/>
        
        {/* Arms in meditation pose */}
        <Ellipse cx="-28" cy="5" rx="12" ry="25" fill="#2563eb" transform="rotate(-20 -28 5)"/>
        <Ellipse cx="28" cy="5" rx="12" ry="25" fill="#2563eb" transform="rotate(20 28 5)"/>
        
        {/* Hands */}
        <Circle cx="-25" cy="30" r="8" fill="#fde047"/>
        <Circle cx="25" cy="30" r="8" fill="#fde047"/>
        
        {/* Legs in lotus position */}
        <Ellipse cx="-20" cy="45" rx="25" ry="15" fill="#1e40af"/>
        <Ellipse cx="20" cy="45" rx="25" ry="15" fill="#1e40af"/>
        
        {/* Focus circles around head */}
        <Circle cx="0" cy="-40" r="45" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Circle cx="0" cy="-40" r="55" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.4"/>
        <Circle cx="0" cy="-40" r="65" stroke="#c4b5fd" strokeWidth="2" fill="none" opacity="0.2"/>
        
        {/* Brain icon on chest */}
        <G transform="translate(0, -10)">
          <Path
            d="M-8 0 C-8 -4 -4 -8 0 -8 C4 -8 8 -4 8 0 C8 4 4 8 0 8 C-4 8 -8 4 -8 0"
            fill="#ddd6fe"
          />
          <Path
            d="M-5 -2 Q-3 -4 0 -2 Q3 -4 5 -2 M-5 2 Q-3 4 0 2 Q3 4 5 2"
            stroke="#7c3aed"
            strokeWidth="1.5"
            fill="none"
          />
        </G>
      </G>
      
      {/* Target/goal symbols */}
      <G transform="translate(100, 100)">
        <Circle cx="0" cy="0" r="20" stroke="#ef4444" strokeWidth="3" fill="none"/>
        <Circle cx="0" cy="0" r="12" stroke="#ef4444" strokeWidth="3" fill="none"/>
        <Circle cx="0" cy="0" r="4" fill="#ef4444"/>
      </G>
      
      <G transform="translate(300, 120)">
        <Circle cx="0" cy="0" r="15" stroke="#10b981" strokeWidth="2" fill="none"/>
        <Circle cx="0" cy="0" r="9" stroke="#10b981" strokeWidth="2" fill="none"/>
        <Circle cx="0" cy="0" r="3" fill="#10b981"/>
      </G>
      
      {/* Floating achievement stars */}
      <Path d="M320 280 L323 290 L333 293 L323 296 L320 306 L317 296 L307 293 L317 290 Z" fill="#fbbf24"/>
      <Path d="M70 250 L72 257 L79 259 L72 261 L70 268 L68 261 L61 259 L68 257 Z" fill="#fbbf24"/>
      <Path d="M90 320 L92 325 L97 327 L92 329 L90 334 L88 329 L83 327 L88 325 Z" fill="#f59e0b"/>
    </Svg>
  );
}
