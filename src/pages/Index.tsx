
import { useState, useEffect, useRef } from 'react';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2ooXGRajfgjhPuwQqhEoFau0OAgBs8ugtH1DaS1sF60M1M7uH2+nqUivzIebhndOJK28anvf/vk");
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start the timer
  const handleStart = () => {
    const minutesVal = parseInt(minutes) || 0;
    const secondsVal = parseInt(seconds) || 0;
    const totalSeconds = (minutesVal * 60) + secondsVal;
    
    if (totalSeconds <= 0) return;
    
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsRunning(false);
          if (audioRef.current) audioRef.current.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause the timer
  const handlePause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  };

  // Reset the timer
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    setIsRunning(false);
    setMinutes("");
    setSeconds("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "#333333" }}>
          TimeMaster
        </h1>

        {!isRunning ? (
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <div className="w-[45%]">
                <label className="block text-sm font-medium mb-1" style={{ color: "#333333" }}>
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="00"
                />
              </div>
              <div className="w-[45%]">
                <label className="block text-sm font-medium mb-1" style={{ color: "#333333" }}>
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="00"
                />
              </div>
            </div>
            <button
              onClick={handleStart}
              className="w-full py-3 rounded-md transition-colors"
              style={{ backgroundColor: "#2ECC71", color: "white" }}
            >
              Start Countdown
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <div 
              className="text-center py-8 font-mono text-[28px]"
              style={{ 
                fontFamily: 'Courier New, monospace',
                color: timeLeft < 10 ? 'red' : '#333333'
              }}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePause}
                className="flex-1 py-3 rounded-md transition-colors bg-yellow-500 text-white"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-md transition-colors bg-red-500 text-white"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
