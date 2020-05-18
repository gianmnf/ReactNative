import {StyleSheet} from 'react-native';
import Metrics from '../../styles/metrics';
import Colors from '../../styles/colors';

const Styles = StyleSheet.create({
  containerAcao: {
    flexDirection: 'row',
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    marginTop: -15,
  },
  icone: {
    fontSize: 30,
    color: '#000',
    marginRight: Metrics.baseMargin,
    marginTop: 10,
  },
  popMenuConteiner: {
    marginTop: 0,
  },
  item: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
  },
  textoItem: {
    paddingLeft: 5,
  },
});

export default Styles;
