import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type FormValues = {
  [key: string]: number | string;
};

export type Option = {
  value: number;
  label: string;
};

export type Question = {
  id: string;
  type: "text" | "faces" | "checkbox" | "range" | "textarea" | "toggle";
  label: string;
  description?: string;
};

export type QuestionFormProps = {
  question: Question;
  index: number;
  current: number;
  errors: FieldErrors;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};

export type FormStatus = "inicio" | "preguntas" | "final";
