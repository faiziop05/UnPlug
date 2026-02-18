import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Settings - Gears and controls
export function SettingsIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Large gear */}
      <G transform="translate(120, 140)">
        {/* Outer gear teeth */}
        <Circle cx="0" cy="0" r="65" fill="#6366f1"/>
        
        {/* Gear teeth */}
        <Path d="M0 -65 L8 -75 L-8 -75 Z" fill="#6366f1"/>
        <Path d="M46 -46 L54 -54 L43 -60 Z" fill="#6366f1"/>
        <Path d="M65 0 L75 8 L75 -8 Z" fill="#6366f1"/>
        <Path d="M46 46 L54 54 L60 43 Z" fill="#6366f1"/>
        <Path d="M0 65 L8 75 L-8 75 Z" fill="#6366f1"/>
        <Path d="M-46 46 L-54 54 L-43 60 Z" fill="#6366f1"/>
        <Path d="M-65 0 L-75 8 L-75 -8 Z" fill="#6366f1"/>
        <Path d="M-46 -46 L-54 -54 L-60 -43 Z" fill="#6366f1"/>
        
        {/* Inner circle */}
        <Circle cx="0" cy="0" r="45" fill="#4f46e5"/>
        <Circle cx="0" cy="0" r="20" fill="#1e293b"/>
        
        {/* Center hole */}
        <Circle cx="0" cy="0" r="12" fill="#6366f1"/>
      </G>
      
      {/* Medium gear */}
      <G transform="translate(200, 100)">
        <Circle cx="0" cy="0" r="45" fill="#10b981"/>
        
        {/* Gear teeth */}
        <Path d="M0 -45 L6 -52 L-6 -52 Z" fill="#10b981"/>
        <Path d="M32 -32 L38 -38 L30 -42 Z" fill="#10b981"/>
        <Path d="M45 0 L52 6 L52 -6 Z" fill="#10b981"/>
        <Path d="M32 32 L38 38 L42 30 Z" fill="#10b981"/>
        <Path d="M0 45 L6 52 L-6 52 Z" fill="#10b981"/>
        <Path d="M-32 32 L-38 38 L-30 42 Z" fill="#10b981"/>
        <Path d="M-45 0 L-52 6 L-52 -6 Z" fill="#10b981"/>
        <Path d="M-32 -32 L-38 -38 L-42 -30 Z" fill="#10b981"/>
        
        <Circle cx="0" cy="0" r="30" fill="#059669"/>
        <Circle cx="0" cy="0" r="15" fill="#1e293b"/>
        <Circle cx="0" cy="0" r="8" fill="#10b981"/>
      </G>
      
      {/* Small gear */}
      <G transform="translate(190, 200)">
        <Circle cx="0" cy="0" r="35" fill="#fbbf24"/>
        
        {/* Gear teeth */}
        <Path d="M0 -35 L5 -42 L-5 -42 Z" fill="#fbbf24"/>
        <Path d="M25 -25 L30 -30 L23 -33 Z" fill="#fbbf24"/>
        <Path d="M35 0 L42 5 L42 -5 Z" fill="#fbbf24"/>
        <Path d="M25 25 L30 30 L33 23 Z" fill="#fbbf24"/>
        <Path d="M0 35 L5 42 L-5 42 Z" fill="#fbbf24"/>
        <Path d="M-25 25 L-30 30 L-23 33 Z" fill="#fbbf24"/>
        <Path d="M-35 0 L-42 5 L-42 -5 Z" fill="#fbbf24"/>
        <Path d="M-25 -25 L-30 -30 L-33 -23 Z" fill="#fbbf24"/>
        
        <Circle cx="0" cy="0" r="22" fill="#f59e0b"/>
        <Circle cx="0" cy="0" r="12" fill="#1e293b"/>
        <Circle cx="0" cy="0" r="6" fill="#fbbf24"/>
      </G>
      
      {/* Control panel */}
      <G transform="translate(60, 80)">
        {/* Panel background */}
        <Rect x="-35" y="-40" width="70" height="80" rx="8" fill="#1e293b"/>
        <Rect x="-32" y="-37" width="64" height="74" rx="6" fill="#334155"/>
        
        {/* Sliders */}
        <Line x1="-22" y1="-20" x2="22" y2="-20" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
        <Circle cx="8" cy="-20" r="6" fill="#8b5cf6"/>
        
        <Line x1="-22" y1="0" x2="22" y2="0" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
        <Circle cx="-10" cy="0" r="6" fill="#10b981"/>
        
        <Line x1="-22" y1="20" x2="22" y2="20" stroke="#64748b" strokeWidth="4" strokeLinecap="round"/>
        <Circle cx="15" cy="20" r="6" fill="#ec4899"/>
      </G>
      
      {/* Toggle switches */}
      <G transform="translate(240, 230)">
        <Rect x="-20" y="-10" width="40" height="20" rx="10" fill="#dcfce7"/>
        <Circle cx="10" cy="0" r="8" fill="#10b981"/>
      </G>
      
      <G transform="translate(60, 210)">
        <Rect x="-20" y="-10" width="40" height="20" rx="10" fill="#fef3c7"/>
        <Circle cx="-10" cy="0" r="8" fill="#fbbf24"/>
      </G>
      
      {/* Wrench tool */}
      <G transform="translate(250, 60)">
        <Rect x="-3" y="0" width="6" height="30" rx="3" fill="#9ca3af"/>
        <Circle cx="0" cy="35" r="8" fill="#9ca3af"/>
        <Circle cx="0" cy="35" r="5" fill="#6b7280"/>
      </G>
      
      {/* Screwdriver */}
      <G transform="translate(270, 180)">
        <Rect x="-2" y="0" width="4" height="20" rx="2" fill="#fbbf24"/>
        <Path d="M-4 20 L4 20 L2 30 L-2 30 Z" fill="#6b7280"/>
      </G>
      
      {/* Connection lines between gears */}
      <Line x1="170" y1="130" x2="180" y2="115" stroke="#e0e7ff" strokeWidth="3" strokeDasharray="5,5"/>
      <Line x1="150" y1="180" x2="165" y2="190" stroke="#e0e7ff" strokeWidth="3" strokeDasharray="5,5"/>
    </Svg>
  );
}
