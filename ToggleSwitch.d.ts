import React from 'react';

export type ToggleSwitchProps = {
  isOn: boolean;
  onColor?: string;
  offColor?: string;
  onText?: string;
  offText?: string;
  size?: string;
  thumbOnStyle?: object | number;
  thumbOffStyle?: object | number;
  trackOnStyle?: object | number;
  trackOffStyle?: object | number;
  textStyle?: object | number;
  textOnStyle?: object | number;
  textOffStyle?: object | number;
  offOpacity?: number;
  onToggle?: (isOn: boolean) => any;
  icon?: object;
  disabled?: boolean;
  animationSpeed?: number;
  useNativeDriver?: boolean;
  circleColor?: string;
}

declare const ToggleSwitch: React.ComponentType<ToggleSwitchProps>;

export default ToggleSwitch;
