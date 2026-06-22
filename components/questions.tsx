"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { alphabeticNumeral, showCategory } from "@/constants";
import useModalStore from "@/hooks/useModalStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";

type Props = {
  questions: {
    id: number;
    category: string;
    cn: string;
    q: string;
    opts: {
      n: number,
      t: string,
    }[],
    ans: number,
    crit: boolean;
    tip: string;
  }[];
  limit: number;
  category: string;
  duration: number | null;
  currentQuestion: number | null;
};

const Questions = ({ questions, limit, category, duration, currentQuestion }: Props) => {
  const [curr, setCurr] = useState(currentQuestion ?? 0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const { onOpen } = useModalStore();
  const [key, setKey] = useState(0);

  const handleShuffle = (correctAnswer: string, incorrectAnswers: string[]) => {
    const shuffledAnswers = [...incorrectAnswers];

    shuffledAnswers.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(
      Math.random() * (shuffledAnswers.length + 1)
    );
    shuffledAnswers.splice(randomIndex, 0, correctAnswer);

    return shuffledAnswers;
  };

  const handleCheck = (answer: string, isTimeUp: boolean = false) => {
    setSelected(answer);
    const correctAnswer = questions[curr].opts.find((i) => i.n === questions[curr].ans)?.t;
    if (answer === correctAnswer && !isTimeUp)
      setScore(score + 1);
  };

  const handleSelect = (i: string) => {
    const correctAnswer = questions[curr].opts.find((i) => i.n === questions[curr].ans)?.t;
    if (selected === i && selected === correctAnswer)
      return "correct";
    else if (selected === i && selected !== correctAnswer)
      return "incorrect";
    else if (i === correctAnswer) return "correct";
  };

  const handleNext = () => {
    const nextCurr = curr + 1;
    setCurr(nextCurr);
    setSelected("");
    setKey((prevKey) => prevKey + 1);
    localStorage.setItem('curr', nextCurr.toString());
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    onOpen("showResults", {
      score,
      limit,
    });
  };

  const handleTimeUp = () => {
    const correctAnswer = questions[curr].opts.find((i) => i.n === questions[curr].ans)?.t;
    if (correctAnswer) {
      handleCheck(correctAnswer, true);
    }
    toast.info("You ran out of Time!");
  };

  useEffect(() => {
    const correctAnswer = questions[curr].opts.find((i) => i.n === questions[curr].ans)?.t;
    const incorrectAnswers = questions[curr].opts.filter((an) => an.n != questions[curr].ans).map(i => i.t);
    if (correctAnswer) {
      setAnswers(
        handleShuffle(
          correctAnswer,
          incorrectAnswers,
        )
      );
    }
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr, questions, limit]);

  if (!questions || !answers.length) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl sm:rounded-lg">
      <Progress value={progressValue} />
      <div className="flex justify-between items-center h-20 text-sm md:text-base">
        <div className="space-y-1">
          <p>Category: {showCategory(category)}</p>
          <p>Score: {score}</p>
        </div>
        {((duration ?? -1) > 0) ? (<>
          <CountdownCircleTimer
            key={key}
            isPlaying={!selected}
            duration={duration!}
            size={45}
            strokeWidth={4}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[15, 8, 3, 0]}
            onComplete={handleTimeUp}
          >
            {({ remainingTime }) => (
              <div className="text-center">{remainingTime}</div>
            )}
          </CountdownCircleTimer>
        </>) : <></>}
      </div>
      <Separator />
      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">
        <h2 className="text-2xl text-center font-medium">{`Q${curr + 1}. ${questions[curr].q
          }`}</h2>
        <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
          {answers.map((answer, i) => (
            <button
              key={i}
              className={`option ${selected && handleSelect(answer)}`}
              disabled={!!selected}
              onClick={() => handleCheck(answer)}
            >
              {alphabeticNumeral(i)}
              {answer}
            </button>
          ))}
        </div>
        <Separator />
        {selected ? (
          <>
            <div className="py-4 text-xl text-center font-medium">
              {questions[curr].tip}
            </div>
            <Separator />
          </>
        ) : <></>}
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          <Button
            disabled={!selected}
            onClick={() =>
              questions.length === curr + 1 ? handleShowResult() : handleNext()
            }
          >
            {questions.length - 1 != curr ? "Next Question" : "Show Results"}
          </Button>
          <Button variant={"destructive"} onClick={handleQuit}>
            Quit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
