import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProgressProps {
  answer: number | null;
  index: number;
  totalQuestion: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('light', {
      backgroundColor: '#309fe8',
    }),
  },
}));
export default function Progress({
  totalQuestion,
  index,
  answer,
}: ProgressProps) {
  const progress = ((index + Number(answer !== null)) / totalQuestion) * 100;

  return (
    <div className=" mb-12 top-2">
      <Box
        gap={2}
        sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}
      >
        <Box sx={{ width: '100%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
          {Math.round(progress)}%
        </Typography>
      </Box>
    </div>
  );
}
