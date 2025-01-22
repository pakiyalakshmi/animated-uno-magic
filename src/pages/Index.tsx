import { useState, useEffect } from "react";
import { Card, GameState } from "@/types/uno";
import { UnoCard } from "@/components/UnoCard";
import { dealInitialCards, isValidPlay, computerPlay } from "@/utils/gameUtils";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    ...dealInitialCards(),
    currentPlayer: "player",
    gameStatus: "playing",
  });

  const handleCardPlay = (card: Card) => {
    if (gameState.currentPlayer !== "player" || gameState.gameStatus !== "playing") return;

    const topCard = gameState.discardPile[gameState.discardPile.length - 1];
    if (!isValidPlay(card, topCard)) {
      toast({
        title: "Invalid move!",
        description: "The card must match the color or number of the top card.",
        variant: "destructive",
      });
      return;
    }

    const newPlayerHand = gameState.playerHand.filter((c) => c.id !== card.id);
    setGameState((prev) => ({
      ...prev,
      playerHand: newPlayerHand,
      discardPile: [...prev.discardPile, card],
      currentPlayer: "computer",
    }));
  };

  useEffect(() => {
    if (gameState.currentPlayer === "computer" && gameState.gameStatus === "playing") {
      const timer = setTimeout(() => {
        const topCard = gameState.discardPile[gameState.discardPile.length - 1];
        const computerCard = computerPlay(gameState.computerHand, topCard);

        if (computerCard) {
          const newComputerHand = gameState.computerHand.filter(
            (c) => c.id !== computerCard.id
          );
          setGameState((prev) => ({
            ...prev,
            computerHand: newComputerHand,
            discardPile: [...prev.discardPile, computerCard],
            currentPlayer: "player",
          }));
        } else {
          toast({
            title: "Computer skips turn",
            description: "The computer has no valid cards to play.",
          });
          setGameState((prev) => ({ ...prev, currentPlayer: "player" }));
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer]);

  useEffect(() => {
    if (gameState.playerHand.length === 0) {
      setGameState((prev) => ({ ...prev, gameStatus: "victory" }));
    } else if (gameState.computerHand.length === 0) {
      setGameState((prev) => ({ ...prev, gameStatus: "defeat" }));
    }
  }, [gameState.playerHand.length, gameState.computerHand.length]);

  return (
    <div className="min-h-screen bg-uno-background p-8">
      {/* Computer's hand */}
      <div className="flex justify-center gap-4 mb-16">
        {gameState.computerHand.map((_, index) => (
          <div
            key={index}
            className="w-24 h-36 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg"
          />
        ))}
      </div>

      {/* Discard pile */}
      <div className="flex justify-center mb-16">
        <UnoCard
          card={gameState.discardPile[gameState.discardPile.length - 1]}
          isPlayable={false}
        />
      </div>

      {/* Player's hand */}
      <div className="flex justify-center gap-4">
        {gameState.playerHand.map((card, index) => (
          <UnoCard
            key={card.id}
            card={card}
            index={index}
            onClick={() => handleCardPlay(card)}
            isPlayable={
              gameState.currentPlayer === "player" &&
              gameState.gameStatus === "playing" &&
              isValidPlay(
                card,
                gameState.discardPile[gameState.discardPile.length - 1]
              )
            }
          />
        ))}
      </div>

      {/* Game status */}
      {gameState.gameStatus !== "playing" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-8 rounded-xl text-center">
            <h2 className="text-4xl font-bold mb-4">
              {gameState.gameStatus === "victory" ? "You Win! 🎉" : "Game Over"}
            </h2>
            <button
              className="bg-uno-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() =>
                setGameState({
                  ...dealInitialCards(),
                  currentPlayer: "player",
                  gameStatus: "playing",
                })
              }
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;