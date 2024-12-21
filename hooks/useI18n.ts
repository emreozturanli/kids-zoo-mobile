import { AppSettingsContext } from "@/providers/AppSettingsProvider/AppSettingsContext";
import { I18n } from "i18n-js";
import { useCallback, useContext } from "react";
import { I18nManager } from "react-native";

const i18n = new I18n({
	en: {
		welcome: "WELCOME TO THE KIDS' ZOO",
		tap_to_hear: "Click on the pictures to hear what animals are telling!",
		animals: {
			lion: "Lion",
			eagle: "Eagle",
			sheep: "Sheep",
			rooster: "Rooster",
			cow: "Cow",
			dog: "Dog",
			cat: "Cat",
			bee: "Bee",
		},
		vehicles: {
			title: "VEHICLES",
			car: "Car",
			train: "Train",
			airplane: "Airplane",
			helicopter: "Helicopter",
			rocket: "Rocket",
			balloon: "Balloon",
			spaceship: "Spaceship",
			submarine: "Submarine",
			boat: "Boat",
		},
		settings: {
			language: "Language",
			volume: "Volume",
			about: "About",
			about_text:
				"A fun educational app for kids to learn about animals and vehicles through interactive sounds and images!",
		},
		favorites: {
			empty: "No favorites yet. Add some by tapping the heart icon on items!",
		},
	},
	ar: {
		// Add Arabic translations with RTL support
		welcome: "مرحباً بكم في حديقة حيوان الأطفال",
		tap_to_hear: "!انقر على الصور لتسمع ما تقوله الحيوانات",
		// Add other Arabic translations...
	},
	tr: {
		// Add Turkish translations
		welcome: "ÇOCUK HAYVANAT BAHÇESİNE HOŞGELDİNİZ",
		tap_to_hear: "Hayvanların ne söylediğini duymak için resimlere tıklayın!",
		// Add other Turkish translations...
	},
	// Add other languages...
});

export function useI18n() {
	const { language } = useContext(AppSettingsContext);

	i18n.locale = language || "en";
	I18nManager.forceRTL(language === "ar");

	const t = useCallback(
		(key: string, params?: Record<string, string>) => {
			return i18n.t(key, params);
		},
		[language]
	);

	return { t };
}
