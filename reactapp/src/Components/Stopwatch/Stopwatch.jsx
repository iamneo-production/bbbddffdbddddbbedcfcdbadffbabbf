import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive && !isPaused) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = { ...prevElapsedTime };
          newElapsedTime.seconds += 1;
          
          if (newElapsedTime.seconds >= 60) {
            newElapsedTime.minutes += 1;
            newElapsedTime.seconds = 0;
          }
          if (newElapsedTime.minutes >= 60) {
            newElapsedTime.hours += 1;
            newElapsedTime.minutes = 0;
          }
          return newElapsedTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, isPaused]);

  function toggle() {
    setIsActive(true);
    setIsPaused(false);
  }

  function pause() {
    setIsPaused(true);
  }

  function reset() {
    setElapsedTime({ hours: 0, minutes: 0, seconds: 0});
    setIsActive(false);
    setIsPaused(false);
  }
  function resume() {
    setIsPaused(false);
  }

  function formatTimeValue(timeValue) {
    return timeValue < 10 ? `0${timeValue}` : timeValue;
  }

  return (
    <div className="main">
      <div className="stopwatch">
        <h1>React Stopwatch</h1>
        <h1 data-testid="time">
          {formatTimeValue(elapsedTime.hours)}:
          {formatTimeValue(elapsedTime.minutes)}:
          {formatTimeValue(elapsedTime.seconds)}
        </h1>
        <div data-testid="button" >
          {isActive && !isPaused ? (
            <button data-testid="pause" onClick={pause}>Pause</button>
          ) : isPaused ? (
            <button data-testid="resume" onClick={resume}>Resume</button>
          ) : (
            <button data-testid="start" onClick={toggle}>Start</button>
          )}
          <button  data-testid="reset" onClick={reset} disabled={!isActive}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;