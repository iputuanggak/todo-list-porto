import { ComponentProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "filled" | "outline";
  customClassName?: string;
} & ComponentProps<"button">;

export default function Button({
  children,
  variant,
  customClassName,
  ...props
}: ButtonProps) {
  let BackgroundBorderColor;

  switch (variant) {
    case "filled":
      BackgroundBorderColor =
        " border-foreground bg-foreground hover:bg-[#343A40] text-background ";
      break;

    case "outline":
      BackgroundBorderColor =
        " border-foreground hover:bg-[#E9ECEF]";
      break;

    default:
      break;
  }

  return (
    <button
      className={`rounded border px-2 py-1 text-sm ${BackgroundBorderColor} ${customClassName}`}
      {...props}
    >
      {children}
    </button>
  );
}
