import { Audio } from "expo-av";
import { Image, ImageStyle } from "expo-image";
import { useCallback, useEffect, useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useI18n } from "@/hooks/useI18n";
import { useAppSettings } from "@/hooks/useAppSettings";
import { FavoritesContext } from "@/providers/FavoritesProvider/FavoritesContext";

function getRandomColor() {
	const colors = [
		"#FF6B6B", // Coral
		"#4ECDC4", // Turquoise
		"#45B7D1", // Sky Blue
		"#96CEB4", // Sage
		"#FFEEAD", // Cream
		"#D4A5A5", // Dusty Rose
		"#9B59B6", // Purple
		"#3498DB", // Blue
		"#E67E22", // Orange
		"#2ECC71", // Green
		"#F1C40F", // Yellow
		"#E74C3C", // Red
		"#FF9FF3", // Pink
		"#74B9FF", // Light Blue
		"#55E6C1", // Mint
		"#FFA502", // Dark Orange
		"#FF6B81", // Watermelon
		"#A3CB38", // Lime
		"#FDA7DF", // Lavender
		"#4834D4", // Royal Blue
		"#6AB04C", // Grass Green
		"#BE2EDD", // Magenta
		"#30336B", // Deep Blue
		"#F97F51", // Mandarin
		"#B33771", // Plum
		"#8395A7", // Steel
		"#FD7272", // Coral Red
		"#9AECDB", // Aqua
		"#D6A2E8", // Light Purple
		"#82589F", // Deep Purple
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

const animals = [
	{
		id: "eagle",
		image: require("@/assets/images/animals/eagle.png"),
		sound: require("@/assets/sounds/animals/eagle.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "cow",
		image: require("@/assets/images/animals/cow.png"),
		sound: require("@/assets/sounds/animals/cow.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "sheep",
		image: require("@/assets/images/animals/sheep.png"),
		sound: require("@/assets/sounds/animals/sheep.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "dog",
		image: require("@/assets/images/animals/dog.png"),
		sound: require("@/assets/sounds/animals/dog.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "cat",
		image: require("@/assets/images/animals/cat.png"),
		sound: require("@/assets/sounds/animals/cat.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "bee",
		image: require("@/assets/images/animals/bee.png"),
		sound: require("@/assets/sounds/animals/bee.wav"),
		backgroundColor: getRandomColor(),
	},
	{
		id: "rooster",
		image: require("@/assets/images/animals/rooster.png"),
		sound: require("@/assets/sounds/animals/rooster.wav"),
		backgroundColor: getRandomColor(),
	},
];

export default function AnimalsScreen() {
	const { t } = useI18n();
	const { volume } = useAppSettings();
	const [sound, setSound] = useState<Audio.Sound>();
	const [coloredAnimals] = useState(() =>
		animals.map((animal) => ({
			...animal,
			backgroundColor: getRandomColor(),
		}))
	);
	const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

	// Initialize Audio Session
	useEffect(() => {
		async function configureAudio() {
			try {
				await Audio.setAudioModeAsync({
					playsInSilentModeIOS: true,
					staysActiveInBackground: false,
					shouldDuckAndroid: true,
				});
			} catch (error) {
				console.error("Error configuring audio:", error);
			}
		}
		configureAudio();
	}, []);

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const playSound = useCallback(
		async (soundFile: any) => {
			try {
				// Unload previous sound if exists
				if (sound) {
					await sound.unloadAsync();
				}
				const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
					shouldPlay: true,
					volume: volume,
				});
				setSound(newSound);
				await newSound.playAsync();
			} catch (error) {
				console.error("Error playing sound:", error);
			}
		},
		[sound, volume]
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.grid}>
					{coloredAnimals.map((animal) => (
						<TouchableOpacity
							key={animal.id}
							style={[styles.animalCard, { backgroundColor: animal.backgroundColor }]}
							onPress={() => playSound(animal.sound)}>
							<TouchableOpacity
								style={styles.favoriteButton}
								onPress={() =>
									toggleFavorite({
										id: animal.id,
										type: "animal",
										image: animal.image,
										sound: animal.sound,
										backgroundColor: animal.backgroundColor,
									})
								}>
								<Ionicons name={isFavorite(animal.id) ? "heart" : "heart-outline"} size={24} color='white' />
							</TouchableOpacity>
							<Image source={animal.image} style={styles.animalImage} />
							<ThemedText style={styles.animalName}>{t(`animals.${animal.id}`)}</ThemedText>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#B0E0E6",
	},
	scrollContainer: {
		flexGrow: 1,
		paddingVertical: 20,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		padding: 10,
		gap: 15,
	},
	animalCard: {
		width: "45%",
		aspectRatio: 1,
		borderRadius: 999,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	animalImage: {
		width: "80%",
		height: "80%",
		contentFit: "contain",
	} as ImageStyle,
	animalName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 5,
	},
	favoriteButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 1,
	},
});
