import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

// Onboarding 4: Progress tracking - Chart going up
export function Onboarding4({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      <Defs>
        <LinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
          <Stop offset="100%" stopColor="#6366f1" stopOpacity="0.1"/>
        </LinearGradient>
      </Defs>
      
      {/* Device/tablet showing chart */}
      <G transform="translate(150, 150)">
        {/* Tablet frame */}
        <Rect x="-100" y="-120" width="200" height="240" rx="16" fill="#1e293b"/>
        <Rect x="-95" y="-115" width="190" height="230" rx="12" fill="#fff"/>
        
        {/* Chart title area */}
        <Rect x="-85" y="-105" width="80" height="12" rx="4" fill="#e5e7eb"/>
        <Rect x="-85" y="-88" width="50" height="8" rx="3" fill="#f3f4f6"/>
        
        {/* Y-axis labels */}
        <Line x1="-80" y1="-60" x2="-80" y2="80" stroke="#e5e7eb" strokeWidth="2"/>
        <Line x1="-80" y1="80" x2="80" y2="80" stroke="#e5e7eb" strokeWidth="2"/>
        
        {/* Grid lines */}
        <Line x1="-80" y1="-60" x2="80" y2="-60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,4"/>
        <Line x1="-80" y1="-20" x2="80" y2="-20" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,4"/>
        <Line x1="-80" y1="20" x2="80" y2="20" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,4"/>
        <Line x1="-80" y1="60" x2="80" y2="60" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,4"/>
        
        {/* Growth line chart */}
        <Path
          d="M-70 70 L-50 65 L-30 55 L-10 50 L10 35 L30 20 L50 -10 L70 -40"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Area under curve */}
        <Path
          d="M-70 70 L-50 65 L-30 55 L-10 50 L10 35 L30 20 L50 -10 L70 -40 L70 80 L-70 80 Z"
          fill="url(#chartGradient)"
        />
        
        {/* Data points */}
        <Circle cx="-70" cy="70" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="-50" cy="65" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="-30" cy="55" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="-10" cy="50" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="10" cy="35" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="30" cy="20" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="50" cy="-10" r="4" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
        <Circle cx="70" cy="-40" r="6" fill="#6366f1"/>
        
        {/* Stats cards */}
        <G transform="translate(-60, 95)">
          <Rect width="45" height="20" rx="6" fill="#dcfce7"/>
          <Rect x="5" y="6" width="10" height="8" rx="2" fill="#10b981"/>
          <Rect x="18" y="8" width="22" height="4" rx="2" fill="#10b981"/>
        </G>
        
        <G transform="translate(15, 95)">
          <Rect width="45" height="20" rx="6" fill="#fef3c7"/>
          <Rect x="5" y="6" width="10" height="8" rx="2" fill="#f59e0b"/>
          <Rect x="18" y="8" width="22" height="4" rx="2" fill="#f59e0b"/>
        </G>
      </G>
      
      {/* Upward arrow indicator */}
      <G transform="translate(240, 70)">
        <Circle cx="0" cy="0" r="22" fill="#10b981"/>
        <Path d="M0 -8 L0 8 M-6 -2 L0 -8 L6 -2" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
      
      {/* Star achievements */}
      <Path d="M60 60 L62 66 L68 68 L62 70 L60 76 L58 70 L52 68 L58 66 Z" fill="#fbbf24"/>
      <Path d="M240 240 L242 246 L248 248 L242 250 L240 256 L238 250 L232 248 L238 246 Z" fill="#fbbf24"/>
    </Svg>
  );
}
