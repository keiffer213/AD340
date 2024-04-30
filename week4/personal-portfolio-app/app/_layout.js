import { Stack } from "expo-router";

const RootLayout = () => {

    return (
        <Stack>
            <Stack.Screen 
                name="index"
                options={{
                    headerTitle: "Home Page",
                    headerStyle: {
                        backgroundColor: "#fef",
                    }
                }}
            />
            <Stack.Screen 
                name="projects"
                options={{
                    headerTitle: "Projects",
                    headerStyle: {
                        backgroundColor: "#bef",
                    }
                }}
            />
            <Stack.Screen 
                name="project/[id]"
                options={{
                    headerTitle: `Project Page`,
                    headerStyle: {
                        backgroundColor: "#dea",
                    }
                }}
            />
        </Stack>
    )
};

export default RootLayout;
