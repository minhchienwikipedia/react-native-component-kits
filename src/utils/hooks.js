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

const getDataByArrKey = (data, path = '') => {
    const arrKey = path.split('.');
    if (!arrKey.length) {
        return data;
    }
    let value = data;
    for (let i = 0; i < arrKey.length; i++) {
        const element = arrKey[i];
        if (value[element]) {
            value = value[element];
        }
    }
    return value;
};

export const useFetchData = ({ api, loadingDefault = true, pathData }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(loadingDefault);
    const [error, setError] = useState(false);

    async function load() {
        try {
            const result = await api();
            setData(getDataByArrKey(result, pathData));
        } catch (e) {
            setError(true);
        }
        setLoading(false);
    }

    const refresh = () => {
        setData([]);
        setLoading(true);
        load();
    };

    return { data, loading, error, load, refresh };
};

export const useStateSafe = (initialState) => {
    const [state, setState] = useState(initialState);
    const unmount = useRef(false);

    useEffect(() => {
        return () => {
            unmount.current = true;
        };
    }, []);

    const setStateSafe = (value) => {
        if (!unmount.current) {
            setState(value);
        }
    };

    return [state, setStateSafe];
};

export const useStateCallback = (initialState) => {
    const [state, setState] = useStateSafe(initialState);
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
