import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// 404 Not Found - Person looking through telescope/magnifying glass
export function NotFoundIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Large 404 text background */}
      <G transform="translate(150, 100)" opacity="0.1">
        <Path
          d="M-70 0 L-70 60 L-50 60 L-50 20 L-30 60 L-10 60 L-10 0 M-50 35 L-30 35"
          stroke="#6b7280"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M0 30 Q0 0 20 0 Q40 0 40 30 Q40 60 20 60 Q0 60 0 30"
          stroke="#6b7280"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M50 0 L50 60 L70 60 L70 20 L90 60 L110 60 L110 0 M70 35 L90 35"
          stroke="#6b7280"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
      
      {/* Person with magnifying glass */}
      <G transform="translate(100, 180)">
        {/* Head */}
        <Circle cx="0" cy="-40" r="22" fill="#fbbf24"/>
        
        {/* Body */}
        <Path d="M-18 -18 L-22 20 L22 20 L18 -18 Z" fill="#6366f1"/>
        
        {/* Arm with magnifying glass */}
        <Path d="M18 -10 L45 -30" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round"/>
        
        {/* Hand */}
        <Circle cx="50" cy="-35" r="6" fill="#fde047"/>
        
        {/* Legs */}
        <Rect x="-15" y="20" width="12" height="35" rx="6" fill="#1e40af"/>
        <Rect x="3" y="20" width="12" height="35" rx="6" fill="#1e40af"/>
      </G>
      
      {/* Large magnifying glass */}
      <G transform="translate(180, 120)">
        {/* Lens */}
        <Circle cx="0" cy="0" r="45" fill="none" stroke="#6b7280" strokeWidth="6"/>
        <Circle cx="0" cy="0" r="40" fill="#e0f2fe" opacity="0.5"/>
        
        {/* Handle */}
        <Path d="M30 30 L55 55" stroke="#6b7280" strokeWidth="8" strokeLinecap="round"/>
        <Rect x="53" y="53" width="15" height="8" rx="4" fill="#9ca3af" transform="rotate(45 60.5 57)"/>
        
        {/* Reflection on glass */}
        <Path d="M-20 -25 Q-15 -30 -10 -25" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
      </G>
      
      {/* Question marks floating */}
      <G transform="translate(60, 80)">
        <Path
          d="M-4 -10 Q-4 -15 0 -15 Q4 -15 4 -10 Q4 -5 0 0 L0 5"
          stroke="#9ca3af"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="0" cy="10" r="2" fill="#9ca3af"/>
      </G>
      
      <G transform="translate(240, 200)">
        <Path
          d="M-3 -8 Q-3 -12 0 -12 Q3 -12 3 -8 Q3 -4 0 0 L0 4"
          stroke="#9ca3af"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="0" cy="8" r="1.5" fill="#9ca3af"/>
      </G>
      
      {/* Broken map/path lines */}
      <Path
        d="M40 220 L60 230 M70 235 L90 245"
        stroke="#d1d5db"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5,5"
      />
      
      {/* Warning signs */}
      <G transform="translate(260, 80)">
        <Path d="M0 -10 L8 6 L-8 6 Z" fill="#fbbf24"/>
        <Line x1="0" y1="-5" x2="0" y2="0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <Circle cx="0" cy="3" r="1.5" fill="#fff"/>
      </G>
      
      {/* Lost location pin */}
      <G transform="translate(230, 240)">
        <Path
          d="M0 -15 Q-12 -15 -12 -5 Q-12 5 0 15 Q12 5 12 -5 Q12 -15 0 -15"
          fill="#ef4444"
        />
        <Circle cx="0" cy="-5" r="5" fill="#fff"/>
        <Line x1="-6" y1="-8" x2="6" y2="-2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Dots pattern */}
      <Circle cx="40" cy="120" r="3" fill="#e5e7eb"/>
      <Circle cx="50" cy="140" r="3" fill="#e5e7eb"/>
      <Circle cx="35" cy="160" r="3" fill="#e5e7eb"/>
    </Svg>
  );
}
