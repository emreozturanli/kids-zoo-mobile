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
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

const vehicles = [
	{
		id: "car",
		image: require("@/assets/images/vehicles/car.png"),
		sound: "https://www.soundjay.com/transportation/sounds/car-engine-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "train",
		image: require("@/assets/images/vehicles/train.png"),
		sound: "https://www.soundjay.com/transportation/sounds/train-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "airplane",
		image: require("@/assets/images/vehicles/airplane.png"),
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "rocket",
		image: require("@/assets/images/vehicles/rocket.png"),
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "helicopter",
		image: require("@/assets/images/vehicles/helicopter.png"),
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "balloon",
		image: require("@/assets/images/vehicles/balloon.png"),
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: getRandomColor(),
	},
	{
		id: "spaceship",
		image: require("@/assets/images/vehicles/spaceship.png"),
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: getRandomColor(),
	},
];

export default function VehiclesScreen() {
	const { t } = useI18n();
	const { volume } = useAppSettings();
	const [sound, setSound] = useState<Audio.Sound>();
	const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
	const [coloredVehicles] = useState(() =>
		vehicles.map((vehicle) => ({
			...vehicle,
			backgroundColor: getRandomColor(),
		}))
	);

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
					{coloredVehicles.map((vehicle) => (
						<TouchableOpacity
							key={vehicle.id}
							style={[styles.vehicleCard, { backgroundColor: vehicle.backgroundColor }]}
							onPress={() => playSound(vehicle.sound)}>
							<TouchableOpacity
								style={styles.favoriteButton}
								onPress={() =>
									toggleFavorite({
										id: vehicle.id,
										type: "vehicle",
										image: vehicle.image,
										sound: vehicle.sound,
										backgroundColor: vehicle.backgroundColor,
									})
								}>
								<Ionicons name={isFavorite(vehicle.id) ? "heart" : "heart-outline"} size={24} color='white' />
							</TouchableOpacity>
							<Image source={vehicle.image} style={styles.vehicleImage} />
							<ThemedText style={styles.vehicleName}>{t(`vehicles.${vehicle.id}`)}</ThemedText>
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
		paddingBottom: 20,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		padding: 10,
		gap: 15,
	},
	vehicleCard: {
		width: "45%",
		aspectRatio: 1,
		borderRadius: 999,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	vehicleImage: {
		width: "80%",
		height: "80%",
		contentFit: "contain",
	} as ImageStyle,
	vehicleName: {
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
