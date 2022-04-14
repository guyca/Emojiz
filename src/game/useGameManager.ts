import {useCallback, useState} from 'react';
import {Stroke} from '../drawing/stroke';
import gameManager from './gameManager';
import {RoundResult} from './roundResult';

interface GameManager {
  lives: string;
  recognizedEmoji: string | undefined;
  emojiToRecognize: string | undefined;
  onDonePressed: () => void;
  onGetStartedPressed: () => void;
  onPlayNextRoundPressed: () => void;
  showWelcome: boolean;
  showConfetti: boolean;
  showDoneButton: boolean;
  showPlayNextRoundButton: boolean;
  showRoundResult: boolean;
  roundResult: RoundResult | undefined;
  isGameWon: boolean;
  isGameLost: boolean;
}

export const useGameManager = (strokes: Stroke[], clear: () => void): GameManager => {
  const [lives, setLives] = useState(gameManager.lives);
  const [recognizedEmoji, setRecognizedEmoji] = useState<string | undefined>();
  const [showWelcome, setShowWelcome] = useState(gameManager.shouldShowWelcome);
  const [emojiToRecognize, setEmojiToRecognize] = useState<string | undefined>();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const [showPlayNextRoundButton, setShowPlayNextRoundButton] = useState(false);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResult | undefined>();
  const [isGameWon, setIsGameWon] = useState(gameManager.isGameWon);
  const [isGameLost, setIsGameLost] = useState(gameManager.isGameLost);

  const onDonePressed = useCallback(async () => {
    const result = await gameManager.recognize(strokes);
    setLives(result.lives);
    setRecognizedEmoji(result.recognizedEmoji);
    setShowConfetti(gameManager.shouldShowConfetti);
    setShowDoneButton(gameManager.shouldShowDoneButton);
    setShowPlayNextRoundButton(gameManager.shouldShowPlayNextRoundButton);
    setShowRoundResult(gameManager.shouldShowRoundResult);
    setRoundResult(result.roundResult);
    setIsGameWon(gameManager.isGameWon);
    setIsGameLost(gameManager.isGameLost);
  }, [strokes]);

  const onGetStartedPressed = useCallback(() => {
    gameManager.startNextRound();
    setShowWelcome(gameManager.shouldShowWelcome);
    setEmojiToRecognize(gameManager.emojiForCurrentLevel);
    setShowDoneButton(gameManager.shouldShowDoneButton);
  }, []);

  const onPlayNextRoundPressed = useCallback(() => {
    gameManager.startNextRound();
    setEmojiToRecognize(gameManager.emojiForCurrentLevel);
    setRecognizedEmoji(undefined);
    setShowDoneButton(gameManager.shouldShowDoneButton);
    setShowPlayNextRoundButton(gameManager.shouldShowPlayNextRoundButton);
    setShowConfetti(gameManager.shouldShowConfetti);
    setShowRoundResult(gameManager.shouldShowRoundResult);
    clear();
  }, [clear]);

  return {
    lives,
    recognizedEmoji,
    emojiToRecognize,
    onDonePressed,
    onPlayNextRoundPressed,
    showWelcome,
    showConfetti,
    onGetStartedPressed,
    showDoneButton,
    showPlayNextRoundButton,
    showRoundResult,
    roundResult,
    isGameWon,
    isGameLost,
  };
};
