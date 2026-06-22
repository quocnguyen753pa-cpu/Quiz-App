import Questions from "@/components/questions";
import { categoryOptions, difficultyOptions } from "@/constants";
import { redirect } from "next/navigation";
import "./questions.css";

export const fetchCache = "force-no-store";

type Props = {
  searchParams: {
    category: string;
    difficulty: string;
    limit: string;
  };
};

async function getData() {
  const res = await fetch(
    "http://localhost:3000/api/v1/questions",
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

const QuestionsPage = async () => {
  const response = await getData();

  return (
    <Questions
      questions={response}
      limit={600}
      category='gplx_600'
      duration={null}
      currentQuestion={0}
    />
  );
};

export default QuestionsPage;
