import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(expiryDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Countdown;