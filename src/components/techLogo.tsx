import React from "react";
import { TechIcons } from "../icons/tech";

interface TechLogoProps {
  name: keyof typeof TechIcons;
  size?: number;
  className?: string;
  fill?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({
  name,
  size = 40,
  className,
  fill,
}) => {
  const Icon = TechIcons[name];

  if (!Icon) return null;

  // Se for Simple Icon
  if ("hex" in Icon && "path" in Icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill ?? `#${Icon.hex}`} d={Icon.path} />
      </svg>
    );
  }

  // Se for Lucide (React component)
  const LucideIcon = Icon as React.FC<React.SVGProps<SVGSVGElement>>;
  return <LucideIcon className={className} width={size} height={size} />;
};