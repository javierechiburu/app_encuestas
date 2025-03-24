// components/survey/RangeQuestion.tsx
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FormValues, Question } from "@/types/types";

type Props = {
  question: Question;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors;
};

export const Textarea = ({ question, register }: Props) => (
  <textarea
    {...register(question.id, { required: true })}
    className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    rows={4}
    placeholder="Escribe tu respuesta aquí..."
  />
);
