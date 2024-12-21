import { createContext } from "react";

export interface FavoriteItem {
	id: string;
	type: "animal" | "vehicle";
	image: any;
	sound: any;
	backgroundColor: string;
}

export interface FavoritesContextType {
	favorites: FavoriteItem[];
	toggleFavorite: (item: FavoriteItem) => void;
	isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
	favorites: [],
	toggleFavorite: () => {},
	isFavorite: () => false,
});
