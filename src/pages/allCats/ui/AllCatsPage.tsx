import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Cat} from "../../../entities/cat/model/types";
import {CatCard} from "../../../entities/cat/ui/CatCard";
import {getFavorites, saveFavorites, toggleFavorites} from "../../../entities/cat/model/favorites.ts";
import {useLoadCats} from "../model/useLoadCats.ts";
import {useObserver} from "../model/useObserver.ts";

export const AllCatsPage: React.FC = () => {
    const {cats, loading, hasMore, loadCats} = useLoadCats();
    const [favorites, setFavorites] = useState<Cat[]>([]);
    const [page, setPage] = useState(0);

    const observerRef = useObserver(hasMore, loading,
        () => setPage((prev) => prev + 1));

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
