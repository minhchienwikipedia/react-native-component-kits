import deepEqual from 'deep-equal';
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const memoDeepEqual = (component) => {
    return memo(component, (prevProps, nextProps) => deepEqual(prevProps, nextProps));
};

export const memoWithRef = (component) => {
    return memo(forwardRef(component), (prevProps, nextProps) => deepEqual(prevProps, nextProps));
};

export const detectEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const detectUserName = (name) => {
    var re = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/i;
    return re.test(name);
};

export const detectPhoneNumber = (phoneNum) => {
    var filter = /^[0-9]+$/;
    if (filter.test(phoneNum)) {
        return true;
    } else {
        return false;
    }
};

export const useStateCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null);

    const setStateCallback = (val, cb) => {
        cbRef.current = cb; // store passed callback to ref
        setState(val);
    };

    useEffect(() => {
        // cb.current is `null` on initial render, so we only execute cb on state *updates*
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null; // reset callback after execution
        }
    }, [state]);

    return [state, setStateCallback];
};

export function withAnimated(WrappedComponent: React.ComponentType<any>): ComponentType {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    class WithAnimated extends React.Component {
        static displayName = `WithAnimated(${displayName})`;

        render(): React.ReactNode {
            return <WrappedComponent {...this.props} />;
        }
    }

    return Animated.createAnimatedComponent(WithAnimated);
}
