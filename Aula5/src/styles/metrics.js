import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
    baseMargin: 10,
    basePadding: 20,
    baseRadius: 3,
    screenWidth: width,//width < height ? width : height,
    screenHeight: height//width < height ? height : width,
};
