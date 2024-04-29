import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="index"
                options={{
                    headerTitle: "Home Page",
                    headerStyle: {
                        backgroundColor: "cyan",
                    }
                }}
            />
            <Stack.Screen 
                name="about"
                options={{
                    headerTitle: "About Page",
                    headerStyle: {
                        backgroundColor: "pink",
                    }
                }}
            />
            <Stack.Screen 
                name="user-profile"
                options={{
                    headerTitle: "User Profile Page",
                    headerStyle: {
                        backgroundColor: "gray",
                    }
                }}
            />
            <Stack.Screen 
                name="user/[id]"
                options={{
                    headerTitle: "ID Page",
                    headerStyle: {
                        backgroundColor: "purple",
                    }
                }}
            />
        </Stack>
    )
};

export default RootLayout;
