import React from 'react';
import Svg, { G, Path, Line, Circle, Rect, Ellipse } from 'react-native-svg';

export function GrowthIllustration({ width = 400, height = 400 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 400" fill="none">
      {/* Plant growing from phone */}
      <G transform="translate(200, 250)">
        {/* Phone */}
        <Rect x="-50" y="0" width="100" height="160" rx="12" fill="#1e293b"/>
        <Rect x="-45" y="8" width="90" height="144" rx="4" fill="#334155"/>
        
        {/* Screen glow */}
        <Rect x="-40" y="13" width="80" height="134" rx="2" fill="#0ea5e9"/>
        
        {/* Plant stem growing from phone */}
        <Path
          d="M0 13 Q0 -50 0 -80"
          stroke="#10b981"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Leaves */}
        <Ellipse cx="-15" cy="-20" rx="20" ry="12" fill="#22c55e" transform="rotate(-30 -15 -20)"/>
        <Ellipse cx="15" cy="-35" rx="20" ry="12" fill="#22c55e" transform="rotate(30 15 -35)"/>
        <Ellipse cx="-18" cy="-50" rx="22" ry="14" fill="#22c55e" transform="rotate(-25 -18 -50)"/>
        <Ellipse cx="18" cy="-65" rx="22" ry="14" fill="#22c55e" transform="rotate(25 18 -65)"/>
        
        {/* Flower on top */}
        <Circle cx="0" cy="-90" r="8" fill="#fbbf24"/>
        <Circle cx="-8" cy="-95" r="6" fill="#fde047"/>
        <Circle cx="8" cy="-95" r="6" fill="#fde047"/>
        <Circle cx="-5" cy="-102" r="6" fill="#fde047"/>
        <Circle cx="5" cy="-102" r="6" fill="#fde047"/>
        <Circle cx="0" cy="-90" r="4" fill="#f97316"/>
        
        {/* App icons on phone screen */}
        <Rect x="-30" y="25" width="18" height="18" rx="4" fill="#8b5cf6"/>
        <Rect x="-6" y="25" width="18" height="18" rx="4" fill="#ec4899"/>
        <Rect x="18" y="25" width="18" height="18" rx="4" fill="#06b6d4"/>
        
        <Rect x="-30" y="50" width="18" height="18" rx="4" fill="#f59e0b"/>
        <Rect x="-6" y="50" width="18" height="18" rx="4" fill="#10b981"/>
        <Rect x="18" y="50" width="18" height="18" rx="4" fill="#ef4444"/>
        
        {/* Home button */}
        <Circle cx="0" cy="145" r="5" stroke="#64748b" strokeWidth="2" fill="none"/>
      </G>
      
      {/* Growth chart arrow */}
      <G transform="translate(80, 120)">
        <Path
          d="M0 60 L10 50 L20 55 L30 40 L40 45 L50 25"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M50 25 L42 23 L45 31 Z"
          fill="#10b981"
        />
      </G>
      
      {/* Knowledge nodes */}
      <Circle cx="320" cy="140" r="8" fill="#a78bfa"/>
      <Circle cx="340" cy="170" r="6" fill="#c4b5fd"/>
      <Circle cx="310" cy="180" r="7" fill="#8b5cf6"/>
      <Line x1="320" y1="140" x2="340" y2="170" stroke="#a78bfa" strokeWidth="2"/>
      <Line x1="340" y1="170" x2="310" y2="180" stroke="#a78bfa" strokeWidth="2"/>
      <Line x1="310" y1="180" x2="320" y2="140" stroke="#a78bfa" strokeWidth="2"/>
      
      {/* Progress badges */}
      <G transform="translate(70, 300)">
        <Circle cx="0" cy="0" r="20" fill="#fbbf24"/>
        <Path d="M0 -8 L4 4 L-4 -2 L4 -2 L-4 4 Z" fill="#fff"/>
      </G>
      
      <G transform="translate(330, 280)">
        <Circle cx="0" cy="0" r="18" fill="#10b981"/>
        <Path d="M-6 0 L-2 6 L6 -6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
    </Svg>
  );
}
