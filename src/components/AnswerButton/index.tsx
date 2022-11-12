import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = PropsWithChildren<{
  answer: string;
  index: "a" | "b" | "c" | "d";
  content: string | undefined;
  message: boolean | null;
  setAnswer: Dispatch<SetStateAction<boolean | null>>;
}>;

function AnswerButton({
  content,
  answer,
  setAnswer,
  index,
  message, //getAnswer
}: Props) {
  const [state, setState] = useState<boolean | null>(null);

  const handleAnswerClick = () => {
    if (message !== null) {
      return;
    }
    if (index === answer) {
      setAnswer(true);
      setState(true);
    } else {
      setAnswer(false);
      setState(false);
    }
  };

  useEffect(() => {
    if (message === null) {
      setState(null);
    }
  }, [message]);

  if (content !== undefined) {
    return (
      <div className="col-md-6 my-2">
        <button
          className={`btn btn-${
            state === null ? "outline-info" : state ? "success" : "danger"
          } w-100 h-100 mx-2`}
          onClick={handleAnswerClick}
        >
          <h4>{content}</h4>
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default AnswerButton;
