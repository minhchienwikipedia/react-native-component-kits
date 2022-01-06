import React from 'react';

export const toastRef = React.createRef();

export type ShowToastProps = {
    message: String,
    duration?: Number,
    position?: 'top' | 'bottom',
    type?: 'success' | 'fail',
    onPress?: void,
    title?: String,
};
export const showToast = (props: ShowToastProps) => {
    if (typeof props === 'string') {
        toastRef.current?.show?.({
            message: props,
            position: 'bottom',
            type: 'success',
        });
        return;
    }
    const {
        message,
        duration,
        position = 'bottom',
        type = 'success',
        onPress = () => {},
        title,
        ...rest
    } = props;
    toastRef.current?.show?.({
        message,
        duration,
        position,
        type,
        onPress,
        title,
        ...rest,
    });
};
