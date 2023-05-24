import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import {Colors} from '../assets/styles';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = props => {
  const {style, textStyle, title, color, isLoading, disabled, onPress} = props;
  return (
    <View
      style={[
        styles.button,
        {
          backgroundColor: color || Colors.blue,
          opacity: disabled ? 0.5 : 1.0,
        },
        style || {},
      ]}>
      <TouchableOpacity disabled={disabled || isLoading} onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.title, textStyle || {}]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
  },
});
