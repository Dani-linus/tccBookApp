import { StyleSheet } from "react-native";

import { wp, hp } from '../CustomStyleFunction';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#56B2EB",
    },
    view_pig_speak:{
        position: 'absolute',
        width: wp(90),
        height: hp(90),
        top: wp(3),
        right: wp(-6),
    },
    view_wolf:{
        position:'absolute',
        width: wp(50),
        // height: hp(50),
        top: wp(3),
        left: wp(4),
    },
    toggleView: {
      position: 'absolute',
      backgroundColor: 'white',
      width: 40,
      height: 40,
      borderRadius: 50,
      opacity: 0.8,
      elevation: 2,
    },
    togglebadWolf: {
      left: wp(44),
      top: wp(35),
    },
})

export default styles;