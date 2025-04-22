
import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay = ({ timeLeft }: TimerDisplayProps) => {
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="text-center py-8 font-mono text-[28px]"
      style={{ 
        fontFamily: 'Courier New, monospace',
        color: timeLeft < 10 ? 'red' : '#333333'
      }}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default TimerDisplay;
