import React , { useContext, useEffect , useState} from 'react';
import { View } from 'react-native';
import styles from './style';
import LottieView from 'lottie-react-native';
import LayoutPages from 'components/LayoutPages';
import LegendCaptionArea from 'components/LegendTextArea';
import ButtonNavigation from 'components/ButtonNavigation';
import { SoundNarrationContext } from "contextAPI/soundNarration";
import { textScene6 } from '../legendTextFile';

const scene6JSON = require('../../../assets/animations/page6/page_6.json')
const narrationScene6 = require('../../../assets/sound/narration/Page06/Page6.mp3');

export default function PageSix({navigation}) {

    const { initNarrationSound } = useContext(SoundNarrationContext);
    const [loadingButtonNavigation, setloadingButton] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => initNarrationSound(narrationScene6));
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            setloadingButton(true);
        }, 3500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={scene6JSON}
                autoPlay={true}
                loop={true}
                resizeMode='cover'
                />

            <LayoutPages>
                {/* ... */}

                <LegendCaptionArea text={textScene6} />
                
                {loadingButtonNavigation  && <ButtonNavigation  proxRoute="PageSeven" navigation={navigation} showComponent={true}/>}

            </LayoutPages>
        </View >
    )
}