import { useEffect } from 'react';

interface TimerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          dispatch({ type: 'finish' });
        } else {
          dispatch({ type: 'nextQuestion' });
        }
      } else {
        const id = setInterval(() => {
          dispatch({ type: 'tick' });
        }, 1000);

        return () => clearInterval(id);
      }
    },
    [dispatch, secondsRemaining, index, totalQuestion]
  );
  return (
    <div className=" w-full  flex items-center justify-center mb-12 mt-5">
      <div
        className={` ${sec <= 3 ? ' text-red-400' : ''} border rounded-full py-2 px-4 font-bold text-xl shadow-lg `}
      >
        {minute < 10 ? '0' : ''}
        {minute} : {sec < 10 ? '0' : ''}
        {sec}
      </div>
    </div>
  );
}

export default Timer;
