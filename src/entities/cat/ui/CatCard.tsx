import React, {useState} from "react";
import {IconButton, Card, CardMedia, CardActions} from "@mui/material";
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

    return (
        <Card
            sx={{
                width: {xs: '100%', sm: 200, md:200},
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <CardMedia
                component="img"
                height="200"
                image={cat.url}
                alt="cat"
                sx={{objectFit: "cover"}}
            />

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
                    {isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
            </CardActions>
        </Card>
    );
};
