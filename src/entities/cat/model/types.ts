export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface CatCardProps {
    cat: Cat;
    isFavorite: boolean;
    onToggleFavorite: (catId: string) => void;
}