import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Search - Magnifying glass with documents
export function SearchIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Documents/results in background */}
      <G transform="translate(80, 100)">
        <Rect width="50" height="70" rx="6" fill="#e0e7ff"/>
        <Rect x="4" y="4" width="42" height="62" rx="4" fill="#fff"/>
        <Line x1="10" y1="15" x2="40" y2="15" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="25" x2="40" y2="25" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="35" x2="35" y2="35" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="45" x2="40" y2="45" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(150, 110)">
        <Rect width="50" height="70" rx="6" fill="#fef3c7"/>
        <Rect x="4" y="4" width="42" height="62" rx="4" fill="#fff"/>
        <Line x1="10" y1="15" x2="40" y2="15" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="25" x2="40" y2="25" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="35" x2="35" y2="35" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="45" x2="40" y2="45" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(220, 120)">
        <Rect width="50" height="70" rx="6" fill="#dcfce7"/>
        <Rect x="4" y="4" width="42" height="62" rx="4" fill="#fff"/>
        <Line x1="10" y1="15" x2="40" y2="15" stroke="#86efac" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="25" x2="40" y2="25" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="35" x2="35" y2="35" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="10" y1="45" x2="40" y2="45" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Large magnifying glass in front */}
      <G transform="translate(120, 180)">
        {/* Handle */}
        <Rect x="-8" y="45" width="16" height="50" rx="8" fill="#6b7280"/>
        <Rect x="-6" y="47" width="12" height="46" rx="6" fill="#9ca3af"/>
        
        {/* Lens frame */}
        <Circle cx="0" cy="0" r="50" fill="#6366f1"/>
        <Circle cx="0" cy="0" r="45" fill="#bfdbfe" opacity="0.4"/>
        <Circle cx="0" cy="0" r="40" fill="#eff6ff" opacity="0.6"/>
        
        {/* Search term inside lens */}
        <Line x1="-25" y1="-10" x2="25" y2="-10" stroke="#6366f1" strokeWidth="4" strokeLinecap="round"/>
        <Line x1="-20" y1="5" x2="20" y2="5" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round"/>
        
        {/* Lens reflection */}
        <Path d="M-25 -30 Q-20 -35 -10 -32" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7"/>
        
        {/* Focus point */}
        <Circle cx="0" cy="0" r="5" fill="#6366f1" opacity="0.3"/>
      </G>
      
      {/* Keyword tags floating */}
      <G transform="translate(40, 60)">
        <Rect width="55" height="22" rx="11" fill="#8b5cf6"/>
        <Line x1="12" y1="11" x2="43" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(220, 60)">
        <Rect width="50" height="22" rx="11" fill="#10b981"/>
        <Line x1="12" y1="11" x2="38" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(50, 240)">
        <Rect width="60" height="22" rx="11" fill="#ec4899"/>
        <Line x1="12" y1="11" x2="48" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Search sparkles */}
      <Path d="M180 50 L182 56 L188 58 L182 60 L180 66 L178 60 L172 58 L178 56 Z" fill="#fbbf24"/>
      <Path d="M260 200 L261 204 L265 205 L261 206 L260 210 L259 206 L255 205 L259 204 Z" fill="#fde047"/>
      
      {/* Navigation arrows/cursor */}
      <G transform="translate(260, 100)">
        <Path d="M0 0 L0 20 L7 13 L12 20 L15 18 L10 11 L18 11 Z" fill="#374151"/>
      </G>
    </Svg>
  );
}
