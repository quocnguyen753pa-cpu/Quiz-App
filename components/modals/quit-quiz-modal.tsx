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
import useModalStore from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

const QuitQuizModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const open = isOpen && type === "quitQuiz";
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn thoát khỏi tiến trình?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn thoát không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/")}>
            Đồng ý
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuitQuizModal;
