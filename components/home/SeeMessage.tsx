import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React from 'react';


export default function SeeMessage(route) {
    const message = route.route.params.message;

    return (
        <ScrollView>
            <View style={[Base.mainPadding, {alignItems:'center'}]}>
                <Text style={Typography.h3}>{message.Header}</Text>
                <Text style={Typography.p}>{message.ExternalDescription}</Text>
            </View>
        </ScrollView>
    );
};