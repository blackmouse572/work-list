import { useRef, useEffect, useMemo } from "react";
import { debounce, DebouncedFunc } from "lodash";

export default function useDebounceFn<T extends (...args: A[]) => A>(fn: T, delay: number): DebouncedFunc<T> {
    const debounced = useMemo(() => debounce(fn, delay), [delay, fn]);

    useEffect(() => {
        return () => {
            debounced.cancel();
        };
    }, [debounced]);

    return debounced;
}