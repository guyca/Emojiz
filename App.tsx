import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DrawingView} from './src/drawing/drawingView';
import {Game} from './src/game/game';

const App = () => {
  const [game] = useState(new Game());
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView>
        <DrawingView game={game} />
      </SafeAreaView>
    </View>
  );
};

export default App;
