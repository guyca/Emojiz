type BaseImageProps = Pick<AnimatedLottieViewProps, 'source' | 'speed' | 'loop'>;
type ImageProps = Optional<BaseImageProps, 'speed' | 'loop'>;

export type Alert = {
  title: string;
  description?: string;
  cta?: {
    text: string;
    onPress?: () => void;
  };
  image?: ImageProps;
};
