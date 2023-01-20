import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {DependenciesOf, injectComponent} from 'react-obsidian';
import {ApplicationGraph} from './src/di/ApplicationGraph';
import {Alert} from './src/alerts/alert';
import {Emoji} from './src/views/emoji';
import {DrawingView} from './src/drawing/drawingView';
import {Header} from './src/header/header';
import {Footer} from './src/views/footer';
import {Confetti} from './src/views/confetti';

type Injected = DependenciesOf<ApplicationGraph, 'startGameUseCase' | 'appearance'>;

const App = ({startGameUseCase, appearance}: Injected) => {
  useEffect(() => {
    startGameUseCase.start();
  }, [startGameUseCase]);

  return (
    <View style={{backgroundColor: appearance.backgroundColor}}>
      <StatusBar barStyle={appearance.statusBarStyle} />
      <SafeAreaView>
        <View>
          <Emoji />
          <DrawingView />
          <Header />
          <Confetti />
          <Alert />
          <Footer />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default injectComponent(App, ApplicationGraph);
