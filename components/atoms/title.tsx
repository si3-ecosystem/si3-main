import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
  variant?: "large" | "medium" | "sm";
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
}

export const Title = ({
  variant = "medium",
  as: Tag = "h2",
  children,
  className,
}: TitleProps) => {
  const variantStyles = {
    large: " [font-size:clamp(2.5rem,2.5rem+0.43vw,4rem)]",
    medium: " [font-size:clamp(2rem,2rem+0.07vw,2.25rem)]",
    sm: "[font-size:clamp(1.75rem,1.75rem+0.07vw,2rem)] font-semibold",
  };

  return (
    <Tag
      className={cn(
        "font-clesmont leading-normal font-normal uppercase",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
};
