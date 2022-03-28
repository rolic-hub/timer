import React, { useRef, useState, useEffect } from "react";
import "./timer.css";

const Timer = () => {
  const [date, setDate] = useState({
    yr: "00",
    mth: "00",
    dy: "00",
    hr: "00",
    mins: "00",
    secs: "00",
  });
  const [count, setCount] = useState();
  const [mthput, setMthput] = useState(`00`);
  const [dyput, setDyput] = useState(`00`);
  const [hrput, setHrput] = useState(`00`);
  const [minput, setMinput] = useState(`00`);
  const [secput, setSecput] = useState(`00`);
  const [yrput, setYrput] = useState(`2022`);
  const [task, setTask] = useState("");
  const [event, setEvent] = useState([]);

  let intervalno = useRef();

  const startTimer = () => {
    intervalno = setInterval(() => {
      const now = new Date().getTime();
      const difference = count - now;

      const year = Math.floor(difference / (1000 * 60 * 60 * 24 * 30 * 12));
      const month = Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12);
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (difference > 0) {
        setDate({
          yr: year,
          mth: month,
          dy: days,
          hr: hours,
          mins: minutes,
          secs: seconds,
        });
      } else {
        clearInterval(intervalno.current);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalno.current);
    };
  },[startTimer]);

  const onSubmit = (e) => {
    e.preventDefault();
    setCount(
      new Date(
        `${mthput} ${dyput}, ${yrput} ${hrput}:${minput}:${secput}`
      ).getTime()
    );
   
  
  };
  const eventSubmit = (e) => {
    e.preventDefault();
    setEvent(task);
    setTask("");

  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ margin: "20px" }}>EVENT TIMER</h2>
      <div className="forms">
        <form className="forms-submit" onSubmit={onSubmit}>
          <input
            type="number"
            min="2022"
            placeholder="year"
            value={yrput}
            onChange={(e) => setYrput(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="month"
            min="1"
            max="12"
            value={mthput}
            onChange={(e) => setMthput(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="day"
            min="1"
            max="30"
            value={dyput}
            onChange={(e) => setDyput(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="hours"
            min="0"
            max="24"
            value={hrput}
            onChange={(e) => setHrput(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="minutes"
            min="0"
            max="59"
            value={minput}
            onChange={(e) => setMinput(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="seconds"
            min="0"
            max="59"
            value={secput}
            onChange={(e) => setSecput(e.target.value)}
          />
          <button onClick={onsubmit} className="button">
            Set Timer
          </button>
        </form>
      </div>
      <div className="event">
        <form onsubmit={eventSubmit}>
          <label>Event: </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
      </div>
      <button className="btn-event" onClick={eventSubmit}>
        Add Event
      </button>

      <div className="timer">
        <div>
          <span>
            {date.yr < 10 ? "0" : ""}
            {date.yr}
          </span>
          <span>years</span>
        </div>
        <span>:</span>
        <div>
          <span>
            {date.mth < 10 ? "0" : ""}
            {date.mth}
          </span>
          <span>months </span>
        </div>
        <span>:</span>
        <div>
          <span>
            {date.dy < 10 ? "0" : ""}
            {date.dy}
          </span>
          <span>days</span>
        </div>
        <span>:</span>
        <div>
          <span>
            {date.hr < 10 ? "0" : ""}
            {date.hr}
          </span>
          <span>hours</span>
        </div>
        <span>:</span>
        <div>
          <span>
            {date.mins < 10 ? "0" : ""}
            {date.mins}
          </span>
          <span>minutes</span>
        </div>
        <span>:</span>
        <div>
          <span>
            {date.secs < 10 ? "0" : ""}
            {date.secs}
          </span>
          <span>seconds</span>
        </div>
      </div>
      <h3 className="constant">To</h3>
      <h2 className="text">{event}</h2>
    </div>
  );
};
export default Timer;
