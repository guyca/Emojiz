import {
  PaintStyle,
  Skia,
  SkiaView,
  SkPath,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Dimensions, View, Button, Text} from 'react-native';
import recognizer from '../recognizer/recognizer';
import {Stroke} from './stroke';

const window = Dimensions.get('window');

const textPaint = Skia.Paint();
textPaint.setStyle(PaintStyle.Stroke);
textPaint.setStrokeWidth(1);
textPaint.setColor(Skia.Color('black'));

export const DrawingView: React.FC<any> = () => {
  const [pathToDraw, setPathToDraw] = useState<SkPath>(Skia.Path.Make());
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke>(new Stroke());

  const onDrawingStart = useCallback(
    ({x, y, timestamp}: TouchInfo) => {
      currentStroke.addPoint(x, y, timestamp);
      pathToDraw.moveTo(x, y);
    },
    [currentStroke, pathToDraw],
  );

  const onDrawingActive = useCallback(
    ({x, y, timestamp}: TouchInfo) => {
      pathToDraw.lineTo(x, y);
      currentStroke!.addPoint(x, y, timestamp);
    },
    [pathToDraw, currentStroke],
  );

  const onDrawingFinished = useCallback(
    ({x, y, timestamp}: TouchInfo) => {
      pathToDraw.lineTo(x, y);
      currentStroke.addPoint(x, y, timestamp);
      strokes.push(currentStroke);
      setCurrentStroke(new Stroke());
    },
    [pathToDraw, currentStroke, strokes],
  );

  const touchHandler = useTouchHandler({
    onStart: onDrawingStart,
    onActive: onDrawingActive,
    onEnd: onDrawingFinished,
  });

  const onDraw = useDrawCallback(
    (canvas, info) => {
      touchHandler(info.touches);
      canvas.drawPath(pathToDraw, textPaint);
    },
    [pathToDraw],
  );

  const onDonePressed = useCallback(() => {
    recognizer.recognize(strokes);
  }, [strokes]);

  const onClearPressed = useCallback(() => {
    setCurrentStroke(new Stroke());
    setStrokes([]);
    setPathToDraw(Skia.Path.Make());
  }, []);

  const renderClearButton = () => {
    return (
      <View style={styles.clearButton}>
        <Button title="Clear" onPress={onClearPressed} />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Button title="Done!" onPress={onDonePressed} />
      </View>
    );
  };

  const renderEmojiView = () => {
    return (
      <View style={styles.emojiContainer}>
        <Text style={styles.emojiView}>😂</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderEmojiView()}
      <SkiaView style={styles.stroke} onDraw={onDraw} />
      {renderClearButton()}
      {renderDoneButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  doneButton: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
  },
  clearButton: {
    position: 'absolute',
    width: '100%',
    top: 0,
    paddingEnd: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});
