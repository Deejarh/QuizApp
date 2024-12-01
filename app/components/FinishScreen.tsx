import Link from "next/link";
import Button from "@mui/material/Button";

interface FinishScreenProps {
  points: number;
  maxPoint: number;
}

function FinishScreen({ points, maxPoint }: FinishScreenProps) {
  const percentage = (points / maxPoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎉🎉🎉";
  if (percentage >= 80 && percentage < 100) emoji = "🚀";
  if (percentage >= 50 && percentage < 80) emoji = "🙂";
  if (percentage >= 20 && percentage < 50) emoji = "🙃";
  if (percentage >= 0 && percentage < 20) emoji = "😏";
  if (percentage === 0) emoji = "🤦‍♀️";

  return (
    <>
      <p className=" result">
        <span> {emoji}</span>You scored <strong> {points}</strong> out of{" "}
        {maxPoint} ({Math.ceil(percentage)})%
      </p>
      <Link
        href={{
          pathname: "/",
        }}
        passHref
      >
        <Button variant="contained">Restart Quiz</Button>
      </Link>
    </>
  );
}

export default FinishScreen;
