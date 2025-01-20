import React, {useCallback, useEffect, useRef, useState} from "react";
import {fetchCats} from "../../../entities/cat/api/fetchCats";
import {Box, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Cat} from "../../../entities/cat/model/types";
import {CatCard} from "../../../entities/cat/ui/CatCard";
import {getFavorites, saveFavorites, toggleFavorites} from "../../../entities/cat/model/favorites.ts";

export const AllCatsPage: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [favorites, setFavorites] = useState<Cat[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadCats = useCallback(async (currentPage: number) => {
        try {
            setLoading(true);
            const newCats = await fetchCats(currentPage);
            setCats((prevCats) => [...prevCats, ...newCats]);
            setHasMore(newCats.length > 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCats(page);
    }, [page, loadCats]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (cat: Cat) => {
        const updatedFavorites = toggleFavorites(favorites, cat);
        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
    };

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => {
                        return loading ? prevPage : prevPage + 1;
                    });
                }
            },
            {threshold: 1.0}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, loading]);


    return (
        <Box>
            {!loading && cats.length === 0 && (
                <Box sx={{textAlign: "center", marginTop: "20px"}}>
                    <Typography>Котики не найдены / Ошибка загрузки данных</Typography>
                </Box>
            )}

            <Grid container spacing={2}>
                {cats.map((cat) => (
                    <Grid key={cat.id} size={{xs: 12, sm: 4, md: 2}}>
                        <CatCard
                            cat={cat}
                            isFavorite={favorites.some((fav) => fav.id === cat.id)}
                            onToggleFavorite={() => handleToggleFavorite(cat)}
                        />
                    </Grid>
                ))}
            </Grid>

            {loading && (
                <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <CircularProgress/>
                </Box>
            )}

            {!hasMore && !loading && (
                <Box sx={{textAlign: "center", marginTop: "20px"}}>
                    <Typography>Котики закончились</Typography>
                </Box>
            )}

            <div ref={observerRef} style={{height: "1px"}}/>
        </Box>
    );
};
