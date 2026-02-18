import React from 'react';
import Svg, { G, Path, Line, Circle, Rect, Ellipse } from 'react-native-svg';

export function LearningIllustration({ width = 400, height = 400 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 400" fill="none">
      {/* Book with sparkles */}
      <G>
        {/* Open book */}
        <Path
          d="M100 220 L100 140 C100 135 102 130 105 127 L190 100 C195 98 200 98 205 100 L290 127 C293 130 295 135 295 140 L295 220 C295 225 293 230 290 233 L205 260 C200 262 195 262 190 260 L105 233 C102 230 100 225 100 220Z"
          fill="#6366f1"
        />
        <Path
          d="M100 220 L100 140 C100 135 102 130 105 127 L190 100 L190 260 L105 233 C102 230 100 225 100 220Z"
          fill="#818cf8"
        />
        <Path
          d="M295 220 L295 140 C295 135 293 130 290 127 L205 100 L205 260 L290 233 C293 230 295 225 295 220Z"
          fill="#4f46e5"
        />
        <Line x1="190" y1="100" x2="205" y2="100" stroke="#312e81" strokeWidth="2"/>
        <Line x1="190" y1="260" x2="205" y2="260" stroke="#312e81" strokeWidth="2"/>
        
        {/* Pages */}
        <Line x1="130" y1="150" x2="170" y2="140" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="130" y1="170" x2="170" y2="160" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="130" y1="190" x2="160" y2="183" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round"/>
        
        <Line x1="225" y1="140" x2="265" y2="150" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="225" y1="160" x2="265" y2="170" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="235" y1="183" x2="265" y2="190" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Sparkles */}
        <Path d="M320 120 L323 127 L330 130 L323 133 L320 140 L317 133 L310 130 L317 127 Z" fill="#fbbf24"/>
        <Path d="M80 180 L82 185 L87 187 L82 189 L80 194 L78 189 L73 187 L78 185 Z" fill="#fbbf24"/>
        <Path d="M330 200 L332 204 L336 206 L332 208 L330 212 L328 208 L324 206 L328 204 Z" fill="#fbbf24"/>
        
        {/* Light bulb above book */}
        <Circle cx="197" cy="70" r="18" fill="#fef3c7"/>
        <Circle cx="197" cy="70" r="14" fill="#fde047"/>
        <Rect x="193" y="85" width="8" height="6" rx="1" fill="#d4d4d8"/>
        <Rect x="195" y="91" width="4" height="3" rx="1" fill="#a1a1aa"/>
        
        {/* Light rays */}
        <Line x1="197" y1="48" x2="197" y2="40" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="217" y1="56" x2="223" y2="50" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="225" y1="70" x2="233" y2="70" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="177" y1="56" x2="171" y2="50" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <Line x1="169" y1="70" x2="161" y2="70" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
      </G>
      
      {/* Graduation cap */}
      <G transform="translate(280, 280)">
        <Path
          d="M0 0 L40 -10 L80 0 L40 10 Z"
          fill="#1e293b"
        />
        <Path
          d="M40 10 L40 35 L50 40 L40 45 L30 40 L40 35 Z"
          fill="#1e293b"
        />
        <Path
          d="M75 5 L75 25 C75 30 65 35 40 35 C15 35 5 30 5 25 L5 5"
          stroke="#334155"
          strokeWidth="3"
          fill="none"
        />
      </G>
    </Svg>
  );
}
