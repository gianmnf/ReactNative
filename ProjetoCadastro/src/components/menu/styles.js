import {StyleSheet} from 'react-native';
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
    alignSelf: 'center',
  },
  lineTwoComplemento: {
    backgroundColor: Colors.whiteTransparent,
    height: 0.5,
    flex: 1,
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#646536',
    flex: 1,
  },
  headerContainer: {
    height: 70,
    backgroundColor: '#646536',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  headerText: {
    color: Colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 20,
    backgroundColor: '#646536',
    paddingTop: Metrics.basePadding,
    fontWeight: 'bold',
    fontFamily: 'Barlow Condensed',
  },
  headerImagem: {
    marginLeft: Metrics.baseMargin * 3,
    marginTop: Metrics.baseMargin * 2,
  },
  screenContainer: {
    paddingTop: Metrics.basePadding,
    width: '100%',
    backgroundColor: '#646536',
  },
  screenStyle: {
    height: 50,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: Metrics.basePadding - 5,
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: 'System',
    color: Colors.white,
    fontFamily: 'Barlow Condensed',
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: 'Barlow Condensed',
  },
  activeBackgroundColor: {
    backgroundColor: Colors.whiteTransparent,
  },
  icone: {
    fontSize: 20,
    color: Colors.white,
  },
  iconeHeader: {
    fontSize: 20,
    color: '#000',
    marginLeft: Metrics.baseMargin * 1.5,
    marginTop: Metrics.baseMargin * 3,
  },
});

export default Styles;
