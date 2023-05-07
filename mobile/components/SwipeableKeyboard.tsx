import React, { useRef } from 'react';
import { Keyboard, PanResponder, View, ViewProps } from 'react-native';

const SwipeableKeyboard: React.FC<ViewProps> = ({ children, ...rest }) => {
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderRelease: (evt, gestureState) => {
        // If the user swipes down by more than 50 pixels, dismiss the keyboard
        if (gestureState.dy > 50) {
          Keyboard.dismiss();
        }
      },
    })
  ).current;

  return (
    <View {...rest} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default SwipeableKeyboard;
