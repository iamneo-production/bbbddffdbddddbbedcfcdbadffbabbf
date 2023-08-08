import React, {useState} from "react";

function Stopwatch() {
    
    //default timer state
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [intervalId, setIntervalId] = useState(null);
    
    //start timer
    const startTimer = () => {
        const id = setInterval(() => {
          setTime((prevTime) => {
                let seconds = prevTime.seconds + 1;
                let minutes = prevTime.minutes;
                let hours = prevTime.hours;
                if (seconds === 60) {
                    seconds = 0;
                    minutes = prevTime.minutes + 1;
                }
                if (minutes === 60) {
                    minutes = 0;
                    hours = prevTime.hours + 1;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        setIntervalId(id);
    };
    
    //pause timer
    const pauseTimer = () => {
        clearInterval(intervalId);
    };
    
    //reset timer
    const resetTimer = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
    };
    
    //render timer
    const renderTimer = () => {
        return(
            <p data-testid = "time" className="time">
                {`${time.hours.toString().padStart(2, "0")} : ${time.minutes.toString().padStart(2, "0")} : ${time.seconds.toString().padStart(2, "0")}`}
            </p>
        );
    }

    //default button states
    const [isStart, setIsStart] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isResume, setIsResume] = useState(false);
    const [isReset, setIsReset] = useState(false);
    //start onclick handler
    const handleStart = () => {
        setIsStart(false)
        setIsPaused(true)
        setIsResume(false)
        setIsReset(true)
        startTimer()
    };
    //pause onclick handler
    const handlePause = () => {
        setIsPaused(false)
        setIsResume(true)
        setIsStart(false)
        setIsReset(true)
        pauseTimer()
    };
    //resume onlick handler
    const handleResume = () => {
        setIsResume(false)
        setIsPaused(true)
        setIsStart(false)
        setIsReset(true)
        startTimer()
    };
    //reset onclick handler
    const handleReset = () => {
        setIsReset(false)
        setIsPaused(false)
        setIsResume(false)
        setIsStart(true)
        resetTimer()
        pauseTimer()
    };
    //render button 1
    const renderButton1 = () => {
        if (isStart === true) {
            return(
                <button onClick={handleStart} data-testid = "start" className="button">Start</button>
            );
        } else if (isPaused === true) {
            return(
                <button onClick={handlePause} data-testid = "pause" className="button">Pause</button>
            );
        } else if (isResume === true) {
            return(
                <button onClick={handleResume} data-testid = "resume" className="button">Resume</button>
            );
        }
    }
    //render button 2
    const renderButton2 = () => {
        if (isReset === true) {
            return(
                <button onClick={handleReset} data-testid = "reset" className="button">Reset</button>
            );
        } else if (isReset === false) {
            return(
                <button onClick={handleReset} disabled = "true" data-testid = "reset" className="button">Reset</button>
            );
        }
    }

    return(
        <>
        <div className="outer-main">
            <div className="inner-main">
                <p className="head">React Stopwatch</p>
                {renderTimer()}
                {renderButton1()}
                {renderButton2()}
            </div>
        </div>
    </>
    );
}

export default Stopwatch;