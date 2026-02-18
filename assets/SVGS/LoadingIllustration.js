import React from 'react';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';

// Loading - Hourglass or rotating circles
export function LoadingIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Hourglass */}
      <G transform="translate(150, 150)">
        {/* Hourglass frame */}
        <Path
          d="M-40 -70 L40 -70 L40 -60 L10 -30 L10 30 L40 60 L40 70 L-40 70 L-40 60 L-10 30 L-10 -30 L-40 -60 Z"
          fill="#6366f1"
        />
        
        {/* Glass inner */}
        <Path
          d="M-35 -65 L35 -65 L35 -60 L8 -32 L8 28 L35 58 L35 65 L-35 65 L-35 58 L-8 28 L-8 -32 L-35 -60 Z"
          fill="#e0e7ff"
        />
        
        {/* Sand in top */}
        <Path
          d="M-25 -55 L25 -55 L25 -50 L5 -35 L-5 -35 L-25 -50 Z"
          fill="#fbbf24"
        />
        
        {/* Falling sand */}
        <Circle cx="-3" cy="-15" r="2" fill="#f59e0b"/>
        <Circle cx="0" cy="-5" r="2" fill="#f59e0b"/>
        <Circle cx="2" cy="5" r="2" fill="#f59e0b"/>
        
        {/* Sand in bottom */}
        <Path
          d="M-20 50 L20 50 L20 55 L-20 55 Z"
          fill="#fbbf24"
        />
        <Path
          d="M-15 45 L15 45 L20 50 L-20 50 Z"
          fill="#f59e0b"
        />
        <Path
          d="M-10 40 L10 40 L15 45 L-15 45 Z"
          fill="#fbbf24"
        />
        
        {/* Hourglass top cap */}
        <Rect x="-45" y="-75" width="90" height="5" rx="2" fill="#4f46e5"/>
        <Rect x="-45" y="70" width="90" height="5" rx="2" fill="#4f46e5"/>
      </G>
      
      {/* Orbiting dots */}
      <G transform="translate(150, 150)">
        <Circle cx="0" cy="-90" r="6" fill="#10b981"/>
        <Circle cx="64" cy="-64" r="6" fill="#06b6d4"/>
        <Circle cx="90" cy="0" r="6" fill="#8b5cf6"/>
        <Circle cx="64" cy="64" r="6" fill="#ec4899"/>
        <Circle cx="0" cy="90" r="6" fill="#f59e0b"/>
        <Circle cx="-64" cy="64" r="6" fill="#ef4444"/>
        <Circle cx="-90" cy="0" r="6" fill="#10b981"/>
        <Circle cx="-64" cy="-64" r="6" fill="#06b6d4"/>
      </G>
      
      {/* Rotating ring */}
      <Circle cx="150" cy="150" r="100" stroke="#e0e7ff" strokeWidth="2" fill="none" opacity="0.3"/>
      
      {/* Progress indicators */}
      <G transform="translate(150, 60)">
        <Circle cx="-15" cy="0" r="4" fill="#6366f1"/>
        <Circle cx="0" cy="0" r="4" fill="#6366f1" opacity="0.6"/>
        <Circle cx="15" cy="0" r="4" fill="#6366f1" opacity="0.3"/>
      </G>
      
      <G transform="translate(150, 240)">
        <Circle cx="-15" cy="0" r="4" fill="#10b981"/>
        <Circle cx="0" cy="0" r="4" fill="#10b981" opacity="0.6"/>
        <Circle cx="15" cy="0" r="4" fill="#10b981" opacity="0.3"/>
      </G>
    </Svg>
  );
}
