import React, {useCallback, useEffect, useState} from "react";
import {fetchCats} from "../../../entities/cat/api/fetchCats";
import {Box, Button, CircularProgress,} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Cat} from "../../../entities/cat/model/types";
import {CatCard} from "../../../entities/cat/ui/CatCard";
import {getFavorites, saveFavorites, toggleFavorites} from "../../../entities/cat/model/favorites.ts";

export const AllCatsPage: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [favorites, setFavorites] = useState<Cat[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadCats = useCallback(async (currentPage: number) => {
        try {
            setLoading(true);
            const newCats = await fetchCats(currentPage);
            setCats(newCats);
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

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage((prevPage) => prevPage - 1);
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress sx={{display: "block", margin: "20px auto"}}/>
            ) : (
                <Grid container spacing={2}>
                    {cats.map((cat) => (
                        <Grid size={{xs: 12, sm: 4, md: 2}}>
                            <CatCard
                                cat={cat}
                                isFavorite={favorites.some((fav) => fav.id === cat.id)}
                                onToggleFavorite={() => handleToggleFavorite(cat)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousPage}
                    disabled={page === 0 || loading}
                    sx={{marginRight: "10px"}}
                >
                    Назад
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextPage}
                    disabled={!hasMore || loading}
                >
                    Вперёд
                </Button>
            </Box>
        </Box>
    );
};
