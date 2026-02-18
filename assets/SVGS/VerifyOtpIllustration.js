import React from 'react';
import Svg, { G, Path, Circle, Rect, Line, Ellipse } from 'react-native-svg';

export function VerifyOtpIllustration({ width = 300, height = 300 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">

      {/* Person */}
      <G transform="translate(130, 160)">
        {/* Head */}
        <Circle cx="0" cy="-55" r="28" fill="#fbbf24" />

        {/* Body */}
        <Path d="M-26 -20 L-34 30 L34 30 L26 -20 Z" fill="#6366f1" />

        {/* Arms holding phone */}
        <Path d="M-20 -10 L-45 5 L-40 28" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" />
        <Path d="M20 -10 L45 5 L40 28" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" />

        {/* Legs */}
        <Rect x="-18" y="30" width="15" height="45" rx="8" fill="#1e40af" />
        <Rect x="3" y="30" width="15" height="45" rx="8" fill="#1e40af" />

        {/* Mobile phone */}
        <G transform="translate(0, -5)">
          <Rect x="-18" y="-12" width="36" height="55" rx="5" fill="#10b981" />
          <Circle cx="0" cy="10" r="13" fill="#fff" />
          <Path d="M-6 9 L-1 14 L7 5" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </G>
      </G>

      {/* OTP Input Boxes */}
      <G transform="translate(150, 85)">
        <Rect x="-80" y="0" width="35" height="45" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <Rect x="-35" y="0" width="35" height="45" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <Rect x="10" y="0" width="35" height="45" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <Rect x="55" y="0" width="35" height="45" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
      </G>

      {/* Verification shield */}
      <G transform="translate(235, 155)">
        <Path
          d="M0 -35 L25 -30 L25 -8 Q25 8 0 20 Q-25 8 -25 -8 L-25 -30 Z"
          fill="#d1fae5"
          opacity="0.5"
        />
        <Path
          d="M-12 -5 L-2 8 L15 -12"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>

      {/* Decorative dots */}
      <Circle cx="40" cy="70" r="3" fill="#c4b5fd" />
      <Circle cx="260" cy="60" r="3" fill="#c4b5fd" />
      <Circle cx="270" cy="75" r="3" fill="#a78bfa" />
      <Circle cx="55" cy="90" r="3" fill="#a78bfa" />

    </Svg>
  );
}
