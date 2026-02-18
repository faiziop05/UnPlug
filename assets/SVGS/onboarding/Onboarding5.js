import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

// Onboarding 5: Community - People connected
export function Onboarding5({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Connected people network */}
      
      {/* Connection lines */}
      <Line x1="90" y1="100" x2="150" y2="140" stroke="#c7d2fe" strokeWidth="3"/>
      <Line x1="210" y1="100" x2="150" y2="140" stroke="#c7d2fe" strokeWidth="3"/>
      <Line x1="60" y1="190" x2="150" y2="140" stroke="#c7d2fe" strokeWidth="3"/>
      <Line x1="240" y1="190" x2="150" y2="140" stroke="#c7d2fe" strokeWidth="3"/>
      <Line x1="150" y1="240" x2="150" y2="140" stroke="#c7d2fe" strokeWidth="3"/>
      
      {/* Center person (you) */}
      <G transform="translate(150, 140)">
        <Circle cx="0" cy="0" r="30" fill="#6366f1"/>
        <Circle cx="0" cy="-8" r="10" fill="#fff"/>
        <Path d="M-15 8 Q-15 15 0 15 Q15 15 15 8" fill="#fff"/>
        <Circle cx="0" cy="0" r="35" stroke="#6366f1" strokeWidth="2" fill="none" opacity="0.3"/>
      </G>
      
      {/* Person 1 - Top left */}
      <G transform="translate(90, 100)">
        <Circle cx="0" cy="0" r="25" fill="#10b981"/>
        <Circle cx="0" cy="-6" r="8" fill="#fff"/>
        <Path d="M-12 6 Q-12 12 0 12 Q12 12 12 6" fill="#fff"/>
      </G>
      
      {/* Person 2 - Top right */}
      <G transform="translate(210, 100)">
        <Circle cx="0" cy="0" r="25" fill="#f59e0b"/>
        <Circle cx="0" cy="-6" r="8" fill="#fff"/>
        <Path d="M-12 6 Q-12 12 0 12 Q12 12 12 6" fill="#fff"/>
      </G>
      
      {/* Person 3 - Bottom left */}
      <G transform="translate(60, 190)">
        <Circle cx="0" cy="0" r="25" fill="#ec4899"/>
        <Circle cx="0" cy="-6" r="8" fill="#fff"/>
        <Path d="M-12 6 Q-12 12 0 12 Q12 12 12 6" fill="#fff"/>
      </G>
      
      {/* Person 4 - Bottom right */}
      <G transform="translate(240, 190)">
        <Circle cx="0" cy="0" r="25" fill="#8b5cf6"/>
        <Circle cx="0" cy="-6" r="8" fill="#fff"/>
        <Path d="M-12 6 Q-12 12 0 12 Q12 12 12 6" fill="#fff"/>
      </G>
      
      {/* Person 5 - Bottom center */}
      <G transform="translate(150, 240)">
        <Circle cx="0" cy="0" r="25" fill="#06b6d4"/>
        <Circle cx="0" cy="-6" r="8" fill="#fff"/>
        <Path d="M-12 6 Q-12 12 0 12 Q12 12 12 6" fill="#fff"/>
      </G>
      
      {/* Floating message bubbles */}
      <G transform="translate(40, 130)">
        <Circle cx="0" cy="0" r="12" fill="#fbbf24"/>
        <Path d="M-5 -3 L5 -3 M-5 2 L3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(260, 140)">
        <Circle cx="0" cy="0" r="10" fill="#10b981"/>
        <Path d="M-3 -2 L0 2 L3 -2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
      
      {/* Heart/like icons */}
      <Path d="M200 50 Q200 45 205 45 Q210 45 210 50 Q210 55 205 60 L200 65 L195 60 Q190 55 190 50 Q190 45 195 45 Q200 45 200 50" fill="#ef4444"/>
      
      {/* Star rating */}
      <Path d="M100 260 L102 266 L108 268 L102 270 L100 276 L98 270 L92 268 L98 266 Z" fill="#fbbf24"/>
      <Path d="M200 260 L202 266 L208 268 L202 270 L200 276 L198 270 L192 268 L198 266 Z" fill="#fbbf24"/>
      
      {/* Sparkle effects */}
      <Path d="M40 50 L42 54 L46 56 L42 58 L40 62 L38 58 L34 56 L38 54 Z" fill="#c4b5fd"/>
      <Path d="M260 240 L262 244 L266 246 L262 248 L260 252 L258 248 L254 246 L258 244 Z" fill="#a78bfa"/>
    </Svg>
  );
}
