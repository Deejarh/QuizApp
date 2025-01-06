import Link from 'next/link';
import Button from '@mui/material/Button';

interface FinishScreenProps {
  points: number;
  maxPoint: number;
}

function FinishScreen({ points, maxPoint }: FinishScreenProps) {
  const percentage = (points / maxPoint) * 100;
  let emoji;
  if (percentage === 100) emoji = '🎉🎉🎉';
  if (percentage >= 80 && percentage < 100) emoji = '🚀';
  if (percentage >= 50 && percentage < 80) emoji = '🙂';
  if (percentage >= 20 && percentage < 50) emoji = '🙃';
  if (percentage >= 0 && percentage < 20) emoji = '😏';
  if (percentage === 0) emoji = '🤦‍♀️';

  return (
    <div className=" flex justify-center items-center flex-col">
      <p className=" my-8 text-xl">
        <span> {emoji}</span>You scored{' '}
        <strong className=" font-extrabold"> {points}</strong> out of {maxPoint}
      </p>
      <Link
        href={{
          pathname: '/',
        }}
        passHref
      >
        <Button variant="contained">Restart Quiz</Button>
      </Link>
    </div>
  );
}

export default FinishScreen;
