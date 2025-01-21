import React, {useEffect, useState} from "react";
import {CircularProgress, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Cat} from "../../../entities/cat/model/types";
import {CatCard} from "../../../entities/cat/ui/CatCard";
import {getFavorites, saveFavorites} from "../../../entities/cat/model/favorites.ts";

export const FavoriteCatsPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedFavorites = getFavorites();
            setFavorites(storedFavorites);
        } catch (error) {
            console.error("Ошибка при загрузке любимых котов:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const removeFavorite = (catId: string) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== catId);
        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
    };

    return (
        <Container maxWidth="lg">
            {loading ? (
                <CircularProgress sx={{display: "block", margin: "20px auto"}}/>
            ) : favorites.length === 0 ? (
                <Typography sx={{textAlign: "center", marginTop: "20px"}}>
                    Нет любимых котиков
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {favorites.map((cat) => (
                        <Grid key={cat.id} size={{xs: 12, sm: 4, md: 3}}>
                            <CatCard
                                cat={cat}
                                isFavorite={true}
                                onToggleFavorite={() => removeFavorite(cat.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};
