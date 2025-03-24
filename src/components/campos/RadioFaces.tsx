import { Faces, Square } from "@/components/Faces";
import type { QuestionFormProps } from "@/types/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/config/clsx/clsxMerge";

const options = [
  { value: 1, label: "Muy insatisfecho", color: "#ED1C24" },
  { value: 2, label: "Insatisfecho", color: "#F26522" },
  { value: 3, label: "Algo insatisfecho", color: "#F7941D" },
  { value: 4, label: "Neutral", color: "#FFF200" },
  { value: 5, label: "Algo satisfecho", color: "#8CC63F" },
  { value: 6, label: "Satisfecho", color: "#39B54A" },
  { value: 7, label: "Muy satisfecho", color: "#00A651" },
];

export const RadioFace = ({ question, register, watch }: QuestionFormProps) => (
  <div className="w-full max-w-sm md:max-w-max mx-auto px-4 md:px-0 mt-0 md:mt-8 2xl:pt-16">
    <div className="flex items-center">
      <div className="hidden md:block mr-8">
        <ThumbsDown className="h-8 w-8 text-slate-500" />
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-7 md:gap-0 mb-4">
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={`face_${option.value}_${question.id}`}
              className="cursor-pointer"
            >
              <Square text={`${option.value}`} color={option.color} />
            </label>
          ))}
        </div>

        <div
          className="grid grid-cols-7 gap-1 mt-4"
          role="radiogroup"
          aria-labelledby={`group-${question.id}`}
        >
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={`face_${option.value}_${question.id}`}
              role="radio"
              aria-checked={Number(watch(question.id)) === option.value}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document
                    .getElementById(`face_${option.value}_${question.id}`)
                    ?.click();
                }
              }}
              className={cn(
                "flex justify-center relative cursor-pointer transition-transform",
                {
                  "scale-105": Number(watch(question.id)) === option.value,
                }
              )}
            >
              <input
                id={`face_${option.value}_${question.id}`}
                type="radio"
                value={option.value}
                {...register(question.id, { required: true })}
                className="sr-only"
              />
              <Faces
                value={option.value}
                selected={Number(watch(question.id)) === option.value}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="hidden md:block ml-8">
        <ThumbsUp className="h-8 w-8 text-slate-500" />
      </div>
    </div>
  </div>
);
