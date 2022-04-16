import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Canvas as Canvas} from './src/drawing/canvas';
import {DrawingView} from './src/drawing/drawingView';
import {Game} from './src/game/game';
import {Header} from './src/header/header';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [canvas] = useState(() => new Canvas());
  const [game] = useState(() => new Game(canvas));

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView>
        <View>
          <DrawingView game={game} drawing={canvas} />
          <Header game={game} drawing={canvas} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
