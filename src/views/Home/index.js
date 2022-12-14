import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform, BackHandler, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './style';
import ModalInfo from 'components/ModalInfo';
import ModalOptions from 'components/ModalOptions';
import LottieView from 'lottie-react-native';

const homePageJSON = require('../../../assets/animations/homePage.json');

export default function HomeView({ navigation }) {

    const [showComponent, setShowComponent] = useState(false)

    function isIOSorOther() {
    //    || Platform.OS === 'android'
        if (Platform.OS === "ios") {
            return (
                <TouchableOpacity style={styles.btn_exitIOS} onPress={() => { BackHandler.exitApp() }}>
                    <Ionicons name='exit' size={30} color='white' />
                </TouchableOpacity>
            )
        }
    }

    //Tratando o botão de voltar do Android
    const backAction = () => {
        Alert.alert("Atenção!", "Você realmente deseja sair do aplicativo ?", [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => BackHandler.exitApp()
            }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={homePageJSON}
                autoPlay={true}
                loop={true}
                resizeMode='cover'
            ></LottieView>

            {/* botões de opção e informação nos cantos superiores da tela inicial*/}
            <View style={styles.view_modals}>
                <ModalOptions setShowComponent={setShowComponent} showComponent={showComponent} />
                <ModalInfo />
            </View>

            {/* titulo e botão de play */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.text_white, styles.text_1]}> Os Três</Text>
                    <Text style={[styles.text_white, styles.text_2]}> porquinhos</Text>
                </View>

                <TouchableOpacity style={styles.btn_play} onPress={() => navigation.navigate("PageOne")}>
                    <Ionicons name='play' size={120} color='white' />
                </TouchableOpacity>

                {/* Botão de sair para IOS */}
                {isIOSorOther()}
            </View>
        </View>
    );
}

