import {Cat} from "./types.ts";

export const getFavorites = (): Cat[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const saveFavorites = (favorites: Cat[]): void => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export const toggleFavorites = (favorites: Cat[], cat: Cat): Cat[] => {
    const existingIndex = favorites.findIndex((fav) => fav.id === cat.id);
    if (existingIndex !== -1) {
        return favorites.filter((fav) => fav.id !== cat.id);
    } else {
        return [...favorites, cat];
    }
}