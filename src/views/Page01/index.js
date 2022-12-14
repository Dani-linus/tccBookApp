import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import LegendCaptionArea from 'components/LegendTextArea';
import LottieView from 'lottie-react-native';
import LayoutPages from 'components/LayoutPages';
import ButtonNavigation from 'components/ButtonNavigation';
import { SoundContext } from 'contextAPI/sound';
import { SoundNarrationContext } from "contextAPI/soundNarration";
import { textScene1 } from 'views/legendTextFile';

// imports dos arquivos JSON das animações
const pigMomJSON = require('../../../assets/animations/page1/pigMom.json');
const pigSleepingJSON = require('../../../assets/animations/page1/pigSleeping.json');
const scene1JSON = require('../../../assets/animations/page1/page1.json');
const narrationScene1 = require('../../../assets/sound/narration/Page01/Page1.mp3');

export default function PageOne({ navigation }) {

    const { initNarrationSound } = useContext(SoundNarrationContext);
    const { updateVolumSound } = useContext(SoundContext);
    const [loadingButtonNavigation, setloadingButton] = useState(false);
    const [load, setLoad] = useState(true);
    const animation_pig_mom = useRef();
    const animation_pig_spleeping = useRef();
    const [isInteraction, setInteraction] = useState(false);
    const [isInteraction1, setInteraction1] = useState(false);
    
    function timeoutButtonNavegacao() {
        setTimeout(() => {
            setloadingButton(true);
            setInteraction(true);
            setInteraction1(true);
        }, 4500);
    }

   useEffect(() => {
        navigation.addListener('focus', () => initNarrationSound(narrationScene1));
        animation_pig_mom.current?.reset();
        animation_pig_spleeping.current?.reset();
        updateVolumSound();
    }, []);

    //Definido um timeout para apresentar o button de navegacao
    useEffect(() => {
        navigation.addListener('focus', () => setLoad(!load), timeoutButtonNavegacao());
        return () => {
            setloadingButton(false);
        };
    }, [navigation, load]);

    // animation_pig_spleeping.current?.play(0, 120);
    // animation_pig_mom.current?.play(0, 48);

    function startAnimationPigMom() {
        // animation_pig_mom.current?.play(48, 100);
        animation_pig_mom.current?.play();
        setInteraction(false);
        // setTimeout(() => {
        //     animation_pig_mom.current?.play(0, 48);
        // }, 5450);
    }

    function startAnimationPigSleeping() {
        // animation_pig_spleeping.current?.play(120, 299);
        animation_pig_spleeping.current?.play();
        setInteraction1(false);
        // setTimeout(() => {
        //     animation_pig_spleeping.current?.play(0, 120);
        // }, 4500);
    }

    return (

        <View style={styles.container}>
            <LottieView
                source={scene1JSON}
                autoPlay={true}
                loop={true}
                resizeMode='cover'
            />

            <LottieView
                source={pigMomJSON}
                ref={animation_pig_mom}
                // autoPlay={true}
                loop={false}
                style={styles.view_pig_mom}
            />
            <LottieView
                source={pigSleepingJSON}
                ref={animation_pig_spleeping}
                autoPlay={true}
                loop={true}
                style={styles.view_pig_sleepling}
            />

            <LayoutPages navigation={navigation}>

                <InteractionButton show={isInteraction} action={startAnimationPigMom} />
                <InteractionButton1 show={isInteraction1} action={startAnimationPigSleeping} />

                <LegendCaptionArea text={textScene1} />

                {loadingButtonNavigation && <ButtonNavigation proxRoute="PageTwo" navigation={navigation} showComponent={false} />}
            </LayoutPages>
        </View >
    )
}
function InteractionButton(props){
    const button = props.show ? (
        <TouchableWithoutFeedback onPress={props.action}>
            <Animatable.View style={[styles.toggleView, styles.togglePigMom]} animation="pulse" easing="linear" iterationCount="infinite" />
        </TouchableWithoutFeedback>
    ) : null;
    return button;
}

function InteractionButton1(props){
    const button = props.show ? (
        <TouchableWithoutFeedback onPress={props.action}>
            <Animatable.View style={[styles.toggleView, styles.togglePigSleeping]} animation="pulse" easing="linear" iterationCount="infinite" />
        </TouchableWithoutFeedback> 
    ) : null;
    return button;
}


