import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {DependenciesOf, injectComponent, useObserver} from 'react-obsidian';
import {ApplicationGraph} from '../di/ApplicationGraph';

type Injected = DependenciesOf<ApplicationGraph, 'alertPresenter'>;

export const Alert = injectComponent(({alertPresenter}: Injected) => {
  const [alert] = useObserver(alertPresenter.alert);

  return alert ? (
    <View style={styles.container}>
      <View style={styles.background}>
        {alert.title && <Text style={styles.title}>{alert.title}</Text>}
        {alert.description && <Text style={styles.description}>{alert.description}</Text>}
        {alert.image && <AnimatedLottieView style={styles.image} autoPlay {...alert.image} />}
        {alert.cta && <Button title={alert.cta.text} onPress={alert.cta.onPress} />}
      </View>
    </View>
  ) : null;
}, ApplicationGraph);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  background: {
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 16,
  },
  image: {
    width: '100%',
  },
  description: {
    marginBottom: 32,
  },
});
