import react from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ onPress, title, color }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: color || 'blue',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                margin: 5,
            }}
            onPress={onPress}
        >
            <Text style={{ color: 'white' }}>{title || 'Button'}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;