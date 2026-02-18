import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line, Polygon } from 'react-native-svg';

// Onboarding 3: Daily goals - Calendar with checkmarks
export function Onboarding3({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Calendar/planner */}
      <G transform="translate(150, 150)">
        {/* Calendar base */}
        <Rect x="-90" y="-100" width="180" height="200" rx="12" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        
        {/* Calendar header */}
        <Rect x="-90" y="-100" width="180" height="35" rx="12" fill="#6366f1"/>
        <Rect x="-90" y="-77" width="180" height="12" fill="#6366f1"/>
        
        {/* Binding rings */}
        <Circle cx="-60" cy="-100" r="6" fill="none" stroke="#4f46e5" strokeWidth="3"/>
        <Circle cx="-30" cy="-100" r="6" fill="none" stroke="#4f46e5" strokeWidth="3"/>
        <Circle cx="0" cy="-100" r="6" fill="none" stroke="#4f46e5" strokeWidth="3"/>
        <Circle cx="30" cy="-100" r="6" fill="none" stroke="#4f46e5" strokeWidth="3"/>
        <Circle cx="60" cy="-100" r="6" fill="none" stroke="#4f46e5" strokeWidth="3"/>
        
        {/* Date text */}
        <Rect x="-40" y="-90" width="80" height="15" rx="3" fill="#fff" opacity="0.3"/>
        
        {/* Task rows with checkmarks */}
        
        {/* Task 1 - Completed */}
        <Rect x="-75" y="-50" width="150" height="25" rx="6" fill="#dcfce7"/>
        <Circle cx="-60" cy="-37.5" r="8" fill="#10b981"/>
        <Path d="M-63 -37.5 L-59 -33.5 L-56 -40" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <Line x1="-45" y1="-37.5" x2="50" y2="-37.5" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Task 2 - Completed */}
        <Rect x="-75" y="-18" width="150" height="25" rx="6" fill="#dcfce7"/>
        <Circle cx="-60" cy="-5.5" r="8" fill="#10b981"/>
        <Path d="M-63 -5.5 L-59 -1.5 L-56 -8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <Line x1="-45" y1="-5.5" x2="50" y2="-5.5" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Task 3 - In Progress */}
        <Rect x="-75" y="14" width="150" height="25" rx="6" fill="#fef3c7"/>
        <Circle cx="-60" cy="26.5" r="8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <Line x1="-45" y1="26.5" x2="50" y2="26.5" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Task 4 - Pending */}
        <Rect x="-75" y="46" width="150" height="25" rx="6" fill="#f3f4f6"/>
        <Circle cx="-60" cy="58.5" r="8" fill="none" stroke="#d1d5db" strokeWidth="2"/>
        <Line x1="-45" y1="58.5" x2="50" y2="58.5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Task 5 - Pending */}
        <Rect x="-75" y="78" width="150" height="25" rx="6" fill="#f3f4f6"/>
        <Circle cx="-60" cy="90.5" r="8" fill="none" stroke="#d1d5db" strokeWidth="2"/>
        <Line x1="-45" y1="90.5" x2="50" y2="90.5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Trophy badge */}
      <G transform="translate(230, 80)">
        <Circle cx="0" cy="0" r="25" fill="#fbbf24"/>
        <Path d="M0 -10 L5 5 L-5 5 Z" fill="#fff"/>
        <Rect x="-8" y="5" width="16" height="8" rx="1" fill="#fff"/>
        <Circle cx="0" cy="-2" r="2" fill="#fbbf24"/>
      </G>
      
      {/* Progress streak flame */}
      <G transform="translate(70, 70)">
        <Path d="M0 20 Q-10 10 -5 -5 Q0 -15 5 -5 Q10 10 0 20" fill="#ef4444"/>
        <Path d="M0 15 Q-6 8 -3 0 Q0 -8 3 0 Q6 8 0 15" fill="#fbbf24"/>
        <Circle cx="0" cy="5" r="3" fill="#fff"/>
      </G>
    </Svg>
  );
}
