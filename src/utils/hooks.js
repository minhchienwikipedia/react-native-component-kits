import { useEffect, useState } from 'react';

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

export const useInterval = (handler, interval, autoStart) => {
    const [intervalId, setIntervalId] = useState();
    let id;
    const startInterval = () => {
        id = setInterval(handler, interval);
        setIntervalId(id);
    };

    const stopInterval = () => {
        clearInterval(intervalId);
    };

    useEffect(() => {
        if (autoStart) {
            startInterval();
        }
        return () => {
            stopInterval();
        };
    }, []);
    return {
        startInterval,
        stopInterval,
    };
};
