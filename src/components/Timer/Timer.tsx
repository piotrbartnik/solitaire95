import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(timeInterval);
  });

  return <div>Time: {time}</div>;
};

export default Timer;
