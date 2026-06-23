"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PROFILES_KEY } from "@/constants";
import { User } from "@/constants/user";
import useModalStore from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

const ContinueQuizModal = () => {
  const { isOpen, type, additionalData, onClose } = useModalStore();
  const open = isOpen && type === "continueQuiz";
  const router = useRouter();

  const handleContinue = () => {
    onClose();
    router.push(additionalData.redirectUrl!);
  };

  const handleRestart = () => {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (raw) {
        const profiles: User[] = JSON.parse(raw);
        const profileIdx = profiles.findIndex(p => p.username === additionalData.username);
        if (profileIdx > -1) {
          profiles[profileIdx].saveAnswers = profiles[profileIdx].saveAnswers.filter(
            s => s.category !== additionalData.category
          );
          localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
        }
      }
    } catch { }
    onClose();
    router.push(additionalData.redirectUrl!);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có tiến trình chưa hoàn thành</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn muốn tiếp tục từ chỗ đã làm hay bắt đầu lại từ đầu?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleRestart}>Bắt đầu lại</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContinueQuizModal;
