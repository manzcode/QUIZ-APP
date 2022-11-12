export type Data = {
  answer: string;
  choices: { a: string; b: string; c: string; d: string };
  id: number;
  question: string;
  topic: string;
};
export type TheQuiz = Data[];

export const URL =
  "https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json";

export const getQuiz = (quiz: TheQuiz): Data => {
  const n = Math.round(Math.random() * 38);
  return quiz[n];
};
/**
 * we try to get data from the back-end.
 *
 * @param url is the url where we get the data -> https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json
 * @returns TheQuiz or Error
 */
export async function getQuizFromUrl(url: string) {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    return error;
  }
}
