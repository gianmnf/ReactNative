import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../styles/index';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.success,
    borderRadius: metrics.baseMargin,
    marginTop: metrics.baseMargin,
    marginLeft: metrics.baseMargin,
    marginRight: metrics.baseMargin,
  },
  detalheTituloContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detalheTituloContainer2: {
    display: 'flex',
    flexDirection: 'row',
  },
  titulo: {
    fontSize: 13,
    color: colors.white,
    margin: metrics.baseMargin,
    fontFamily: 'Barlow Condensed',
  },
  conteudoContainer: {
    marginTop: metrics.baseMargin,
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.white,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default styles;
