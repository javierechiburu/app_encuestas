import { cn } from "@/config/clsx/clsxMerge";
import { QuestionFormProps } from "@/types/types";
import { renderQuestion } from "@/utils/render";
import { Asterisk } from "lucide-react";

export const Question = ({
  question,
  current,
  errors,
  register,
  watch,
  setValue,
  index,
}: QuestionFormProps) => {
  return (
    <div
      className={cn("transition-all duration-500 transform ease-in-out", {
        "absolute inset-0 opacity-0 translate-x-full": index > current,
        "relative opacity-100 translate-x-0": index === current,
        "absolute inset-0 opacity-0 -translate-x-full": index < current,
      })}
      aria-hidden={index !== current}
      inert={index !== current ? true : undefined}
    >
      <div className="mb-4">
        <p>{question.description || ""}</p>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">{question.label}</h3>
          <Asterisk size={16} className="text-red-500 hidden md:block" />
        </div>
        <div className="py-8 mt-16 md:mt-0">
          {renderQuestion({
            question,
            errors,
            register,
            watch,
            setValue,
            index,
            current,
          })}
        </div>
      </div>
    </div>
  );
};
