import { useEffect } from "react";

interface TimerProps {
  dispatch: React.Dispatch<any>;
  secondsRemaining: number;
  index: number;
  totalQuestion: number;
}

function Timer({
  dispatch,
  secondsRemaining,
  index,
  totalQuestion,
}: TimerProps) {
  const minute = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(
    function () {
      if (secondsRemaining === 0) {
        if (index === totalQuestion - 1) {
          dispatch({ type: "finish" });
        } else {
          dispatch({ type: "nextQuestion" });
        }
      } else {
        const id = setInterval(() => {
          dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(id);
      }
    },
    [dispatch, secondsRemaining, index, totalQuestion]
  );
  return (
    <button className="btn btn-ui">
      {minute < 10 ? "0" : ""}
      {minute} : {sec < 10 ? "0" : ""}
      {sec}
    </button>
  );
}

export default Timer;
