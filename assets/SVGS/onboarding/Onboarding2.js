import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

// Onboarding 2: Choose topics - Multiple category icons
export function Onboarding2({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Center selection circle */}
      <Circle cx="150" cy="150" r="50" fill="#e0e7ff" opacity="0.3"/>
      <Circle cx="150" cy="150" r="40" stroke="#6366f1" strokeWidth="3" strokeDasharray="5,5" fill="none"/>
      
      {/* Floating category cards */}
      
      {/* Code/Programming */}
      <G transform="translate(70, 70)">
        <Rect width="60" height="60" rx="12" fill="#10b981"/>
        <Path d="M20 25 L15 30 L20 35" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <Path d="M40 25 L45 30 L40 35" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <Line x1="32" y1="22" x2="28" y2="38" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      </G>
      
      {/* Design */}
      <G transform="translate(170, 60)">
        <Rect width="60" height="60" rx="12" fill="#8b5cf6"/>
        <Path d="M30 25 L35 35 L25 35 Z" fill="#fff"/>
        <Rect x="20" y="37" width="20" height="8" rx="1" fill="#fff"/>
      </G>
      
      {/* Business */}
      <G transform="translate(60, 160)">
        <Rect width="60" height="60" rx="12" fill="#f59e0b"/>
        <Rect x="20" y="25" width="20" height="15" rx="1" fill="#fff"/>
        <Path d="M23 30 L25 33 L28 27" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
      
      {/* Music */}
      <G transform="translate(180, 170)">
        <Rect width="60" height="60" rx="12" fill="#ec4899"/>
        <Circle cx="25" cy="38" r="5" fill="#fff"/>
        <Circle cx="38" cy="35" r="5" fill="#fff"/>
        <Line x1="30" y1="38" x2="30" y2="22" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        <Line x1="43" y1="35" x2="43" y2="22" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        <Path d="M30 22 L43 20 L43 25 L30 27 Z" fill="#fff"/>
      </G>
      
      {/* Science */}
      <G transform="translate(120, 100)">
        <Rect width="60" height="60" rx="12" fill="#06b6d4"/>
        <Circle cx="30" cy="32" r="8" stroke="#fff" strokeWidth="2" fill="none"/>
        <Line x1="36" y1="37" x2="42" y2="43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        <Circle cx="30" cy="32" r="3" fill="#fff"/>
      </G>
      
      {/* Connecting lines */}
      <Line x1="100" y1="100" x2="130" y2="130" stroke="#e0e7ff" strokeWidth="2"/>
      <Line x1="200" y1="90" x2="160" y2="130" stroke="#e0e7ff" strokeWidth="2"/>
      <Line x1="90" y1="190" x2="135" y2="160" stroke="#e0e7ff" strokeWidth="2"/>
      <Line x1="210" y1="200" x2="165" y2="160" stroke="#e0e7ff" strokeWidth="2"/>
      
      {/* Center icon - person selecting */}
      <G transform="translate(150, 150)">
        <Circle cx="0" cy="0" r="15" fill="#6366f1"/>
        <Circle cx="0" cy="-5" r="5" fill="#fff"/>
        <Path d="M-6 2 L-6 8 M6 2 L6 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <Path d="M-6 8 C-6 12 6 12 6 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </G>
    </Svg>
  );
}
