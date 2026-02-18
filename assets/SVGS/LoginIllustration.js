import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

// Login - Person with key/lock
export function LoginIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Person */}
      <G transform="translate(120, 160)">
        {/* Head */}
        <Circle cx="0" cy="-50" r="28" fill="#fbbf24"/>
        
        {/* Body */}
        <Path d="M-25 -22 L-30 30 L30 30 L25 -22 Z" fill="#6366f1"/>
        
        {/* Arms */}
        <Path d="M-25 -15 L-50 0 L-45 25" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round"/>
        <Path d="M25 -15 L50 -5 L60 10" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round"/>
        
        {/* Legs */}
        <Rect x="-20" y="30" width="16" height="45" rx="8" fill="#1e40af"/>
        <Rect x="4" y="30" width="16" height="45" rx="8" fill="#1e40af"/>
        
        {/* Key in hand */}
        <G transform="translate(60, 10)">
          <Circle cx="0" cy="0" r="8" fill="none" stroke="#fbbf24" strokeWidth="3"/>
          <Line x1="0" y1="8" x2="0" y2="25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
          <Line x1="0" y1="20" x2="5" y2="20" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
          <Line x1="0" y1="16" x2="4" y2="16" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
        </G>
      </G>
      
      {/* Lock/Security */}
      <G transform="translate(220, 140)">
        {/* Lock body */}
        <Rect x="-25" y="0" width="50" height="60" rx="8" fill="#10b981"/>
        
        {/* Lock shackle */}
        <Path
          d="M-20 0 L-20 -20 Q-20 -40 0 -40 Q20 -40 20 -20 L20 0"
          fill="none"
          stroke="#10b981"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Keyhole */}
        <Circle cx="0" cy="20" r="6" fill="#fff"/>
        <Path d="M-3 25 L3 25 L2 40 L-2 40 Z" fill="#fff"/>
        
        {/* Lock shine */}
        <Circle cx="-12" cy="12" r="4" fill="#86efac" opacity="0.6"/>
      </G>
      
      {/* Secure shield background */}
      <G transform="translate(150, 100)">
        <Path
          d="M0 -60 L40 -50 L40 -10 Q40 20 0 40 Q-40 20 -40 -10 L-40 -50 Z"
          fill="#e0e7ff"
          opacity="0.5"
        />
        <Path
          d="M0 -55 L35 -47 L35 -10 Q35 17 0 35 Q-35 17 -35 -10 L-35 -47 Z"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* Checkmark in shield */}
        <Path
          d="M-15 -10 L-5 5 L15 -20"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
      
      {/* Fingerprint elements */}
      <G transform="translate(60, 240)">
        <Path d="M0 0 Q-10 -5 -10 -15" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M5 0 Q-5 -5 -5 -18" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M10 0 Q0 -5 0 -20" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M15 0 Q5 -5 5 -18" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M20 0 Q10 -5 10 -15" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
      </G>
      
      {/* Security badges */}
      <Circle cx="240" cy="230" r="15" fill="#fbbf24"/>
      <Path d="M240 220 L243 228 L251 230 L243 232 L240 240 L237 232 L229 230 L237 228 Z" fill="#fff"/>
      
      {/* Dots pattern */}
      <Circle cx="40" cy="80" r="3" fill="#c4b5fd"/>
      <Circle cx="50" cy="90" r="3" fill="#a78bfa"/>
      <Circle cx="260" cy="60" r="3" fill="#c4b5fd"/>
      <Circle cx="270" cy="70" r="3" fill="#a78bfa"/>
    </Svg>
  );
}
