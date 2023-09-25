import React, { useEffect, useState } from "react";
import moment from "moment";

const TimeCountDown = ({ auctionDetails }) => {
  const [timer, setTimer] = useState({});

  function calculateTimeLeft(leftDate) {
    let difference = +new Date(`${leftDate}`) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    let leftDate = auctionDetails?.saleEndTime;
    const timer = setTimeout(() => {
      const times = calculateTimeLeft(leftDate)
      setTimer(times);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      {moment().isBefore(auctionDetails?.saleStartTime) ? (
        <h4 className="counter_here collection_sale">Sale coming soon </h4>
      ) : timer?.days > 0 ||
        timer?.hours > 0 ||
        timer?.minutes > 0 ||
        timer?.seconds > 0 ? (
        // <div className="space-y-5">
        //   <div className="aution_ending_div">
        //     <svg width="28" height="28" viewBox="0 0 24 24">
        //       <path
        //         fill="currentColor"
        //         d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"
        //       />
        //     </svg>
        //     <span className="auction_ending collection_sale">Sale ending in:</span>
        //   </div>
        //   <div className="counter_here">
        //     <div className="counter_box">
        //       <strong>{timer?.days}</strong>
        //       <p>Days</p>
        //     </div>

        //     <div className="counter_box">
        //       <strong>{timer?.hours}</strong>
        //       <p>Hours</p>
        //     </div>

        //     <div className="counter_box">
        //       <strong>{timer?.minutes}</strong>
        //       <p>Minutes</p>
        //     </div>

        //     <div className="counter_box">
        //       <strong>{timer?.seconds}</strong>
        //       <p>Seconds</p>
        //     </div>
        //   </div>
        // </div>
        <ul className="timing_list_single">
          <li>
            <div className="timing_div_single">
              <h4>{timer?.days}</h4>
              <p>Days</p>
            </div>
          </li>

          <li>
            <div className="timing_div_single">
              <h4>{timer?.hours}</h4>
              <p>Hours</p>
            </div>
          </li>

          <li>
            <div className="timing_div_single">
              <h4>{timer?.minutes}</h4>
              <p>MIns</p>
            </div>
          </li>

          <li>
            <div className="timing_div_single">
              <h4>{timer?.seconds}</h4>
              <p>Secs</p>
            </div>
          </li>
        </ul>
      ) : (
        <h5 className="counter_here collection_sale">Sale has been Expired... </h5>
      )}
    </>
  );
};

export default TimeCountDown;
