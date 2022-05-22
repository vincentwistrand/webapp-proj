import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AllMessages(route) {
    const messages = route.route.params.messages;
    const navigation = useNavigation();

    const listOfMessages = messages
    .map((message, index) => {
        return <TouchableOpacity
                    key={index}
                    style={{flexDirection: 'row', marginVertical: 7}}
                    onPress={() => {navigation.navigate('Meddelande', {message: message})}}>
                    <Ionicons name="warning" 
                        size={35} 
                        color="orange" 
                    />
                    <Text style={[Typography.p, {marginTop: 10, marginLeft: 10}]}>{message.Header}</Text>
            </TouchableOpacity>
    });

    return (
        <ScrollView>
            <View style={[Base.mainPadding]}>
                {listOfMessages}
            </View>
        </ScrollView>
    );
};