import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {COLORS} from "../../constants/theme"

const size = 24;
const IconColor = COLORS.grey;
const focusedColor = COLORS.blue;
export default function TabsLayout() {
  return (
	<Tabs
		
		screenOptions={{
			tabBarShowLabel : false,
			headerShown : false,
			tabBarActiveTintColor:focusedColor,
			tabBarInactiveTintColor : IconColor,
			tabBarStyle : {
				backgroundColor : COLORS.background,
				borderTopWidth : 0,
				position : "absolute",
				elevation : 0,
				height : 40,
				paddingBottom : 8,
			}
		}}
	>
		<Tabs.Screen 
			name="index" 
			options={{
				tabBarIcon : ({color})=> <Ionicons name="home" size={size}  color={color}/>
			}}
		/>
		<Tabs.Screen 
			name="bookmark" 
			options={{
				tabBarIcon : ({color}) => <Ionicons name="bookmark" size={size} color={color} />
			}}
		/>
		<Tabs.Screen 
			name="create" 
			options={{
				tabBarIcon : ({focused})=> <Ionicons name="add-circle" size={size} color={focused?COLORS.primary:IconColor} />			
				}
			}
		/>
		<Tabs.Screen 
			name="notifications" 
			options={{
				tabBarIcon : ({focused})=> focused?<Ionicons name="heart" size={size} color={COLORS.red} />:<Ionicons name="heart-outline" size={size} color={IconColor} />			
				
			}}
		/>
		<Tabs.Screen 
			name="profile" 
			options={{
				tabBarIcon : ({color})=><Ionicons name="person" size={size}  color={color}/>
			}}
		/>
		
	
	</Tabs>
  )
}