import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
import { memoWithRef } from '../utils/FunctionUtils';

export type ViewVisibleAnimatedProps = {
    scaleEnable?: Boolean,
    translateEnable?: Boolean,
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
            translateEnable,
            delay = 100,
            duration = 250,
            timeout = 3000,
            autoShow = true,
            pointerEvents = 'auto',
            scaleType = 'in',
            renderHiddenContent = null,
            disableHiddenContent = false,
        }: ViewVisibleAnimatedProps,
        ref,
    ) => {
        useImperativeHandle(ref, () => ({
            hide,
            show,
        }));
        const visibleAnimation = useRef(new Animated.Value(0)).current;
        const translateAnimation = useRef(new Animated.Value(0)).current;
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

        const show = (callback, durationShow = delay) => {
            if (typeof callback === 'object') {
                const {
                    callback: callbackDefault,
                    duration: durationShowDefault,
                    position,
                } = callback;
                handleShow({
                    callback: callbackDefault,
                    durationShow: durationShowDefault,
                    position,
                });
                return;
            }
            handleShow({ callback, durationShow });
        };

        const handleShow = ({ callback, durationShow, position }) => {
            TIME_OUT && clearTimeout(TIME_OUT);
            TIME_OUT = setTimeout(() => {
                onShowStart?.();
                showAnimation(callback, position);
            }, durationShow);
        };

        const showAnimation = (callback, position = 'bottom') => {
            setVisible(true);
            translateAnimation.setValue(position === 'bottom' ? 100 : -100);
            Animated.parallel([
                Animated.timing(scaleAnimation, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(visibleAnimation, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnimation, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                callback?.();
                onShowDone?.();
                if (autoHide) {
                    TIME_OUT && clearTimeout(TIME_OUT);
                    TIME_OUT = setTimeout(() => {
                        hide(onDone);
                    }, timeout);
                }
            });
        };

        const hide = (callback, durationHide = duration) => {
            if (typeof callback === 'object') {
                const {
                    callback: callbackDefault,
                    duration: durationShowDefault,
                    position,
                } = callback;
                handleHide({
                    callback: callbackDefault,
                    durationShow: durationShowDefault,
                    position,
                });
                return;
            }
            handleHide({
                callback,
                durationHide,
            });
        };

        const handleHide = ({ durationHide, callback, position }) => {
            Animated.parallel([
                Animated.timing(scaleAnimation, {
                    toValue: scaleType === 'in' ? 0 : 3,
                    duration: durationHide,
                    useNativeDriver: true,
                }),
                Animated.timing(visibleAnimation, {
                    toValue: 0,
                    duration: durationHide,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnimation, {
                    toValue: position === 'bottom' ? 100 : -100,
                    duration,
                    useNativeDriver: true,
                }),
            ]).start(() => {
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
                        transform: [
                            { scale: scaleEnable ? scaleAnimation : 1 },
                            {
                                translateY: translateEnable ? translateAnimation : 0,
                            },
                        ],
                    },
                ]}
                pointerEvents={visible ? pointerEvents : 'none'}>
                {disableHiddenContent ? children : visible ? children : renderHiddenContent}
            </Animated.View>
        );
    },
);

export default ViewVisibleAnimated;
