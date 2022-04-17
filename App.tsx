import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Canvas as Canvas} from './src/drawing/canvas';
import {DrawingView} from './src/drawing/drawingView';
import {Game} from './src/game/game';
import {Header} from './src/header/header';
import {Confetti} from './src/views/confetti';
import {Welcome} from './src/alerts/welcome';
import {GameLost} from './src/alerts/gameLost';
import {GameWon} from './src/alerts/gameWon';
import {Cta} from './src/views/cta';

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
          <DrawingView game={game} canvas={canvas} />
          <Confetti game={game} />
          <Header game={game} canvas={canvas} />
          <Welcome game={game} />
          <GameLost game={game} />
          <GameWon game={game} />
          <Cta game={game} canvas={canvas} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
