import { Audio } from "expo-av";
import { Image, ImageStyle } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useI18n } from "@/hooks/useI18n";

const animals = [
	{
		id: "eagle",
		image: require("@/assets/images/animals/eagle.png"),
		sound: require("@/assets/sounds/eagle.wav"),
		backgroundColor: "#FF69B4",
	},
	{
		id: "cow",
		image: require("@/assets/images/animals/cow.png"),
		sound: require("@/assets/sounds/cow.wav"),
		backgroundColor: "#4A90E2",
	},
	{
		id: "sheep",
		image: require("@/assets/images/animals/sheep.png"),
		sound: require("@/assets/sounds/sheep.wav"),
		backgroundColor: "#9C27B0",
	},
	{
		id: "dog",
		image: require("@/assets/images/animals/dog.png"),
		sound: require("@/assets/sounds/dog.wav"),
		backgroundColor: "#FF9800",
	},
	{
		id: "cat",
		image: require("@/assets/images/animals/cat.png"),
		sound: require("@/assets/sounds/cat.wav"),
		backgroundColor: "#795548",
	},
	{
		id: "bee",
		image: require("@/assets/images/animals/bee.png"),
		sound: require("@/assets/sounds/bee.wav"),
		backgroundColor: "#FFC107",
	},
	{
		id: "rooster",
		image: require("@/assets/images/animals/rooster.png"),
		sound: require("@/assets/sounds/rooster.wav"),
		backgroundColor: "#673AB7",
	},
];

export default function AnimalsScreen() {
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
				<ThemedText type='title'>{t("welcome")}</ThemedText>
				<ThemedText>{t("tap_to_hear")}</ThemedText>
			</View>

			<View style={styles.grid}>
				{animals.map((animal) => (
					<TouchableOpacity
						key={animal.id}
						style={[styles.animalCard, { backgroundColor: animal.backgroundColor }]}
						onPress={() => playSound(animal.sound)}>
						<Image source={animal.image} style={styles.animalImage} />
						<ThemedText style={styles.animalName}>{t(`animals.${animal.id}`)}</ThemedText>
					</TouchableOpacity>
				))}
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B0E0E6", // Light blue background like in the image
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
});
