import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

const TouchableWithoutFeedbackAnimation = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
);

const ScaleButton = ({
    children,
    style,
    scaleSize = 0.8,
    ...rest
}: TouchableWithoutFeedbackProps) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        scale.stopAnimation(() => {
            Animated.spring(scale, {
                toValue: scaleSize,
                useNativeDriver: true,
                friction: 1000,
            }).start();
        });
    };
    const onPressOut = () => {
        scale.stopAnimation(() => {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                friction: 1000,
            }).start();
        });
    };
    return (
        <TouchableWithoutFeedbackAnimation
            style={{ transform: [{ scale }] }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            {...rest}>
            {children}
        </TouchableWithoutFeedbackAnimation>
    );
};

export default React.memo(ScaleButton);
