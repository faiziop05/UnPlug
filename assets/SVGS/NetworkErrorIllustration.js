import React from 'react';
import Svg, { G, Path, Circle, Rect, Line } from 'react-native-svg';

// Network Error - Disconnected wifi/signal
export function NetworkErrorIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      {/* Broken WiFi symbol */}
      <G transform="translate(150, 140)">
        {/* WiFi waves - broken */}
        <Path
          d="M-80 20 Q-80 -40 -40 -60"
          stroke="#ef4444"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <Path
          d="M80 20 Q80 -40 40 -60"
          stroke="#ef4444"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        
        <Path
          d="M-55 25 Q-55 -10 -25 -25"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <Path
          d="M55 25 Q55 -10 25 -25"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        
        <Path
          d="M-30 30 Q-30 10 -10 5"
          stroke="#fbbf24"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <Path
          d="M30 30 Q30 10 10 5"
          stroke="#fbbf24"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        
        {/* Center dot/device */}
        <Circle cx="0" cy="40" r="10" fill="#6b7280"/>
        
        {/* X mark over WiFi */}
        <Circle cx="0" cy="0" r="40" fill="#ef4444" opacity="0.1"/>
        <Line x1="-25" y1="-25" x2="25" y2="25" stroke="#ef4444" strokeWidth="8" strokeLinecap="round"/>
        <Line x1="25" y1="-25" x2="-25" y2="25" stroke="#ef4444" strokeWidth="8" strokeLinecap="round"/>
      </G>
      
      {/* Sad device/phone */}
      <G transform="translate(150, 240)">
        <Rect x="-30" y="-25" width="60" height="50" rx="6" fill="#1e293b"/>
        <Rect x="-26" y="-21" width="52" height="42" rx="4" fill="#6b7280"/>
        
        {/* Sad face on screen */}
        <Circle cx="-10" cy="-5" r="3" fill="#374151"/>
        <Circle cx="10" cy="-5" r="3" fill="#374151"/>
        <Path d="M-12 8 Q0 3 12 8" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </G>
      
      {/* Disconnected clouds */}
      <G transform="translate(70, 60)">
        <Circle cx="0" cy="5" r="15" fill="#d1d5db"/>
        <Circle cx="-12" cy="8" r="12" fill="#d1d5db"/>
        <Circle cx="12" cy="8" r="12" fill="#d1d5db"/>
        <Rect x="-15" y="8" width="30" height="10" fill="#d1d5db"/>
        {/* X on cloud */}
        <Line x1="-8" y1="2" x2="8" y2="12" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
        <Line x1="8" y1="2" x2="-8" y2="12" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
      </G>
      
      <G transform="translate(230, 70)">
        <Circle cx="0" cy="5" r="12" fill="#d1d5db"/>
        <Circle cx="-10" cy="7" r="10" fill="#d1d5db"/>
        <Circle cx="10" cy="7" r="10" fill="#d1d5db"/>
        <Rect x="-12" y="7" width="24" height="8" fill="#d1d5db"/>
        {/* X on cloud */}
        <Line x1="-6" y1="3" x2="6" y2="10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="6" y1="3" x2="-6" y2="10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Broken connection line */}
      <Line x1="80" y1="70" x2="120" y2="100" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,8"/>
      <Line x1="220" y1="80" x2="180" y2="110" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,8"/>
      
      {/* Warning symbols */}
      <G transform="translate(50, 200)">
        <Path d="M0 -12 L10 8 L-10 8 Z" fill="#fbbf24"/>
        <Line x1="0" y1="-6" x2="0" y2="1" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <Circle cx="0" cy="4" r="1.5" fill="#fff"/>
      </G>
      
      <G transform="translate(250, 180)">
        <Path d="M0 -10 L8 6 L-8 6 Z" fill="#fbbf24"/>
        <Line x1="0" y1="-5" x2="0" y2="0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <Circle cx="0" cy="3" r="1.5" fill="#fff"/>
      </G>
    </Svg>
  );
}
