import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useI18n } from "@/hooks/useI18n";
import { AppSettingsContext } from "@/hooks/AppSettingsContext";
import { useContext } from "react";
const languages = [
	{ code: "en" as const, name: "English" },
	{ code: "ar" as const, name: "العربية" },
	{ code: "tr" as const, name: "Türkçe" },
	{ code: "pt" as const, name: "Português" },
	{ code: "de" as const, name: "Deutsch" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export default function SettingsScreen() {
	const { t } = useI18n();
	const { language, setLanguage, volume, setVolume } = useContext(AppSettingsContext);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.section}>
				<ThemedText type='subtitle'>{t("settings.language")}</ThemedText>
				<Picker
					selectedValue={language}
					onValueChange={(value: LanguageCode) => setLanguage(value)}
					style={styles.picker}>
					{languages.map((lang) => (
						<Picker.Item key={lang.code} label={lang.name} value={lang.code} />
					))}
				</Picker>
			</View>

			<View style={styles.section}>
				<ThemedText type='subtitle'>{t("settings.volume")}</ThemedText>
				<Slider
					style={styles.slider}
					value={volume}
					onValueChange={setVolume}
					minimumValue={0}
					maximumValue={1}
					step={0.1}
				/>
			</View>

			<View style={styles.section}>
				<ThemedText type='subtitle'>{t("settings.about")}</ThemedText>
				<ThemedText>{t("settings.about_text")}</ThemedText>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	section: {
		marginBottom: 30,
	},
	picker: {
		marginTop: 10,
	},
	slider: {
		marginTop: 10,
	},
});
