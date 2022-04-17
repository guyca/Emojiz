import {
  PaintStyle,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Text, Animated} from 'react-native';
import {Game} from '../game/game';
import {Canvas} from './canvas';

const window = Dimensions.get('window');

const textPaint = Skia.Paint();
textPaint.setStyle(PaintStyle.Stroke);
textPaint.setStrokeWidth(4);
textPaint.setColor(Skia.Color('black'));

interface Props {
  game: Game;
  canvas: Canvas;
}

export const DrawingView = observer(({game, canvas}: Props) => {
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
      canvas.onDrawingStart(touchInfo);
    },
    [canvas],
  );

  const onDrawingActive = useCallback(
    (touchInfo: TouchInfo) => {
      canvas.onDrawingActive(touchInfo);
    },
    [canvas],
  );

  const onDrawingFinished = useCallback(
    (touchInfo: TouchInfo) => {
      canvas.onDrawingFinished(touchInfo);
    },
    [canvas],
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
    (skiaCanvas, info) => {
      touchHandler(info.touches);
      skiaCanvas.drawPath(canvas.pathToDraw, textPaint);
    },
    [canvas.strokes],
  );

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

  return (
    <View style={styles.container}>
      {renderEmoji()}
      <SkiaView style={styles.stroke} onDraw={onDraw} />
      {renderRoundResult()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
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
  roundResult: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});
