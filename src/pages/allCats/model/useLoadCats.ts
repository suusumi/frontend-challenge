import {useCallback, useState} from "react";
import {Cat} from "../../../entities/cat/model/types.ts";
import {fetchCats} from "../../../entities/cat/api/fetchCats.ts";

export const useLoadCats = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadCats = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const newCats = await fetchCats(page);
            setCats((prev) => [...prev, ...newCats]);
            setHasMore(newCats.length > 0);
        } catch (error) {
            console.error("Error loading cats:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { cats, loading, hasMore, loadCats };
};