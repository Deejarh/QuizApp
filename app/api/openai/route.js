import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); // Get search params
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty') || 'easy';
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that generates quiz questions using ${category} and ${difficulty} provided.`,
        },
        {
          role: 'user',
          content: `Generate a JSON object with a "questions" array containing 10 multiple-choice questions for the category "${category}" and difficulty "${difficulty}".Do not include any extra characters like backticks or Markdown formatting. 
                   Each question object should have the following structure:
                   - "question": (string) The text of the question.
                   - "options": (array) An array of four options as strings.
                   - "correctOption": (integer) The index of the correct option (0-based).
                   - "points": (integer) The points awarded for a correct answer.

                  Example format:
                  {
                    "questions": [
                      {
                        "question": "Which of this is not a JavaScript framework?",
                        "options": ["Angular", "React", "Laravel", "Vue"],
                        "correctOption": 2,
                        "points": 10
                      }
                    ]
                   }

                  Generate 10 unique questions with this format`,
        },
      ],
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No choices returned from OpenAI API');
    }
    const data = completion.choices[0].message.content.trim();
    return new Response(
      JSON.stringify({ questions: JSON.parse(data).questions }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
