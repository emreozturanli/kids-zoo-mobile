import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesContext, FavoriteItem } from "./FavoritesContext";

const FAVORITES_STORAGE_KEY = "@kids_zoo_favorites";

// Define static asset mappings
const ANIMAL_IMAGES = {
	eagle: require("@/assets/images/animals/eagle.png"),
	cow: require("@/assets/images/animals/cow.png"),
	sheep: require("@/assets/images/animals/sheep.png"),
	dog: require("@/assets/images/animals/dog.png"),
	cat: require("@/assets/images/animals/cat.png"),
	bee: require("@/assets/images/animals/bee.png"),
	rooster: require("@/assets/images/animals/rooster.png"),
};

const ANIMAL_SOUNDS = {
	eagle: require("@/assets/sounds/animals/eagle.wav"),
	cow: require("@/assets/sounds/animals/cow.wav"),
	sheep: require("@/assets/sounds/animals/sheep.wav"),
	dog: require("@/assets/sounds/animals/dog.wav"),
	cat: require("@/assets/sounds/animals/cat.wav"),
	bee: require("@/assets/sounds/animals/bee.wav"),
	rooster: require("@/assets/sounds/animals/rooster.wav"),
};

const VEHICLE_IMAGES = {
	car: "https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/icon.png",
	train:
		"https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/adaptive-icon.png",
	airplane: "https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/splash.png",
};

const VEHICLE_SOUNDS = {
	car: "https://www.soundjay.com/transportation/sounds/car-engine-1.mp3",
	train: "https://www.soundjay.com/transportation/sounds/train-1.mp3",
	airplane: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
};

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
	const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getAssetForType = (type: "animal" | "vehicle", id: string, assetType: "image" | "sound") => {
		if (type === "animal") {
			return assetType === "image"
				? ANIMAL_IMAGES[id as keyof typeof ANIMAL_IMAGES]
				: ANIMAL_SOUNDS[id as keyof typeof ANIMAL_SOUNDS];
		}
		return assetType === "image"
			? VEHICLE_IMAGES[id as keyof typeof VEHICLE_IMAGES]
			: VEHICLE_SOUNDS[id as keyof typeof VEHICLE_SOUNDS];
	};

	const loadFavorites = async () => {
		try {
			const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
			if (storedFavorites) {
				const parsedFavorites = JSON.parse(storedFavorites);
				const reconstructedFavorites = parsedFavorites.map((fav: FavoriteItem) => ({
					...fav,
					image: getAssetForType(fav.type, fav.id, "image"),
					sound: getAssetForType(fav.type, fav.id, "sound"),
				}));
				setFavorites(reconstructedFavorites);
			}
		} catch (error) {
			console.error("Error loading favorites:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadFavorites();
	}, []);

	const saveFavorites = async (newFavorites: FavoriteItem[]) => {
		try {
			const favoritesToStore = newFavorites.map((fav) => ({
				id: fav.id,
				type: fav.type,
				backgroundColor: fav.backgroundColor,
			}));
			await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesToStore));
		} catch (error) {
			console.error("Error saving favorites:", error);
		}
	};

	const toggleFavorite = useCallback((item: FavoriteItem) => {
		setFavorites((prev) => {
			const newFavorites = prev.some((fav) => fav.id === item.id)
				? prev.filter((fav) => fav.id !== item.id)
				: [...prev, item];
			saveFavorites(newFavorites);
			return newFavorites;
		});
	}, []);

	const isFavorite = useCallback((id: string) => favorites.some((fav) => fav.id === id), [favorites]);

	if (isLoading) {
		return null;
	}

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
	);
}
