import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarActiveTintColor: "#4A90E2",
				tabBarInactiveTintColor: "#8E8E93",
				tabBarStyle: Platform.select({
					ios: {
						backgroundColor: "#F8F8F8",
					},
					android: {
						backgroundColor: "#FFFFFF",
					},
				}),
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: "Animals",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='pawprint.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='vehicles'
				options={{
					title: "Vehicles",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='car.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					title: "Favorites",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='heart.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='gearshape.fill' color={color} />,
				}}
			/>
		</Tabs>
	);
}
