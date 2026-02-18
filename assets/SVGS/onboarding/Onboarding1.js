import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

// Onboarding 1: Welcome - Person with phone and books
export function Onboarding1({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Person holding phone */}
      <G transform="translate(150, 180)">
        {/* Head */}
        <Circle cx="0" cy="-80" r="25" fill="#fbbf24"/>
        
        {/* Body */}
        <Path
          d="M-25 -55 L-30 0 L-25 40 L25 40 L30 0 L25 -55 Z"
          fill="#6366f1"
        />
        
        {/* Arms */}
        <Path d="M-25 -40 L-50 -20 L-45 20" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round"/>
        <Path d="M25 -40 L50 -20 L45 20" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round"/>
        
        {/* Legs */}
        <Rect x="-18" y="40" width="15" height="50" rx="7" fill="#1e40af"/>
        <Rect x="3" y="40" width="15" height="50" rx="7" fill="#1e40af"/>
        
        {/* Phone in hand */}
        <Rect x="-15" y="-15" width="30" height="50" rx="4" fill="#1e293b"/>
        <Rect x="-12" y="-10" width="24" height="40" rx="2" fill="#3b82f6"/>
        
        {/* App icons on phone */}
        <Circle cx="-6" cy="0" r="3" fill="#fbbf24"/>
        <Circle cx="6" cy="0" r="3" fill="#10b981"/>
        <Circle cx="-6" cy="10" r="3" fill="#ec4899"/>
        <Circle cx="6" cy="10" r="3" fill="#8b5cf6"/>
      </G>
      
      {/* Floating books around */}
      <G>
        {/* Book 1 */}
        <Rect x="40" y="60" width="35" height="45" rx="3" fill="#ef4444" transform="rotate(-15 57.5 82.5)"/>
        <Rect x="42" y="62" width="31" height="41" rx="2" fill="#fca5a5" transform="rotate(-15 57.5 82.5)"/>
        
        {/* Book 2 */}
        <Rect x="220" y="80" width="35" height="45" rx="3" fill="#10b981" transform="rotate(20 237.5 102.5)"/>
        <Rect x="222" y="82" width="31" height="41" rx="2" fill="#86efac" transform="rotate(20 237.5 102.5)"/>
        
        {/* Book 3 */}
        <Rect x="60" y="200" width="30" height="40" rx="3" fill="#8b5cf6" transform="rotate(-10 75 220)"/>
        <Rect x="62" y="202" width="26" height="36" rx="2" fill="#c4b5fd" transform="rotate(-10 75 220)"/>
      </G>
      
      {/* Stars */}
      <Path d="M250 40 L252 46 L258 48 L252 50 L250 56 L248 50 L242 48 L248 46 Z" fill="#fbbf24"/>
      <Path d="M50 40 L52 44 L56 46 L52 48 L50 52 L48 48 L44 46 L48 44 Z" fill="#fde047"/>
      <Path d="M230 200 L232 204 L236 206 L232 208 L230 212 L228 208 L224 206 L228 204 Z" fill="#f59e0b"/>
    </Svg>
  );
}
