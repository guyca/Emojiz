import {Appearance as AppearanceReactNative} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export class Appearance {
  public get backgroundColor(): string {
    return this.isDarkMode() ? Colors.darker : Colors.lighter;
  }

  public get statusBarStyle(): 'dark-content' | 'light-content' {
    return this.isDarkMode() ? 'light-content' : 'dark-content';
  }

  private isDarkMode(): boolean {
    return AppearanceReactNative.getColorScheme() === 'dark';
  }
}
