import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import styles from './style';
import LottieView from 'lottie-react-native';
import LegendCaptionArea from 'components/LegendTextArea';
import ButtonNavigation from 'components/ButtonNavigation';
import LayoutPages from '../../components/LayoutPages';
import { SoundNarrationContext } from "contextAPI/soundNarration";
import { SoundContext } from 'contextAPI/sound';
import { textScene7 } from '../legendTextFile';
import * as Animatable from 'react-native-animatable';

const scene7JSON = require('../../../assets/animations/page7/page_7.json');
const pig_speak = require('../../../assets/animations/page7/pig_speak.json');
const wolf = require('../../../assets/animations/page7/wolf.json');
const narrationScene7 = require('../../../assets/sound/narration/Page07/Page7.mp3');

export default function PageSeven({ navigation }) {

    const { initNarrationSound } = useContext(SoundNarrationContext);
    const { updateVolumSound } = useContext(SoundContext);
    const [loadingButtonNavigation, setloadingButton] = useState(false);
    const [load, setLoad] = useState(true);

    function timeoutButtonNavegacao() {
        setTimeout(() => {
            setloadingButton(true);
        }, 4500);
    }
    //Iniciando a narração
    useEffect(() => {
        navigation.addListener('focus', () => initNarrationSound(narrationScene7));
        updateVolumSound();
    }, []);

    //Definido um timeout para apresentar o button de navegacao
    useEffect(() => {
        navigation.addListener('focus', () => setLoad(!load), timeoutButtonNavegacao());
        return () => {
            setloadingButton(false);
        };
    }, [navigation, load]);

    const animation_wolf = useRef();

    function start_animation_wolf() {
        animation_wolf.current?.play();
    }

    return (
        <View style={styles.container}>
            <LottieView
                source={scene7JSON}
                autoPlay={true}
                loop={true}
                resizeMode='cover'
            />
            <LottieView
                source={pig_speak}
                autoPlay={true}
                resizeMode='cover'
                style={styles.view_pig_speak}
            />
            <LottieView
                source={wolf}
                ref={animation_wolf}
                resizeMode='cover'
                style={styles.view_wolf}
            />
            <LayoutPages>
                {/* controle de animação 1 */}
                <TouchableNativeFeedback onPress={start_animation_wolf}>
                    <Animatable.View style={[styles.toggleView, styles.togglebadWolf]} animation="pulse" easing="linear" iterationCount="infinite" />
                </TouchableNativeFeedback>

                <LegendCaptionArea text={textScene7} />

                {loadingButtonNavigation && <ButtonNavigation proxRoute="PageEight" navigation={navigation} showComponent={true} />}

            </LayoutPages>
        </View >
    )
}