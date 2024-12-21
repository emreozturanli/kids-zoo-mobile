import { Audio } from "expo-av";
import { Image, ImageStyle } from "expo-image";
import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useI18n } from "@/hooks/useI18n";
import { useAppSettings } from "@/hooks/useAppSettings";
import { FavoritesContext } from "@/providers/FavoritesProvider/FavoritesContext";

export default function FavoritesScreen() {
	const { t } = useI18n();
	const { volume } = useAppSettings();
	const { favorites } = useContext(FavoritesContext);
	const [sound, setSound] = useState<Audio.Sound>();

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
				{favorites.length === 0 ? (
					<View style={styles.emptyState}>
						<ThemedText style={styles.emptyText}>{t("favorites.empty")}</ThemedText>
					</View>
				) : (
					<View style={styles.grid}>
						{favorites.map((item) => (
							<TouchableOpacity
								key={item.id}
								style={[styles.card, { backgroundColor: item.backgroundColor }]}
								onPress={() => playSound(item.sound)}>
								<Image source={item.image} style={styles.image} />
								<ThemedText style={styles.name}>{t(`${item.type}s.${item.id}`)}</ThemedText>
							</TouchableOpacity>
						))}
					</View>
				)}
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
	card: {
		width: "45%",
		aspectRatio: 1,
		borderRadius: 999,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: "80%",
		height: "80%",
		contentFit: "contain",
	} as ImageStyle,
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 5,
	},
	emptyState: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	emptyText: {
		fontSize: 18,
		textAlign: "center",
		color: "#666",
	},
});
