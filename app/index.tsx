import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useI18n } from "@/hooks/useI18n";
import Animated, {
	useAnimatedStyle,
	withSpring,
	useSharedValue,
	withSequence,
	withDelay,
} from "react-native-reanimated";

export default function OpeningScreen() {
	const router = useRouter();
	const { t } = useI18n();
	const scale = useSharedValue(0.3);
	const opacity = useSharedValue(0);

	useEffect(() => {
		// Animate in
		scale.value = withSpring(1);
		opacity.value = withSpring(1);

		// Navigate after 5 seconds
		const timer = setTimeout(() => {
			opacity.value = withSequence(withDelay(500, withSpring(0)));
			setTimeout(() => {
				router.replace("/(tabs)");
			}, 1000);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.content, animatedStyle]}>
				<View style={styles.textContainer}>
					<ThemedText type='title' style={[styles.headerText, styles.titleText]}>
						{t("welcome")}
					</ThemedText>
					<ThemedText style={styles.headerText}>{t("tap_to_hear")}</ThemedText>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B0E0E6",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	content: {
		alignItems: "center",
		width: "100%",
		maxWidth: 600,
	},
	textContainer: {
		width: "100%",
		alignItems: "center",
	},
	headerText: {
		textAlign: "center",
		width: "100%",
		textShadowColor: "rgba(0, 0, 0, 0.25)",
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 3,
		color: "#FF6B6B",
		fontSize: 24,
		letterSpacing: 1,
		paddingHorizontal: 10,
	},
	titleText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#4A90E2",
		textTransform: "uppercase",
		marginBottom: 10,
	},
});
