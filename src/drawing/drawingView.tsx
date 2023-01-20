import {
  PaintStyle,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';
import {Canvas} from './canvas';

const window = Dimensions.get('window');

const textPaint = Skia.Paint();
textPaint.setStyle(PaintStyle.Stroke);
textPaint.setStrokeWidth(4);
textPaint.setColor(Skia.Color('black'));

interface Props {
  canvas: Canvas;
}

export const DrawingView = injectComponent(({canvas}: Props) => {
  const [strokes] = useObserver(canvas.strokes);
  const touchHandler = useTouchHandler(
    {
      onStart: (touchInfo: TouchInfo) => canvas.onDrawingStart(touchInfo),
      onActive: (touchInfo: TouchInfo) => canvas.onDrawingActive(touchInfo),
      onEnd: (touchInfo: TouchInfo) => canvas.onDrawingFinished(touchInfo),
    },
    [],
  );

  const onDraw = useDrawCallback(
    (skiaCanvas, info) => {
      touchHandler(info.touches);
      skiaCanvas.drawPath(canvas.pathToDraw, textPaint);
    },
    [strokes],
  );

  return <SkiaView style={styles.skiaView} onDraw={onDraw} />;
}, ApplicationGraph);

const styles = StyleSheet.create({
  skiaView: {
    width: window.width,
    height: '100%',
  },
});
