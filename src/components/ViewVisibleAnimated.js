import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
import { memoWithRef } from '../utils/FunctionUtils';

export type ViewVisibleAnimatedProps = {
    scaleEnable?: Boolean,
    autoHide?: Boolean,
    onShowDone?: void,
    onDone?: void,
    onShowStart?: void,
    style?: StyleProp<ViewStyle>,
    delay?: Number,
    duration?: Number,
    timeout?: Number,
    autoShow?: Boolean,
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
    scaleType?: 'in' | 'out',
    renderHiddenContent?: any,
};

const ViewVisibleAnimated = memoWithRef(
    (
        {
            onShowStart,
            onShowDone,
            onDone,
            style,
            children,
            autoHide,
            scaleEnable,
            delay = 100,
            duration = 250,
            timeout = 3000,
            autoShow = true,
            pointerEvents = 'auto',
            scaleType = 'in',
            renderHiddenContent = null,
        }: ViewVisibleAnimatedProps,
        ref,
    ) => {
        useImperativeHandle(ref, () => ({
            hide,
            show,
        }));
        const visibleAnimation = useRef(new Animated.Value(0)).current;
        const scaleAnimation = useRef(new Animated.Value(scaleType === 'in' ? 0 : 3)).current;
        const [visible, setVisible] = useState(false);
        let TIME_OUT;

        useEffect(() => {
            if (autoShow) {
                TIME_OUT = setTimeout(() => {
                    show();
                }, delay);
            }
            return () => {
                TIME_OUT && clearTimeout(TIME_OUT);
            };
        }, []);

        const show = (callback, isDelay) => {
            TIME_OUT = setTimeout(
                () => {
                    onShowStart?.();
                    showAnimation(callback);
                },
                isDelay ? delay : 0,
            );
        };

        const showAnimation = (callback) => {
            setVisible(true);
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: true,
            }).start();
            Animated.timing(visibleAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: true,
            }).start(() => {
                callback?.();
                onShowDone?.();
                if (autoHide) {
                    TIME_OUT = setTimeout(() => {
                        hide(onDone);
                    }, timeout);
                }
            });
        };

        const hide = (callback, hideDuration) => {
            Animated.timing(scaleAnimation, {
                toValue: scaleType === 'in' ? 0 : 3,
                duration: hideDuration || duration,
                useNativeDriver: true,
            }).start();
            Animated.timing(visibleAnimation, {
                toValue: 0,
                duration: hideDuration || duration,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                callback?.();
            });
        };

        return (
            <Animated.View
                style={[
                    style,
                    {
                        opacity: visibleAnimation,
                        transform: [{ scale: scaleEnable ? scaleAnimation : 1 }],
                    },
                ]}
                pointerEvents={visible ? pointerEvents : 'none'}>
                {visible ? children : renderHiddenContent}
            </Animated.View>
        );
    },
);

export default ViewVisibleAnimated;
