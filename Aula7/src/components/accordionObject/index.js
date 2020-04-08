import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import styles from './styles';

function AccordionObject({title, children, id, icone, estilo}) {
  return (
    <View
      style={
        estilo === null || estilo === undefined
          ? styles.container
          : estilo.containerAccordion
      }>
      <Collapse key={id}>
        <CollapseHeader>
          <View style={styles.detalheTituloContainer}>
            <View style={styles.detalheTituloContainer2}>
              <Icon
                name={icone}
                size={30}
                style={
                  estilo === null || estilo === undefined
                    ? styles.icon
                    : estilo.iconAccordion
                }
              />
              <Text
                style={
                  estilo === null || estilo === undefined
                    ? styles.titulo
                    : estilo.tituloAccordion
                }>
                {title}
              </Text>
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.conteudoContainer}>{children}</View>
        </CollapseBody>
      </Collapse>
    </View>
  );
}

export default AccordionObject;
