import { cn } from "@/config/clsx/clsxMerge";
import { QuestionFormProps } from "@/types/types";

const options = [
  { value: 1, label: "Muy insatisfecho", color: "#ED1C24" },
  { value: 2, label: "Insatisfecho", color: "#F26522" },
  { value: 3, label: "Algo insatisfecho", color: "#F7941D" },
  { value: 4, label: "Neutral", color: "#FFF200" },
  { value: 5, label: "Algo satisfecho", color: "#8CC63F" },
  { value: 6, label: "Satisfecho", color: "#39B54A" },
  { value: 7, label: "Muy satisfecho", color: "#00A651" },
];

export const RadioRange = ({
  question,
  register,
  watch,
}: QuestionFormProps) => (
  <div className="w-full py-8 mb-8">
    <div className="grid grid-cols-5 bg-gradient-to-r from-orange-500 via-yellow-500 to-lime-500 rounded-lg">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative flex items-center justify-center w-full h-16 border-2 cursor-pointer transition-all duration-200",
            "hover:border-gray-500",
            "first:rounded-l-lg last:rounded-r-lg",
            {
              "border-gray-500": Number(watch(question.id)) === option.value,
              "border-gray-300": Number(watch(question.id)) !== option.value,
            }
          )}
        >
          <input
            type="radio"
            value={option.value}
            {...register(question.id.toString(), {
              required: true,
              valueAsNumber: true,
            })}
            className="sr-only"
          />
          <span className="text-lg font-semibold text-gray-800">
            {option.label}%
          </span>
          {watch(question.id.toString()) === option.value && (
            <div className="absolute inset-0 ring-2 ring-blue-200 rounded-lg pointer-events-none" />
          )}
        </label>
      ))}
    </div>
  </div>
);
