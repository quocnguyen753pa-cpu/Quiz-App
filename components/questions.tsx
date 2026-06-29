"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { alphabeticNumeral, Category, PROFILES_KEY, showCategory } from "@/constants";
import { Answer } from "@/constants/answer";
import { Question } from "@/constants/question";
import { User, UserSaveAnswer } from "@/constants/user";
import useModalStore from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  questions: Question[]
  category: Category
  duration?: number
  correctQuestions?: number
  isSave: boolean
  isTest: boolean
  user: User
};

const handleSelect = (optText: string, selectedText: string, question: Question) => {
  const correctText = question.opts.find(o => o.n === question.ans)?.t;
  if (optText === selectedText && optText === correctText) return "correct";
  if (optText === selectedText) return "incorrect";
  if (optText === correctText) return "correct";
  return "";
};

const Questions = ({ questions, category, duration, isSave, isTest, user, correctQuestions }: Props) => {
  const [curr, setCurr] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [pendingOption, setPendingOption] = useState<number>(-1);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [isAllSubmitted, setIsAllSubmitted] = useState<boolean>(false);
  const { onOpen } = useModalStore();
  const router = useRouter();

  const currentAnswer = userAnswers.find(ua => ua.id === questions[curr].id);
  const isSubmitted = !!currentAnswer;
  const effectiveOption = isSubmitted ? currentAnswer.ans : pendingOption;
  const selectedText = isSubmitted
    ? questions[curr].opts.find(opt => opt.n === currentAnswer.ans)?.t ?? ""
    : "";

  const computeScore = () =>
    userAnswers.reduce((acc, ua) => {
      const q = questions.find(q => q.id === ua.id);
      return q && ua.ans === q.ans ? acc + 1 : acc;
    }, 0);

  const saveProfile = (answers: Answer[], currPos: number) => {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      const profiles: User[] = raw ? JSON.parse(raw) : [];
      const saveAnswer: UserSaveAnswer = { category, answers, curr: currPos };
      const profileIdx = profiles.findIndex(p => p.username === user.username);
      if (profileIdx > -1) {
        const catIdx = profiles[profileIdx].saveAnswers.findIndex(s => s.category === category);
        if (catIdx > -1) profiles[profileIdx].saveAnswers[catIdx] = saveAnswer;
        else profiles[profileIdx].saveAnswers.push(saveAnswer);
      } else {
        profiles.push({ username: user.username, saveAnswers: [saveAnswer] });
      }
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch { /* ignore storage errors */ }
  };

  const handleSubmit = () => {
    const newAnswer: Answer = { id: questions[curr].id, ans: pendingOption };
    const updated = [...userAnswers.filter(ua => ua.id !== questions[curr].id), newAnswer];
    setUserAnswers(updated);
    if (isSave) saveProfile(updated, curr);
  };

  const handleTestOptionClick = (optN: number) => {
    setPendingOption(optN);
    const newAnswer: Answer = { id: questions[curr].id, ans: optN };
    setUserAnswers(prev => [...prev.filter(ua => ua.id !== questions[curr].id), newAnswer]);
  };

  const handleNext = () => {
    const nextCurr = curr + 1;
    setCurr(nextCurr);
    if (isSave) saveProfile(userAnswers, nextCurr);
  };

  const handleChangeCurr = (i: number) => {
    setCurr(i);
    if (isSave) saveProfile(userAnswers, i);
  };

  const handleQuit = () => {
    if (!isSave) {
      onOpen("quitQuiz");
    } else {
      router.push("/");
    }
  };

  const handleShowResult = () => {
    const isWrongCrit = questions.some(q =>
      q.crit && userAnswers.find(ua => ua.id === q.id)?.ans !== q.ans
    );
    onOpen("showResults", {
      score: computeScore(),
      isTest,
      isWrongCrit,
      limit: questions.length,
      correctQuestions: correctQuestions,
      category: showCategory(category),
    });
    setIsAllSubmitted(true);
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setIsAllSubmitted(true);
    toast.info("Hết thời gian!");
    handleShowResult();
  };

  useEffect(() => {
    setPendingOption(-1);
  }, [curr, questions]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (!raw) return;
      const profiles: User[] = JSON.parse(raw);
      const profileIdx = profiles.findIndex(p => p.username === user.username);
      if (profileIdx === -1) return;
      if (isTest) {
        profiles[profileIdx].saveAnswers = profiles[profileIdx].saveAnswers.filter(s => s.category !== category);
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
        return;
      }
      const saved = profiles[profileIdx].saveAnswers.find(s => s.category === category);
      if (saved) {
        setUserAnswers(saved.answers);
        if (saved.curr >= 0 && saved.curr < questions.length) setCurr(saved.curr);
      }
    } catch { /* ignore corrupt data */ }
  }, []);

  if (!questions || !questions.length) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl sm:rounded-lg">
      <div className="flex overflow-x-auto gap-2 no-scrollbar">
        {questions.map((question, i) => {
          const ans = userAnswers.find(ua => ua.id === question.id);
          const borderColor = ans
            ? isTest ? '#000' : (ans.ans === question.ans ? '#22c55e' : '#ef4444')
            : undefined;
          return (
            <Button
              key={i}
              className="shrink-0"
              variant={curr === i ? "default" : "outline"}
              style={borderColor ? { borderColor } : {}}
              onClick={() => handleChangeCurr(i)}
            >
              {i + 1}
            </Button>
          );
        })}
      </div>

      {/* Question Information */}
      <div className="flex justify-between items-center h-20 text-sm md:text-base">
        <div className="space-y-1">
          <p>Danh mục: {showCategory(category)}</p>
        </div>
        {(duration ?? -1) > 0 && (
          <CountdownCircleTimer
            key="countdown-timer"
            isPlaying={!isAllSubmitted}
            duration={duration!}
            size={45}
            strokeWidth={4}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[duration! * 0.8, duration! * 0.5, duration! * 0.2, 0]}
            onComplete={handleTimeUp}
          >
            {({ remainingTime }) => (
              <div className="text-center">{remainingTime}</div>
            )}
          </CountdownCircleTimer>
        )}
      </div>

      <Separator />

      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">

        {/* Title Question */}
        <h2 className={cn(
          'text-2xl text-center font-medium',
          questions[curr].crit && !isTest ? 'text-[#A30000]' : ''
        )}>
          {`Q${curr + 1}. ${questions[curr].q}`}
        </h2>

        {/* Image Question */}
        {questions[curr].img && (
          <div className="flex justify-center mt-4">
            <img src={questions[curr].img} alt={questions[curr].q} />
          </div>
        )}

        {/* Question items */}
        <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
          {questions[curr].opts.map((opt, i) => (
            <button
              key={i}
              className={cn(
                'option',
                isTest
                  ? opt.n === effectiveOption ? 'selected' : ''
                  : isSubmitted
                    ? handleSelect(opt.t, selectedText, questions[curr])
                    : opt.n === effectiveOption ? 'selected' : ''
              )}
              disabled={isTest ? isAllSubmitted : (isSubmitted || isTimeUp)}
              onClick={() => isTest ? handleTestOptionClick(opt.n) : setPendingOption(opt.n)}
            >
              {alphabeticNumeral(i)}{opt.t}
            </button>
          ))}
        </div>

        <Separator />

        {/* Question Tip */}
        {isSubmitted && !isTest && questions[curr].tip && (
          <>
            <div className="py-4 text-xl text-center font-medium">
              {questions[curr].tip}
            </div>
            <Separator />
          </>
        )}

        {/* Buttons */}
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          {isTest ? (
            <Button
              onClick={() =>
                curr + 1 === questions.length ? handleShowResult() : handleNext()
              }
            >
              {curr + 1 === questions.length ? "Xem kết quả" : "Câu tiếp theo"}
            </Button>
          ) : !isSubmitted ? (
            <Button
              disabled={pendingOption === -1 || isTimeUp}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          ) : (
            <Button
              onClick={() =>
                curr + 1 === questions.length ? handleShowResult() : handleNext()
              }
            >
              {curr + 1 === questions.length ? "Xem kết quả" : "Câu tiếp theo"}
            </Button>
          )}
          <Button variant="destructive" onClick={handleQuit}>
            Thoát
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
