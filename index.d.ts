import React, {
    ForwardRefRenderFunction,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    ComponentType,
    ComponentProps,
    MemoExoticComponent,
    Dispatch,
} from 'react';
import { TouchableWithoutFeedbackProps, StyleProp, ViewStyle } from 'react-native';

type ToastProps = {
    translateEnable?: Boolean,
    scaleEnable?: Boolean,
    style?: StyleProp<ViewStyle>,
    extraBottom?: Number,
    extraTop?: Number,
}

type ShowToastProps = {
    message: String,
    duration?: Number,
    position?: 'top' | 'bottom',
    type?: 'success' | 'fail',
    onPress?: void,
    title?: String,
};

type ViewVisibleAnimatedProps = {
    scaleEnable?: Boolean,
    translateEnable?: Boolean,
    autoHide?: Boolean,
    onShowDone?: void,
    onDone?: void,
    onShowStart?: ()=>void,
    style?: StyleProp<ViewStyle>,
    delay?: Number,
    duration?: Number,
    timeout?: Number,
    autoShow?: Boolean,
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
    scaleType?: 'in' | 'out',
    renderHiddenContent?: any,
    disableHiddenContent?: boolean
};

export function memoWithRef<T, P = {}>(
    component: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;


export function memoDeepEqual<T extends ComponentType<any>>(
    Component: T,
    propsAreEqual?: (
        prevProps: Readonly<ComponentProps<T>>,
        nextProps: Readonly<ComponentProps<T>>,
    ) => boolean,
): MemoExoticComponent<T>;


type SetStateAction<S, A> = (prevState: S, callback: A) => S;

export function useStateCallback<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

export function detectEmail(email: String): Boolean;

export function detectUserName(name: String): Boolean;

export function detectPhoneNumber(phoneNum: String): Boolean;

export function withAnimated(WrappedComponent: React.ComponentType<any>): ComponentType

// Components
export class ViewVisibleAnimated extends React.Component<ViewVisibleAnimatedProps> {};

interface ScaleButtonProps extends TouchableWithoutFeedbackProps {
    scaleSize?: Number,
    disableHiddenContent?: Boolean
}

export class ScaleButton extends React.Component<ScaleButtonProps> {};

export class Toast extends React.Component<ToastProps> {};

export function showToast(props: ShowToastProps): void;

export function toastRef(props): any;


// Hooks

type IuseCountDown = {
    startDate: Date,
    endDate: Date,
    autoStart?: Boolean,
    intervalTime?: Number,
}
export function useCountdown(params: IuseCountDown): any;

export function useInterval(callback: void, delay?: number, autoStart?: Boolean): any;

type IFetchData = { api: Promise<any>, loadingDefault?: Boolean, pathData?: String }

export function useFetchData(params: IFetchData): any;

export function useStateSafe<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];