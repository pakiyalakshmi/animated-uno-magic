import { Card } from "@/types/uno";
import { cn } from "@/lib/utils";

interface UnoCardProps {
  card: Card;
  index?: number;
  onClick?: () => void;
  isPlayable?: boolean;
  className?: string;
}

export const UnoCard = ({
  card,
  index = 0,
  onClick,
  isPlayable = true,
  className,
}: UnoCardProps) => {
  const colorMap = {
    red: "bg-uno-red",
    blue: "bg-uno-blue",
    green: "bg-uno-green",
    yellow: "bg-uno-yellow",
  };

  return (
    <div
      className={cn(
        "relative w-24 h-36 rounded-xl shadow-lg cursor-pointer transition-all duration-300 animate-card-deal",
        colorMap[card.color],
        isPlayable && "hover:scale-110 hover:-translate-y-4",
        !isPlayable && "opacity-75 cursor-not-allowed",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={() => isPlayable && onClick?.()}
    >
      <div className="absolute inset-2 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{card.number}</span>
      </div>
    </div>
  );
};