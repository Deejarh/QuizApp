import QuestionPage from './QuestionPage'; // Client Component
import type { Question as QuestionType } from '../utils/types';
import {fetchQuestionsFromOpenAI} from '../lib/openai'

// Server Component
export default async function Page() {
  const quiz: QuestionType[] = await fetchQuestionsFromOpenAI();
  return <QuestionPage quiz={quiz} />;
}
