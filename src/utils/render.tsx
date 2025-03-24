import { RadioFace } from "@/components/campos/RadioFaces";
import { RadioRange } from "@/components/campos/RadioRange";
import { RadioToggle } from "@/components/campos/RadioToggle";
import { Textarea } from "@/components/campos/Textarea";
import { QuestionFormProps } from "@/types/types";

export const renderQuestion = ({
  question,
  register,
  watch,
  errors,
  setValue,
  index,
  current,
}: QuestionFormProps) => {
  const commonProps = {
    question,
    register,
    watch,
    errors,
    name: question.id,
    setValue,
    required: true,
    index,
    current,
  };
  switch (question.type) {
    case "toggle":
      return <RadioToggle {...commonProps} />;
    case "textarea":
      return <Textarea {...commonProps} />;
    case "faces":
      return <RadioFace {...commonProps} />;
    case "range":
      return <RadioRange {...commonProps} />;
    default:
      return null;
  }
};
