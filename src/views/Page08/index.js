//página 5 do livro
import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/StyleViewPageOne';
import LegendCaptionArea from '../../components/LegendTextArea';
import LottieView from 'lottie-react-native';
import LayoutPages from '../../components/LayoutPages';

export default function PageOne({navigation}) {
    // Para cada animação, precisa de um ref distinto

    return (
        <View style={styles.container}>
                {/* animação de background */}
                <LottieView
                    source={require('../../animation/page1/page_1.json')}
                    autoPlay={true}
                    loop={true}
                    style={styles.view_animation_cover}>
                </LottieView>
                
                <LayoutPages>
                    {/* add elementos de interação */}

                <LegendCaptionArea text={'texto'} />
                <ButtonNavigation  proxRoute="PageSix" navigation={navigation}/>
                </LayoutPages>
        </View >
    )
}