import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import LottieView from 'lottie-react-native';
import LegendCaptionArea from 'components/LegendTextArea';
import ButtonNavigation from 'components/ButtonNavigation';
import LayoutPages from '../../components/LayoutPages';
import { SoundNarrationContext } from "contextAPI/soundNarration";
import { textScene7 } from '../legendTextFile';
import * as Animatable from 'react-native-animatable';

const scene7JSON = require('../../../assets/animations/page7/page7.json');
const pig_speak = require('../../../assets/animations/page7/pigSpeaking.json');
const wolf = require('../../../assets/animations/page7/wolfDoor.json');
const narrationScene7 = require('../../../assets/sound/narration/Page07/Page7.mp3');

export default function PageSeven({ navigation }) {

    const { initNarrationSound } = useContext(SoundNarrationContext);
    const [loadingButtonNavigation, setloadingButton] = useState(false);
    const [load, setLoad] = useState(true);
    const animation_wolf = useRef();
    const animation_pig = useRef();
    const [isInteraction, setInteraction] = useState(false);

    function timeoutButtonNavegacao() {
        setTimeout(() => {
            setloadingButton(true);
            setInteraction(true);
        }, 4500);
    }

    useEffect(() => {
        navigation.addListener('focus', () => initNarrationSound(narrationScene7));
        animation_wolf.current?.reset();
        animation_pig.current?.reset();
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => setLoad(!load), timeoutButtonNavegacao());
        return () => {
            setloadingButton(false);
        };
    }, [navigation, load]);

    // animation_wolf.current?.play(210, 299);
    
    function start_animation_wolf() {
        animation_wolf.current?.play(0, 299);
        setInteraction(false);
        setTimeout(() => {
            animation_pig.current?.play();
            animation_wolf.current?.play(210, 299);
        }, 7000);
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
                loop={false}
                ref={animation_pig}
                style={styles.view_pig_speak}
            />
            <LottieView
                source={wolf}
                loop={true}
                ref={animation_wolf}
                style={styles.view_wolf}
            />
            <LayoutPages>
                <InteractionButton show={isInteraction} action={start_animation_wolf} />
                <LegendCaptionArea text={textScene7} />

                {loadingButtonNavigation && <ButtonNavigation proxRoute="PageEight" navigation={navigation} showComponent={true} />}
            </LayoutPages>
        </View >
    )
}

function InteractionButton(props){
    const button = props.show ? (
        <TouchableWithoutFeedback onPress={props.action}>
            <Animatable.View style={[styles.toggleView, styles.togglebadWolf]} animation="pulse" easing="linear" iterationCount="infinite" />
        </TouchableWithoutFeedback>
    ) : null;
    return button;
}