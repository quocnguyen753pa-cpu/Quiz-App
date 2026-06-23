"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category, categoryProfiles, PROFILES_KEY } from "@/constants";
import { User } from "@/constants/user";
import useModalStore from "@/hooks/useModalStore";

const QuizSettings = () => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const [username, setUsername] = useState<string>("");
  const [usernameList, setUsernameList] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(Category.all_gplx_600);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (raw) {
        const profiles: User[] = JSON.parse(raw);
        setUsernameList(profiles.map(p => p.username));
      }
    } catch { }
  }, []);

  const handleQuizStart = () => {
    const url = `/questions?category=${category}&username=${username}`;
    const isTest = categoryProfiles.find(c => c.value === category)?.isTest ?? false;
    if (isTest) {
      router.push(url);
      return;
    }
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (raw) {
        const profiles: User[] = JSON.parse(raw);
        const profile = profiles.find(p => p.username === username);
        const saved = profile?.saveAnswers.find(s => s.category === category);
        if (saved?.answers.length) {
          onOpen("continueQuiz", { redirectUrl: url, username, category });
          return;
        }
      }
    } catch { }
    router.push(url);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
      <input list="user-list" value={username} onInput={(e) => setUsername(e.currentTarget.value)} placeholder="Tên người dùng" className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full md:max-w-xs xl:max-w-md" />
      <datalist id="user-list">
        {usernameList.map(u => <option key={u} value={u} />)}
      </datalist>
      <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
          <SelectValue placeholder="=== Chọn danh mục ===" />
        </SelectTrigger>
        <SelectContent>
          {categoryProfiles.map((category) => (
            <SelectItem value={category.value} key={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button disabled={!category || !username} onClick={handleQuizStart}>
        Bắt đầu
      </Button>
    </div>
  );
};

export default QuizSettings;
