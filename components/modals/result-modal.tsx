"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useModalStore from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

const ResultModal = () => {
  const { isOpen, type, onClose, additionalData } = useModalStore();
  const open = isOpen && type === "showResults";
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Kết quả - {additionalData.category}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col items-center py-4 md:py-6">
          <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            Điểm của bạn: {`${additionalData.score}/${additionalData.limit}`}
          </p>
          {additionalData.isTest ? <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            Sai câu điểm liệt: {additionalData.isWrongCrit ? 'Có' : 'Không'}
          </p> : <></>}
          {additionalData.correctQuestions ? <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            Số câu cần đúng: {additionalData.correctQuestions}
          </p> : <></>}
          {(additionalData.correctQuestions && additionalData.isTest) ? <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            Kết quả: {additionalData.score! >= additionalData.correctQuestions! ? "Đạt" : "Không đạt"}
          </p> : <></>}
          <Button
            onClick={() => {
              router.push("/");
              onClose();
            }}
            className="mt-3 md:mt-5"
          >
            Thử lại
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
