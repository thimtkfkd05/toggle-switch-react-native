/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  I18nManager,
} from "react-native";

import PropTypes from "prop-types";

export default class ToggleSwitch extends React.Component {
  static calculateDimensions(size) {
    switch (size) {
      case "small":
        return {
          width: 40,
          padding: 10,
          circleWidth: 15,
          circleHeight: 15,
          translateX: 22,
        };
      case "large":
        return {
          width: 70,
          padding: 20,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 38,
        };
      default:
        return {
          width: 46,
          padding: 12,
          circleWidth: 18,
          circleHeight: 18,
          translateX: 26,
        };
    }
  }

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    onText: PropTypes.string,
    offText: PropTypes.string,
    size: PropTypes.string,
    thumbOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    thumbOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    offOpacity: PropTypes.number,
    onToggle: PropTypes.func,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    animationSpeed: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    circleColor: PropTypes.string,
  };

  static defaultProps = {
    isOn: false,
    onColor: "#4cd137",
    offColor: "#ecf0f1",
    size: "medium",
    thumbOnStyle: {},
    thumbOffStyle: {},
    trackOnStyle: {},
    trackOffStyle: {},
    textStyle: {},
    textOnStyle: {},
    textOffStyle: {},
    offOpacity: 0.5,
    icon: null,
    disabled: false,
    animationSpeed: 300,
    useNativeDriver: true,
    circleColor: "white",
  };

  offsetX = new Animated.Value(0);
  opacity = new Animated.Value(this.props.offOpacity);
  dimensions = ToggleSwitch.calculateDimensions(this.props.size);
  width = this.dimensions.width  + (this.props.onText || this.props.offText ? 8 : 0);

  createToggleSwitchStyle = () => [
    {
      justifyContent: "center",
      width: this.width,
      borderRadius: 20,
      padding: this.dimensions.padding,
      backgroundColor: this.props.isOn
        ? this.props.onColor
        : this.props.offColor,
    },
    this.props.isOn ? this.props.trackOnStyle : this.props.trackOffStyle,
  ];

  createInsideCircleStyle = () => [
    {
      alignItems: "center",
      justifyContent: "center",
      margin: Platform.OS === "web" ? 0 : 4,
      left: Platform.OS === "web" ? 4 : 0,
      position: "absolute",
      backgroundColor: this.props.circleColor,
      transform: [{ translateX: this.offsetX }],
      width: this.dimensions.circleWidth,
      height: this.dimensions.circleHeight,
      borderRadius: this.dimensions.circleWidth / 2,
      elevation: this.dimensions.circleWidth,
    },
    this.props.isOn ? this.props.thumbOnStyle : this.props.thumbOffStyle,
  ];

  render() {
    const {
      animationSpeed,
      useNativeDriver,
      isOn,
      onToggle,
      disabled,
      onText,
      offText,
      textStyle,
      textOnStyle,
      textOffStyle,
      offOpacity,
      icon,
    } = this.props;
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    let toValue;
    if (!I18nManager.isRTL && isOn) {
      toValue = this.width - this.dimensions.translateX;
    } else if (I18nManager.isRTL && isOn) {
      toValue = -this.width + this.dimensions.translateX;
    } else {
      toValue = -1;
    }

    Animated.parallel([
      Animated.timing(this.offsetX, {
        toValue,
        duration: animationSpeed,
        useNativeDriver: useNativeDriver,
      }),
      Animated.timing(this.opacity, {
        toValue: isOn ? 1 : offOpacity,
        duration: animationSpeed,
        useNativeDriver: useNativeDriver,
      }),
    ]).start();

    return (
      <View style={styles.container} {...this.props}>
        <AnimatedTouchableOpacity
          style={this.createToggleSwitchStyle()}
          opacity={this.opacity}
          activeOpacity={0.8}
          disabled={disabled}
          onPress={() => (disabled ? null : onToggle(!isOn))}
        >
          <Animated.View style={this.createInsideCircleStyle()}>
            {icon}
          </Animated.View>
          {onText || offText ? (
            <Text style={[
              { width: this.width },
              styles.textStyle,
              textStyle,
              isOn ? [styles.textOn, textOnStyle] : [styles.textOff, textOffStyle],
            ]}>{isOn ? (onText || "") : (offText || "")}</Text>
          ) : null}
        </AnimatedTouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    position: "absolute",
    height: 12,
    fontSize: 12,
    lineHeight: 12,
  },
  textOn: {
    left: 10,
  },
  textOff: {
    right: -26,
  },
});
