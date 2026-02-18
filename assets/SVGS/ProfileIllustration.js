import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Profile/Account - Person with settings
export function ProfileIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Profile card */}
      <G transform="translate(150, 150)">
        {/* Card background */}
        <Rect x="-90" y="-100" width="180" height="200" rx="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        
        {/* Header gradient */}
        <Rect x="-90" y="-100" width="180" height="60" rx="16" fill="#6366f1"/>
        <Rect x="-90" y="-52" width="180" height="12" fill="#6366f1"/>
        
        {/* Profile avatar */}
        <Circle cx="0" cy="-50" r="35" fill="#fff"/>
        <Circle cx="0" cy="-50" r="32" fill="#fbbf24"/>
        <Circle cx="0" cy="-58" r="12" fill="#fff"/>
        <Path d="M-18 -42 Q-18 -30 0 -30 Q18 -30 18 -42" fill="#fff"/>
        
        {/* Avatar ring */}
        <Circle cx="0" cy="-50" r="38" stroke="#e0e7ff" strokeWidth="3" fill="none"/>
        
        {/* Profile info lines */}
        <Rect x="-50" y="0" width="100" height="10" rx="5" fill="#e5e7eb"/>
        <Rect x="-35" y="18" width="70" height="8" rx="4" fill="#f3f4f6"/>
        
        {/* Stats/badges */}
        <G transform="translate(-40, 40)">
          <Circle cx="0" cy="0" r="18" fill="#dcfce7"/>
          <Path d="M0 -8 L4 2 L-4 -2 L4 -2 L-4 2 Z" fill="#10b981"/>
        </G>
        
        <G transform="translate(0, 40)">
          <Circle cx="0" cy="0" r="18" fill="#fef3c7"/>
          <Path d="M0 -6 L2 0 L8 2 L2 4 L0 10 L-2 4 L-8 2 L-2 0 Z" fill="#fbbf24"/>
        </G>
        
        <G transform="translate(40, 40)">
          <Circle cx="0" cy="0" r="18" fill="#fae8ff"/>
          <Circle cx="0" cy="0" r="6" fill="#d946ef"/>
        </G>
        
        {/* Action buttons */}
        <Rect x="-70" y="70" width="140" height="18" rx="9" fill="#6366f1"/>
      </G>
      
      {/* Settings gear icon */}
      <G transform="translate(240, 80)">
        <Circle cx="0" cy="0" r="20" fill="#8b5cf6"/>
        
        {/* Gear teeth */}
        <Path
          d="M0 -20 L4 -24 L-4 -24 Z M20 0 L24 4 L24 -4 Z M0 20 L4 24 L-4 24 Z M-20 0 L-24 4 L-24 -4 Z"
          fill="#8b5cf6"
        />
        <Path
          d="M14 -14 L18 -18 L12 -20 Z M14 14 L18 18 L20 12 Z M-14 14 L-18 18 L-12 20 Z M-14 -14 L-18 -18 L-20 -12 Z"
          fill="#8b5cf6"
        />
        
        <Circle cx="0" cy="0" r="7" fill="#fff"/>
      </G>
      
      {/* Edit pencil icon */}
      <G transform="translate(60, 80)">
        <Rect x="-4" y="-15" width="8" height="25" rx="2" fill="#10b981" transform="rotate(45 0 0)"/>
        <Path d="M-8 8 L-10 10 L-4 10 Z" fill="#10b981"/>
        <Rect x="-5" y="-18" width="10" height="6" rx="1" fill="#86efac" transform="rotate(45 0 0)"/>
      </G>
      
      {/* Notification bell */}
      <G transform="translate(60, 220)">
        <Path d="M-8 -5 Q-8 -12 0 -12 Q8 -12 8 -5 L8 5 Q12 8 12 12 L-12 12 Q-12 8 -8 5 Z" fill="#fbbf24"/>
        <Rect x="-3" y="12" width="6" height="4" rx="2" fill="#fbbf24"/>
        <Circle cx="8" cy="-8" r="5" fill="#ef4444"/>
      </G>
      
      {/* Achievement stars */}
      <Path d="M230 220 L232 228 L240 230 L232 232 L230 240 L228 232 L220 230 L228 228 Z" fill="#fbbf24"/>
      <Path d="M260 200 L261 204 L265 205 L261 206 L260 210 L259 206 L255 205 L259 204 Z" fill="#fde047"/>
      
      {/* Sparkles */}
      <Circle cx="40" cy="110" r="3" fill="#c4b5fd"/>
      <Circle cx="260" cy="120" r="3" fill="#a78bfa"/>
      <Circle cx="50" cy="190" r="3" fill="#fbbf24"/>
    </Svg>
  );
}
