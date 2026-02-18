import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Empty State - Empty box/folder
export function EmptyStateIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Open empty box */}
      <G transform="translate(150, 140)">
        {/* Box back */}
        <Path
          d="M-60 -20 L-60 60 L60 60 L60 -20 Z"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="2"
        />
        
        {/* Box flaps */}
        <Path
          d="M-60 -20 L-80 -40 L0 -50 L80 -40 L60 -20 Z"
          fill="#e5e7eb"
          stroke="#d1d5db"
          strokeWidth="2"
        />
        
        <Path d="M-60 -20 L-80 -40 L-80 -10 L-60 0" fill="#d1d5db"/>
        <Path d="M60 -20 L80 -40 L80 -10 L60 0" fill="#d1d5db"/>
        
        {/* Box front */}
        <Path
          d="M-60 -20 L-60 60 L60 60 L60 -20 Z"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
        />
        
        {/* Inside of box (darker) */}
        <Path
          d="M-60 -20 L0 -30 L60 -20 L60 0 L-60 0 Z"
          fill="#e5e7eb"
        />
        
        {/* Tape on box */}
        <Rect x="-5" y="-20" width="10" height="80" fill="#fbbf24" opacity="0.3"/>
      </G>
      
      {/* Flying question marks */}
      <G transform="translate(80, 100)">
        <Path
          d="M-5 -10 Q-5 -15 0 -15 Q5 -15 5 -10 Q5 -5 0 0 L0 5"
          stroke="#9ca3af"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="0" cy="10" r="2" fill="#9ca3af"/>
      </G>
      
      <G transform="translate(220, 120)">
        <Path
          d="M-4 -8 Q-4 -12 0 -12 Q4 -12 4 -8 Q4 -4 0 0 L0 4"
          stroke="#9ca3af"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="0" cy="8" r="1.5" fill="#9ca3af"/>
      </G>
      
      {/* Tumbleweeds/dust */}
      <G transform="translate(100, 220)">
        <Circle cx="0" cy="0" r="12" fill="none" stroke="#d1d5db" strokeWidth="2"/>
        <Line x1="-8" y1="0" x2="8" y2="0" stroke="#d1d5db" strokeWidth="2"/>
        <Line x1="0" y1="-8" x2="0" y2="8" stroke="#d1d5db" strokeWidth="2"/>
        <Circle cx="6" cy="6" r="3" fill="none" stroke="#d1d5db" strokeWidth="1"/>
        <Circle cx="-6" cy="6" r="3" fill="none" stroke="#d1d5db" strokeWidth="1"/>
      </G>
      
      {/* Wind lines */}
      <Line x1="40" y1="180" x2="70" y2="180" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round"/>
      <Line x1="50" y1="195" x2="85" y2="195" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round"/>
      <Line x1="230" y1="200" x2="260" y2="200" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Magnifying glass */}
      <G transform="translate(200, 80)">
        <Circle cx="0" cy="0" r="15" fill="none" stroke="#6b7280" strokeWidth="3"/>
        <Line x1="12" y1="12" x2="22" y2="22" stroke="#6b7280" strokeWidth="3" strokeLinecap="round"/>
        <Circle cx="0" cy="0" r="8" fill="#f9fafb"/>
      </G>
      
      {/* Floating document icon */}
      <G transform="translate(70, 70)">
        <Rect width="20" height="26" rx="2" fill="#e5e7eb"/>
        <Rect x="2" y="2" width="16" height="22" rx="1" fill="#f9fafb"/>
        <Line x1="5" y1="7" x2="15" y2="7" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
        <Line x1="5" y1="12" x2="15" y2="12" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
        <Line x1="5" y1="17" x2="12" y2="17" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
      </G>
    </Svg>
  );
}
