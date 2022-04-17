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
  canvas: Canvas;
}

export const DrawingView = observer(({canvas}: Props) => {
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

  return (
    <View>
      <SkiaView style={styles.skiaView} onDraw={onDraw} />
    </View>
  );
});

const styles = StyleSheet.create({
  skiaView: {
    width: window.width,
    height: '100%',
  },
});
