import React from 'react';
import Svg, { G, Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';

export function CreateAccountIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
      <G transform="translate(120, 160)">
        <Circle cx="0" cy="-50" r="28" fill="#fbbf24"/>

        {/* Body */}
        <Path d="M-25 -22 L-30 30 L30 30 L25 -22 Z" fill="#6366f1"/>

        {/* Arms */}
        <Path d="M-25 -15 L-45 3 L-50 28" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round"/>
        <Path d="M25 -15 L45 3 L50 28" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round"/>

        {/* Legs */}
        <Rect x="-20" y="30" width="16" height="45" rx="8" fill="#1e40af"/>
        <Rect x="4" y="30" width="16" height="45" rx="8" fill="#1e40af"/>

        {/* Clipboard in hand */}
        <G transform="translate(55, 10)">
          <Rect x="-18" y="-8" width="36" height="48" rx="4" fill="#fcd34d" stroke="#fbbf24" strokeWidth="2"/>
          {/* Clip */}
          <Rect x="-8" y="-14" width="16" height="8" rx="2" fill="#eab308"/>
          {/* Checkmark */}
          <Path d="M-8 10 L-1 18 L10 2" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </G>
      </G>

      {/* Shield / security */}
      <G transform="translate(150, 100)">
        <Path
          d="M0 -60 L40 -50 L40 -10 Q40 20 0 40 Q-40 20 -40 -10 L-40 -50 Z"
          fill="#e0e7ff"
          opacity="0.5"
        />
        <Path
          d="M0 -55 L35 -47 L35 -10 Q35 17 0 35 Q-35 17 -35 -10 L-35 -47 Z"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
        />
        <Path
          d="M-15 -10 L-5 5 L15 -20"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>

      {/* Profile badge (instead of star badge) */}
      <Circle cx="240" cy="230" r="15" fill="#60a5fa"/>
      <Path
        d="M240 220 A8 8 0 1 1 239.99 220 Z"
        fill="#fff"
      />
      <Rect x="233" y="233" width="14" height="10" rx="5" fill="#fff"/>

      {/* Fingerprint details */}
      <G transform="translate(60, 240)">
        <Path d="M0 0 Q-10 -5 -10 -15" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M5 0 Q-5 -5 -5 -18" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M10 0 Q0 -5 0 -20" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M15 0 Q5 -5 5 -18" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
        <Path d="M20 0 Q10 -5 10 -15" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
      </G>

      {/* Dots pattern */}
      <Circle cx="40" cy="80" r="3" fill="#c4b5fd"/>
      <Circle cx="50" cy="90" r="3" fill="#a78bfa"/>
      <Circle cx="260" cy="60" r="3" fill="#c4b5fd"/>
      <Circle cx="270" cy="70" r="3" fill="#a78bfa"/>
    </Svg>
  );
}
