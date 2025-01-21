import React, {useState} from "react";
import {IconButton, Card, CardMedia, CardActions, Skeleton, Box, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Cat} from "../model/types.ts";

interface CatCardProps {
    cat: Cat;
    isFavorite: boolean;
    onToggleFavorite: (catId: string) => void;
}

export const CatCard: React.FC<CatCardProps> = ({cat, isFavorite, onToggleFavorite}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Card
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!imageLoaded && !imageError && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="200px"
                    sx={{objectFit: "cover"}}
                />
            )}

            {imageError && (
                <Box
                    sx={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#c5c5c5",
                    }}
                >
                    <Typography sx={{fontSize: "14px"}}>
                        Ошибка загрузки
                    </Typography>
                </Box>
            )}

            {!imageError && (
                <CardMedia
                    component="img"
                    height="200"
                    image={cat.url}
                    alt="cat"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    sx={{
                        objectFit: "cover",
                        display: imageLoaded ? "block" : "none",
                    }}
                />
            )}

            <CardActions
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                }}
            >
                <IconButton
                    onClick={() => onToggleFavorite(cat.id)}
                    sx={{
                        color: "#FF3A00",
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon sx={{fontSize: "40px"}}/>
                    ) : (
                        <FavoriteBorderIcon sx={{fontSize: "40px"}}/>
                    )}
                </IconButton>
            </CardActions>
        </Card>
    );
};
