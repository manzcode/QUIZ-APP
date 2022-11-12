import React, { PropsWithChildren } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle, AiOutlineSmile } from "react-icons/ai";
import { MdMoodBad } from "react-icons/md";

type Props = PropsWithChildren<{
  userScore: number;
}>;

function Result({ userScore }: Props) {
  return userScore > 5 ? (
    <div className="text-center alert alert-success w-25">
      <AiOutlineCheckCircle />
      <small>Good</small>
    </div>
  ) : userScore > 3 && userScore < 5 ? (
    <div className="text-center alert alert-warning w-25">
      <RiErrorWarningLine />
      <small>You can do better</small>
    </div>
  ) : userScore === 5 ? (
    <div className="text-center alert alert-info w-25">
      <AiOutlineSmile />
      <small>Not bad</small>
    </div>
  ) : (
    <div className="text-center alert alert-danger w-25">
      <MdMoodBad />
      <small>Try again</small>
    </div>
  );
}

export default Result;
