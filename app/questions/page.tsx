import Questions from "@/components/questions";
import { Question } from "@/constants/question";
import { Category, categoryProfiles, PROFILES_KEY } from "@/constants";
import "./questions.css";
import { User } from "@/constants/user";

export const fetchCache = "force-no-store";

type Props = {
  searchParams: {
    category: Category
    username: string
  }
};

async function getData(category: Category) {
  const base_url = process.env.APP_URL ?? "http://localhost:3000";
  const res = await fetch(
    `${base_url}/api/v1/questions?category=${category}`,
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

function getUser(username: string) {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) {
      const profiles: User[] = JSON.parse(raw);
      const profile = profiles.find(p => p.username === username);
      if (profile)
        return profile;
    }
  } catch { /* ignore corrupt data */ }
  return { username, saveAnswers: [] } as User
}

const QuestionsPage = async ({ searchParams }: Props) => {
  const durationDefault = Number(process.env.APP_TEST_DURATION ?? 20 * 60);
  const { category, username } = searchParams;
  const questions = (await getData(category)) as Question[];
  const categoryProfile = categoryProfiles.find(c => c.value === category);
  const isSave = categoryProfile?.isSave ?? false;
  const isTest = categoryProfile?.isTest ?? false;
  const duration = isTest ? durationDefault : null;
  const user = getUser(username);

  return (
    <Questions
      questions={questions}
      category={category}
      duration={duration}
      isSave={isSave}
      isTest={isTest}
      user={user}
    />
  );
};

export default QuestionsPage;
