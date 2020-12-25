import { useEffect, useRef, useState } from 'react';

export const useCountdown = ({
    startDate = new Date(),
    endDate,
    autoStart = true,
    intervalTime = 1000,
}) => {
    const [timeLeft, setTimeLeft] = useState(new Date(endDate) - startDate);
    const { stopInterval, startInterval } = useInterval(
        () => {
            setTimeLeft((current) => {
                if (current <= 0) {
                    stopInterval();
                    return 0;
                }
                return current - intervalTime;
            });
        },
        intervalTime,
        autoStart,
    );

    return [timeLeft, startInterval, stopInterval];
};

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

export const useInterval = (callback: TimerHandler, delay: Delay, autoStart) => {
    const savedCallbackRef = useRef();
    const intervalId = useRef();

    const startInterval = () => {
        const handler = (...args: any[]) => savedCallbackRef.current(...args);
        intervalId.current = setInterval(handler, delay);
    };

    useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay !== null) {
            startInterval();
            return () => clearInterval(intervalId.current);
        }
    }, [delay]);
    return {
        startInterval,
        stopInterval: () => clearInterval(intervalId.current),
    };
};
