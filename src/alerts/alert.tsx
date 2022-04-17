import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  description?: string;
  ctaText?: string;
  cta?: () => void;
  image?: {
    source: string;
    speed?: number;
    loop?: boolean;
  };
}

export const Alert = ({title, description, image, ctaText, cta}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {image && <AnimatedLottieView style={styles.image} autoPlay {...image} />}
        {ctaText && <Button title={ctaText} onPress={cta} />}
      </View>
    </View>
  );
};

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
