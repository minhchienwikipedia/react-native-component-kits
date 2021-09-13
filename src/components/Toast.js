import React, { useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { memoWithRef } from '../utils/FunctionUtils';
import ViewVisibleAnimated from './ViewVisibleAnimated';

const DEVICE_WIDTH = Dimensions.get('screen').width;

const POSITION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

export type ToastProps = {
    translateEnable?: Boolean,
    scaleEnable?: Boolean,
    style?: StyleProp<ViewStyle>,
    extraBottom?: Number,
    extraTop?: Number,
};

const Toast = memoWithRef(
    (
        {
            children,
            translateEnable,
            scaleEnable,
            style,
            extraBottom = 0,
            extraTop = 0,
        }: ToastProps,
        ref,
    ) => {
        const [mess, setMessage] = useState();
        const viewVisibleAnimatedRef = useRef();

        const [options, setOptions] = useState({
            position: POSITION.BOTTOM,
            type: 'success',
            onPress: () => {},
            title: null,
        });

        const TIME_OUT = useRef();

        const show = ({ message, duration = 3000, position, type, onPress, title }) => {
            if (!TIME_OUT.current) {
                handleShow({ message, position, type, onPress, title, duration });
                return;
            }

            clearTimeout(TIME_OUT.current);
            hide({
                callback: () => {
                    handleShow({
                        message,
                        position,
                        type,
                        onPress,
                        title,
                        duration,
                    });
                },
                skipSetMessage: true,
                position,
            });
        };

        useImperativeHandle(
            ref,
            () => ({
                show,
            }),
            [],
        );

        const handleShow = ({ message, position, type, onPress, title, duration }) => {
            setMessage(message);
            setOptions({ position, type, onPress, title });
            viewVisibleAnimatedRef.current?.show?.({
                callback: () => {
                    TIME_OUT.current = setTimeout(() => {
                        hide({ position });
                    }, duration);
                },
                durationShow: 300,
                position,
            });
        };
        const hide = ({ callback, skipSetMessage, position } = {}) => {
            viewVisibleAnimatedRef.current?.hide?.({
                callback: () => {
                    if (!skipSetMessage) {
                        setMessage();
                    }
                    callback?.();
                },
                durationHide: 300,
                position,
            });
        };

        const onPressToast = () => {
            hide({ position: options.position });
            options?.onPress?.();
        };

        const renderDefaultContent = () => {
            return (
                <TouchableOpacity onPress={onPressToast} style={styles.wrapContent}>
                    <Text numberOfLines={4} style={!options.title && styles.wrapMess}>
                        {mess}
                    </Text>
                </TouchableOpacity>
            );
        };

        return (
            <ViewVisibleAnimated
                ref={viewVisibleAnimatedRef}
                autoShow={false}
                translateEnable={translateEnable}
                scaleEnable={scaleEnable}
                style={[
                    styles.container,
                    options.position === POSITION.BOTTOM && {
                        bottom: 16 + extraBottom,
                    },
                    options.position === POSITION.TOP && {
                        top: 16 + extraTop,
                    },
                    style,
                ]}>
                {children
                    ? children({ ...options, message: mess, close: onPressToast })
                    : renderDefaultContent()}
            </ViewVisibleAnimated>
        );
    },
);

export default Toast;

const styles = StyleSheet.create({
    wrapContent: {
        borderRadius: 12,
        padding: 12,
        width: DEVICE_WIDTH - 12 * 2,
        marginHorizontal: 12,
    },
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        width: DEVICE_WIDTH,
    },
});
