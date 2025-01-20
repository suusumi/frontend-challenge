import {useEffect, useRef} from "react";

export const useObserver = (
    hasMore: boolean,
    loading: boolean,
    onIntersect: () => void
) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersect();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, loading, onIntersect]);

    return observerRef;
};