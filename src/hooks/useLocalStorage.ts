import {Dispatch, SetStateAction, useState} from "react";


function useLocalStorage<T>(key: string, initialValue: T): [T | undefined, (value: T | undefined) => void] {
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value: T | undefined) => {
        try {
            setStoredValue(value);
            if (typeof window !== "undefined") {
                if (value == undefined) {
                    window.localStorage.removeItem(key)
                    setStoredValue(undefined)
                } else {
                    window.localStorage.setItem(key, JSON.stringify(value));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];

}

export default useLocalStorage