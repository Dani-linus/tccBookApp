import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import LottieView from 'lottie-react-native';
import LegendCaptionArea from '../../components/LegendTextArea';
import ButtonNavigation from '../../components/ButtonNavigation';
import LayoutPages from '../../components/LayoutPages';
import { SoundNarrationContext } from "contextAPI/soundNarration";
import { SoundContext } from 'contextAPI/sound';
import { textScene8 } from '../legendTextFile';
import * as Animatable from 'react-native-animatable';

const scene8JSON = require('../../../assets/animations/page8/page8.json');
const narrationScene8 = require('../../../assets/sound/narration/Page08/Page8.mp3');
const wolfBlowing = require('../../../assets/animations/page8/wolfBlowingStrawHouse.json');

export default function PageEight({ navigation }) {

    const { initNarrationSound } = useContext(SoundNarrationContext);
    const { playSoundEffects } = useContext(SoundContext);
    const [loadingButtonNavigation, setloadingButton] = useState(false);
    const [load, setLoad] = useState(true);
    const animation_wolfBlowing = useRef();
    const [isInteraction, setInteraction] = useState(false);

    function timeoutButtonNavegacao() {
        setTimeout(() => {
            setloadingButton(true);
            setInteraction(true);
        }, 4500);
    }

    useEffect(() => {
        navigation.addListener('focus', () => initNarrationSound(narrationScene8));
        animation_wolfBlowing.current?.reset();
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => setLoad(!load), timeoutButtonNavegacao());
        return () => {
            setloadingButton(false);
        };
    }, [navigation, load]);

    // animation_wolfBlowing.current?.play(70, 145);

    function start_animation_wolfBlowing() {
        animation_wolfBlowing.current?.play(145, 299);
        playSoundEffects();
        setInteraction(false);
        // setTimeout(() => {
        //     animation_wolfBlowing.current?.play(290, 290);
        // }, 4000);
    }

    return (
        <View style={styles.container}>
            <LottieView
                source={scene8JSON}
                autoPlay={true}
                loop={true}
                resizeMode='cover'
            />

            <LottieView
                source={wolfBlowing}
                ref={animation_wolfBlowing}
                loop={true}
                style={styles.view_wolfBlowing}
            />

            <LayoutPages>
                <InteractionButton show={isInteraction} action={start_animation_wolfBlowing} />
                <LegendCaptionArea text={textScene8} />
                {loadingButtonNavigation && <ButtonNavigation proxRoute="PageNine" navigation={navigation} showComponent={true} />}
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