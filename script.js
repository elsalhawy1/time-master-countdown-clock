
// DOM Elements
const timerDisplay = document.getElementById('timer');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

// Audio for alarm
const alarmSound = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2ooXGRajfgjhPuwQqhEoFau0OAgBs8ugtH1DaS1sF60M1M7uH2+nqUivzIebhndOJK28anvf/vk');

// Timer variables
let timeLeft = 0;
let timerId;
let isRunning = false;

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  
  // Change color to red when less than 10 seconds remaining
  if (timeLeft < 10) {
    timerDisplay.classList.add('red-timer');
  } else {
    timerDisplay.classList.remove('red-timer');
  }
}

// Start the timer
function startTimer() {
  // Get input values
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  
  // Calculate total seconds
  const totalSeconds = (minutes * 60) + seconds;
  
  // Validate input
  if (totalSeconds <= 0) {
    alert('Please enter a valid time');
    return;
  }
  
  // Set up timer
  timeLeft = totalSeconds;
  isRunning = true;
  
  // Update button states
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  
  // Update display immediately
  updateDisplay();
  
  // Start interval
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    
    // Check if timer has finished
    if (timeLeft <= 0) {
      clearInterval(timerId);
      isRunning = false;
      alarmSound.play();
      
      // Reset button states
      startButton.disabled = false;
      pauseButton.disabled = true;
      minutesInput.disabled = false;
      secondsInput.disabled = false;
      
      // Alert user
      setTimeout(() => {
        alert('Time is up!');
      }, 100);
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerId);
  isRunning = false;
  
  // Update button states
  startButton.disabled = false;
  pauseButton.disabled = true;
}

// Reset the timer
function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = 0;
  
  // Reset display
  timerDisplay.textContent = '00:00';
  timerDisplay.classList.remove('red-timer');
  
  // Clear inputs
  minutesInput.value = '';
  secondsInput.value = '';
  
  // Reset button states
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Input validation
minutesInput.addEventListener('input', () => {
  if (minutesInput.value > 99) minutesInput.value = 99;
  if (minutesInput.value < 0) minutesInput.value = 0;
});

secondsInput.addEventListener('input', () => {
  if (secondsInput.value > 59) secondsInput.value = 59;
  if (secondsInput.value < 0) secondsInput.value = 0;
});
