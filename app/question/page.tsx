import QuestionPage from './QuestionPage'; // Client Component
import questionsData from '../data/questions.json';
import type { Question as QuestionType } from '../utils/types';

// Server Component
export default async function Page() {
  const quiz: QuestionType[] = await questionsData.questions;

  return <QuestionPage quiz={quiz} />;
}
