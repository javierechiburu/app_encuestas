import { cn } from "@/config/clsx/clsxMerge";
import { CheckCircle, XCircle } from "lucide-react";
import type { QuestionFormProps } from "@/types/types";

export const RadioToggle = ({
  register,
  watch,
  question,
  setValue,
}: QuestionFormProps) => {
  const currentValue = watch(question.id);

  const handleChange = (value: "si" | "no") => {
    setValue?.(question.id, value);
  };

  return (
    <div className="w-full max-w-sm md:max-w-max mx-auto px-4 md:px-0 mt-0 md:mt-8 2xl:pt-16 mb-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="hidden"
          {...register(question.id, { required: true })}
          value={currentValue || ""}
        />

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <button
            type="button"
            onClick={() => handleChange("si")}
            className={cn(
              "cursor-pointer flex-1 md:flex-none flex items-center gap-4 md:gap-2 px-14 py-3 rounded-full transition-all",
              "border-2 border-slate-200 hover:border-slate-300",
              currentValue === "si"
                ? "bg-emerald-500 border-emerald-600 hover:bg-emerald-600 text-white"
                : "bg-white text-slate-600"
            )}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Sí</span>
          </button>

          <button
            type="button"
            onClick={() => handleChange("no")}
            className={cn(
              "cursor-pointer flex-1 md:flex-none flex items-center gap-4 md:gap-2 px-14 py-3 rounded-full transition-all",
              "border-2 border-slate-200 hover:border-slate-300",
              currentValue === "no"
                ? "bg-rose-500 border-rose-600 hover:bg-rose-600 text-white"
                : "bg-white text-slate-600"
            )}
          >
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};
