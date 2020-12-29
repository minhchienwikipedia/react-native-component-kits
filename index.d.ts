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
import { TouchableWithoutFeedbackProps } from 'react-native';
import { ViewVisibleAnimatedProps } from './src/components/ViewVisibleAnimated';

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

export const dectectEmail = (email: String) => Boolean;

export const dectectUserName = (name: String) => Boolean;

export const dectectPhoneNumber = (phoneNum: String) => Boolean;

export function withAnimated(WrappedComponent: React.ComponentType<any>): ComponentType

// Components
export const ViewVisibleAnimated = (props: ViewVisibleAnimatedProps) => Boolean;
export const ScaleButton = (props: TouchableWithoutFeedbackProps) => Boolean;

// Hooks

type IuseCountDown = {
    startDate: Date,
    endDate: Date,
    autoStart?: Boolean,
    intervalTime?: Number,
}
export const useCountdown = (params: IuseCountDown) => Array;

export const useInterval = (callback: TimerHandler, delay?: Delay, autoStart?: Boolean) => Array;

type IFetchData = { api: Promise, loadingDefault?: Boolean, pathData?: String }

export const useFetchData = (params: IFetchData) => Array;