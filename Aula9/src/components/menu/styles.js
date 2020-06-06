import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Metrics from '../../styles/metrics';

const Styles = StyleSheet.create({

    line: {
        flexDirection: 'row',
    },
    lineOneComplemento: {
        backgroundColor: Colors.whiteTransparent,
        height: 2,
        flex: 1,
        alignSelf: "center"
    },
    lineTwoComplemento: {
        backgroundColor: Colors.whiteTransparent,
        height: 0.5,
        flex: 1,
        alignSelf: "center"
    },
    container: {
        alignItems: 'center',
        backgroundColor: Colors.amareloMenu,
        flex: 1
    },
    headerContainer: {
        height: 70,
        backgroundColor: Colors.amareloMenu,
        alignSelf : "flex-start",
        flexDirection: 'row' 
    },
    headerText: {
        color: Colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 20,
        backgroundColor: Colors.amareloMenu,
        paddingTop: Metrics.basePadding,
        fontWeight: 'bold', 
        fontFamily: 'Poppins-Light'
    },
    headerImagem: {
        
        marginLeft: Metrics.baseMargin * 3,
        marginTop: Metrics.baseMargin * 2,
         
    },
    screenContainer: {
        paddingTop: Metrics.basePadding,
        width: '100%',
        backgroundColor: Colors.amareloMenu,
    },
    screenStyle: {
        height: 50,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: Metrics.basePadding - 5
    },
    screenTextStyle: {
        fontSize: 20,
        marginLeft: Metrics.baseMargin,
        textAlign: 'center',
        fontFamily: "System",
        color: Colors.white,
        fontFamily: 'Poppins-Light'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: 'Poppins-Light'
    },
    activeBackgroundColor: {
        backgroundColor: Colors.whiteTransparent,

    },
    icone: {
        fontSize: 20,
        color: Colors.white
    },
    iconeHeader: {
        fontSize: 20,
        color: Colors.white,
        marginLeft: Metrics.baseMargin * 1.5,
        marginTop: Metrics.baseMargin * 3,
    }
});

export default Styles;