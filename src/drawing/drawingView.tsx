import {
  PaintStyle,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import AnimatedLottieView from 'lottie-react-native';
import {action} from 'mobx';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Button, Text, Platform, Animated} from 'react-native';
import {Game} from '../game/game';
import {Canvas} from './canvas';

const window = Dimensions.get('window');

const textPaint = Skia.Paint();
textPaint.setStyle(PaintStyle.Stroke);
textPaint.setStrokeWidth(4);
textPaint.setColor(Skia.Color('black'));

interface Props {
  game: Game;
  drawing: Canvas;
}

export const DrawingView = observer(({game, drawing}: Props) => {
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (game.emojiToRecognize) {
      fadeAnimation.setValue(1);
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [game.emojiToRecognize, fadeAnimation]);

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      drawing.onDrawingStart(touchInfo);
    },
    [drawing],
  );

  const onDrawingActive = useCallback(
    (touchInfo: TouchInfo) => {
      drawing.onDrawingActive(touchInfo);
    },
    [drawing],
  );

  const onDrawingFinished = useCallback(
    (touchInfo: TouchInfo) => {
      drawing.onDrawingFinished(touchInfo);
    },
    [drawing],
  );

  const touchHandler = useTouchHandler(
    {
      onStart: onDrawingStart,
      onActive: onDrawingActive,
      onEnd: onDrawingFinished,
    },
    [],
  );

  const onDraw = useDrawCallback(
    (canvas, info) => {
      touchHandler(info.touches);
      canvas.drawPath(drawing.pathToDraw, textPaint);
    },
    [drawing.strokes],
  );

  const renderDoneButton = () => {
    return (
      game.showDoneButton && (
        <View style={styles.cta}>
          <Button title={'Done!'} onPress={action(() => game.recognize(drawing.strokes))} />
        </View>
      )
    );
  };

  const renderPLayNextRoundButton = () => {
    return (
      game.showPlayNextRoundButton && (
        <View style={styles.cta}>
          <Button title={'Play Next Round'} onPress={game.startNextRound} />
        </View>
      )
    );
  };

  const renderRoundResult = () => {
    return (
      game.showRoundResult && (
        <Text style={[styles.roundResult, {color: game.roundResult?.color}]}>
          {game.roundResult?.text}
        </Text>
      )
    );
  };

  const renderEmoji = () => {
    return game.recognizedEmoji ? (
      <View style={styles.emojiContainer}>
        <Text style={styles.emojiView}>{game.recognizedEmoji}</Text>
      </View>
    ) : (
      <Animated.View style={[styles.emojiContainer, {opacity: fadeAnimation}]}>
        <Text style={styles.emojiView}>{game.emojiToRecognize}</Text>
      </Animated.View>
    );
  };

  const renderWelcome = () => {
    return (
      game.showWelcome && (
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeBackground}>
            <Text style={styles.welcomeTitle}>Welcome to Emojiz!</Text>
            <Text style={styles.welcomeDescription}>
              {
                "Emojiz is a memory game. Each round an emoji will appear briefly on the screen. Draw it from your memory.\n\nIf your drawing was accurate you'll advance to the next round."
              }
            </Text>
            <Button title="Get Started!" onPress={game.startNextRound} />
          </View>
        </View>
      )
    );
  };

  const renderConfetti = () => {
    return (
      game.showConfetti && (
        <AnimatedLottieView
          style={styles.confetti}
          source={require('../res/confetti.json')}
          autoPlay
          loop={false}
        />
      )
    );
  };

  const renderGameWon = () => {
    return (
      game.isGameWon && (
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeBackground}>
            <Text style={[styles.welcomeTitle, {marginBottom: 0}]}>Game Won!</Text>
            <AnimatedLottieView
              style={{width: '100%'}}
              source={require('../res/gameWon.json')}
              autoPlay
              loop={false}
              speed={0.7}
            />
          </View>
        </View>
      )
    );
  };

  const renderGameLost = () => {
    return (
      game.isGameLost && (
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeBackground}>
            <Text style={[styles.welcomeTitle, {marginBottom: 0}]}>Game Over</Text>
            <AnimatedLottieView
              style={{width: '100%'}}
              source={require('../res/crying.json')}
              autoPlay
            />
          </View>
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      {renderEmoji()}
      {renderConfetti()}
      <SkiaView style={styles.stroke} onDraw={onDraw} />
      {renderWelcome()}
      {renderDoneButton()}
      {renderPLayNextRoundButton()}
      {renderRoundResult()}
      {renderGameWon()}
      {renderGameLost()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  lives: {
    flexGrow: 1,
    color: 'black',
    fontSize: 24,
  },
  cta: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
  stroke: {
    width: window.width,
    height: '100%',
  },
  emojiContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiView: {
    fontSize: 300,
  },
  welcomeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  welcomeBackground: {
    backgroundColor: 'lightgrey',
    padding: 32,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 6, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  welcomeTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 16,
  },
  welcomeDescription: {
    marginBottom: 32,
  },
  confetti: {
    position: 'absolute',
    height: '100%',
  },
  roundResult: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});
