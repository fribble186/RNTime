import * as React from 'react';
import {Image} from 'react-native';
import styles from '../styles';

var SparklersIcon = foucus =>
  foucus ? (
    <Image source={require('../img/sparklers.png')} style={styles.tab_icon} />
  ) : (
    <Image
      source={require('../img/sparklers_gray.png')}
      style={styles.tab_icon}
    />
  );

var DreamIcon = foucus =>
  foucus ? (
    <Image source={require('../img/dream.png')} style={styles.tab_icon} />
  ) : (
    <Image source={require('../img/dream_gray.png')} style={styles.tab_icon} />
  );

var AccountIcon = foucus =>
  foucus ? (
    <Image source={require('../img/account.png')} style={styles.tab_icon} />
  ) : (
    <Image
      source={require('../img/account_gray.png')}
      style={styles.tab_icon}
    />
  );

export {SparklersIcon, DreamIcon, AccountIcon};
