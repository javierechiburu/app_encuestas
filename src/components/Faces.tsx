import { cn } from "@/config/clsx/clsxMerge";

export const Faces = ({
  value,
  selected,
}: {
  value: number;
  selected: boolean;
}) => {
  const baseClasses = "w-8 h-8 md:w-16 md:h-16 transition-all duration-300";
  const getFaceSvg = () => {
    switch (value) {
      case 1:
        return (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#ED1C24" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <path
              d="M20 44 C 28 34, 36 34, 44 44"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      case 2:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#F26522" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <path
              d="M22 40 C 28 35, 36 35, 42 40"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      case 3:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#F7941D" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <path
              d="M24 40 C 28 35, 36 35, 40 40"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      case 4:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#FFF200" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <line
              x1="24"
              y1="40"
              x2="40"
              y2="40"
              stroke="#000000"
              strokeWidth="3"
            />
          </svg>
        );
      case 5:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#8CC63F" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <path
              d="M24 40 C 28 43, 36 43, 40 40"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      case 6:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#39B54A" />

            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />

            <path
              d="M22 40 C 28 45, 36 45, 42 40"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      case 7:
        return (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className={cn(baseClasses, {
              "scale-150": selected,
            })}
          >
            <circle cx="32" cy="32" r="30" fill="#00A651" />
            <circle cx="24" cy="24" r="3" fill="#000000" />
            <circle cx="40" cy="24" r="3" fill="#000000" />
            <path
              d="M20 38 C 28 50, 36 50, 44 38"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return getFaceSvg();
};

export const Square = ({ text, color }: { text: string; color: string }) => {
  return (
    <div
      className={cn("relative w-full h-8 md:w-20 md:h-6 2xl:w-28 ", color)}
      style={{ backgroundColor: color }}
    >
      <span className="absolute z-10 -top-5 right-0 text-gray-700 text-sm">
        {text}
      </span>
    </div>
  );
};
