import {
  PaintStyle,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
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
  const touchHandler = useTouchHandler(
    {
      onStart: (touchInfo: TouchInfo) => canvas.onDrawingStart(touchInfo),
      onActive: (touchInfo: TouchInfo) => canvas.onDrawingActive(touchInfo),
      onEnd: (touchInfo: TouchInfo) => canvas.onDrawingFinished(touchInfo),
    },
    [],
  );

  const onDraw = useDrawCallback((skiaCanvas, info) => {
    touchHandler(info.touches);
    skiaCanvas.drawPath(canvas.pathToDraw, textPaint);
  }, []);

  return <SkiaView style={styles.skiaView} onDraw={onDraw} />;
});

const styles = StyleSheet.create({
  skiaView: {
    width: window.width,
    height: '100%',
  },
});
