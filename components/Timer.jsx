"use client";
import { useState, useEffect } from "react";

const Timer = ({ event }) => {
  //caculate the target event date and time
  const eventDate = new Date(`${event.date}T${event.hour}`);

  // state to track the remaining time in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(eventDate - new Date());

  // handle the countdown timer logic
  useEffect(() => {
    // set up ab interval that update every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = eventDate - now; //calculate the remaining time

      // if the time is up, clear the interval and stop the countdown
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeRemaining(0); // set time remaining to 0
      } else {
        setTimeRemaining(timeLeft); // update the remaining time
      }
    }, 1000); //run every 1000ms (1 second)

    //clean up func to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [eventDate]); //dependency array the effect runs only when 'eventDate' changes

  //if the countdown is over, return a message
  if (timeRemaining <= 0) {
    return <div>The event has already passed!</div>;
  }

  //calculate the time left in days, hours, minutes and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); //total days
  console.log(days);
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); //remaining hours
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); //remaining minutes
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); //remaining seconds

  return (
    <div className="flex flex-wrap gap-4">
      {/* days */}
      <div
        className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px]
         flex items-center justify-center"
      >
        <div>
          <div className="text-3xl font-semibold">{days}</div>
          <div className="text-sm uppercase font-medium">Days</div>
        </div>
      </div>
      {/* hour */}
      <div
        className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px]
         flex items-center justify-center"
      >
        <div>
          <div className="text-3xl font-semibold">{hours}</div>
          <div className="text-sm uppercase font-medium">Hours</div>
        </div>
      </div>
      {/* minute */}
      <div
        className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px]
         flex items-center justify-center"
      >
        <div>
          <div className="text-3xl font-semibold">{minutes}</div>
          <div className="text-sm uppercase font-medium">Minutes</div>
        </div>
      </div>
      {/* second */}
      <div
        className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px]
         flex items-center justify-center"
      >
        <div>
          <div className="text-3xl font-semibold">{seconds}</div>
          <div className="text-sm uppercase font-medium">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
