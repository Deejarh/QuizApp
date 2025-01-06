import type { Question } from '../utils/types';
import { Box, Button } from '@mui/material';

interface QuestionProps {
  question: Question;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  answer: number | null;
  secondsRemaining: number;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  const hasAnswer = answer !== null;

  const handleAnswer = (index: number) => {
    if (!hasAnswer) {
      dispatch({ type: 'newAnswer', payload: index });
    }
  };

  return (
    <Box
      sx={{
        width: 600,
      }}
    >
      <h4 className=" text-2xl font-bold mb-12">{question.question}</h4>
      <Box display="grid" gridTemplateColumns="1fr" gap={3}>
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctOption;
          const isSelected = index === answer;

          let buttonBackgroundColor = 'white';
          let buttonColor = 'black';

          if (hasAnswer) {
            // If an answer has been selected, check if it's correct or incorrect
            if (isSelected) {
              buttonBackgroundColor = isCorrect ? 'green' : 'red';
              buttonColor = 'white';
            } else {
              buttonBackgroundColor = 'gray'; // disable non-selected options
            }
          }

          return (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={hasAnswer}
              variant="contained"
              sx={{
                backgroundColor: buttonBackgroundColor + ' !important',
                color: buttonColor + ' !important',
                borderRadius: 6,
                border: '2px solid',
                borderColor: hasAnswer && isSelected ? 'transparent' : 'gray',
                padding: '10px',
                textAlign: 'center',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: !hasAnswer
                    ? 'lightblue'
                    : buttonBackgroundColor,
                },
                '&.Mui-disabled': {
                  backgroundColor: 'gray',
                  color: 'white',
                  cursor: 'not-allowed',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              {option}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
