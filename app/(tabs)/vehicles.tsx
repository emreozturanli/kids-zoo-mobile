import { Audio } from "expo-av";
import { Image, ImageStyle } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useI18n } from "@/hooks/useI18n";

const vehicles = [
	{
		id: "car",
		image: "https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/icon.png",
		sound: "https://www.soundjay.com/transportation/sounds/car-engine-1.mp3",
		backgroundColor: "#4CAF50",
	},
	{
		id: "train",
		image:
			"https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/adaptive-icon.png",
		sound: "https://www.soundjay.com/transportation/sounds/train-1.mp3",
		backgroundColor: "#FF5722",
	},
	{
		id: "airplane",
		image: "https://raw.githubusercontent.com/expo/expo/main/templates/expo-template-blank/assets/images/splash.png",
		sound: "https://www.soundjay.com/transportation/sounds/airplane-1.mp3",
		backgroundColor: "#2196F3",
	},
];

export default function VehiclesScreen() {
	const { t } = useI18n();
	const [sound, setSound] = useState<Audio.Sound>();

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const playSound = useCallback(async (soundFile: any) => {
		const { sound } = await Audio.Sound.createAsync(soundFile);
		setSound(sound);
		await sound.playAsync();
	}, []);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type='title'>{t("vehicles.title")}</ThemedText>
				<ThemedText>{t("tap_to_hear")}</ThemedText>
			</View>

			<View style={styles.grid}>
				{vehicles.map((vehicle) => (
					<TouchableOpacity
						key={vehicle.id}
						style={[styles.vehicleCard, { backgroundColor: vehicle.backgroundColor }]}
						onPress={() => playSound(vehicle.sound)}>
						<Image source={vehicle.image} style={styles.vehicleImage} />
						<ThemedText style={styles.vehicleName}>{t(`vehicles.${vehicle.id}`)}</ThemedText>
					</TouchableOpacity>
				))}
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B0E0E6",
	},
	header: {
		padding: 20,
		alignItems: "center",
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
});
