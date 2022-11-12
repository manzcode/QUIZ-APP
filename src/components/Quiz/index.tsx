import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AnswerButton from "../AnswerButton";
import Header from "../headers";
import type { TheQuiz } from "../../utils";
import { getQuiz, getQuizFromUrl, URL } from "../../utils";
import Result from "../result";

/**
 *
 * @returns jsx-elements
 */
function Quiz() {
  const [quiz, setQuiz] = useState<TheQuiz>([]);
  const [error, setError] = useState(null);
  const [theQuiz, setTheQuiz] = useState<number[]>([]); //table of the id of the quiz, so the quiz is display only once.
  const [index, setIndex] = useState<number>(0);
  const [getAnswer, setAnswer] = useState<boolean | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const tab: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];

  const answer = {
    correct: "Good, that's correct. You're smart!",
    wrong: "Nice try but that's not correct.",
  };

  const handleClick = () => {
    let newQuiz = getQuiz(quiz);
    while (theQuiz.some((value) => value === newQuiz?.id)) {
      newQuiz = getQuiz(quiz);
    }
    getAnswer !== null && getAnswer && setUserScore((p) => p + 1);
    setTheQuiz((p) => [...p, newQuiz?.id]);
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  const Newgame = () => {
    setTheQuiz([getQuiz(quiz)?.id]);
    setAnswer(null);
    setUserScore(0);
    setIndex(0);
  };

  useEffect(() => {
    document.title = "Quiz";
    getQuizFromUrl(URL)
      .then((res: TheQuiz) => {
        //Remove the duplicate Id from the data we've got
        let j = 0;
        const response = res.map((value, i, res) => {
          const idLastTabElement = res[res.length - 1]?.id;
          if (value?.id === res[i - 1]?.id) {
            j += 1;
            const newId = idLastTabElement - value?.id;
            return {
              ...value,
              id: newId + value?.id + j,
            };
          }
          return value;
        }) as TheQuiz;
        setQuiz([...response]);
        setTheQuiz([getQuiz(res)?.id]);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <>
      <Header />
      <div
        className={`container h-100 justify-content-center ${
          !error && "align-items-start my-2"
        }`}
      >
        {error ? (
          <div>
            <h1>Error</h1>
            <p>une error est survenue lors l'obtention des donnée</p>
            <div className="text-secondary">Verifier la connexion</div>
          </div>
        ) : (
          <div className="w-auto h-auto p-5 bg-light border shadow rounded-3">
            {index >= 10 ? ( //When the question ends, we display the score of user here
              <>
                <h1 className="text-center">
                  <i> Your score : </i> {`${userScore}`}{" "}
                </h1>
                <div className="d-flex justify-content-center fs-3">
                  <Result userScore={userScore} />{" "}
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={Newgame}>
                    New Game
                  </button>
                </div>
              </>
            ) : (
              <>
                <h5 className="text-center">{`question ${index + 1}/10 #${
                  quiz.find((value) => value.id === theQuiz[index])?.id
                }`}</h5>
                <h1 className="text-center text-break">
                  {quiz.find((value) => value.id === theQuiz[index])?.question}
                </h1>
                <div className="row">
                  {tab.map((value) => {
                    return (
                      <AnswerButton
                        key={value}
                        index={value}
                        content={
                          quiz.find((value) => value.id === theQuiz[index])
                            ?.choices[value]
                        }
                        answer={
                          quiz.find((value) => value.id === theQuiz[index])
                            ?.answer as string
                        }
                        message={getAnswer}
                        setAnswer={setAnswer}
                      />
                    );
                  })}
                </div>
                {getAnswer !== null && ( //if they give an answer, we display this
                  <div className="justify-content-center">
                    <div
                      className={`alert text-center alert-${
                        getAnswer ? "success" : "danger"
                      }`}
                    >
                      {getAnswer ? answer["correct"] : answer["wrong"]}
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary w-50"
                        type="button"
                        onClick={handleClick}
                      >
                        next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <footer className="w-100 h-auto py-3 my-4">
          <p className="text-center text-muted">© 2022 Mario</p>
        </footer>
      </div>
    </>
  );
}

export default Quiz;
