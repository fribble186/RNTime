import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tab_icon: {
    width: 20,
    height: 20,
  },
  float_icon: {
    position: 'absolute',
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 45,
    bottom: 20,
    right: 20,
    backgroundColor: '#FFD954',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  done: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.15)',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  main_background: {
    backgroundColor: '#FFD954',
  },
  bold: {
    fontWeight: 'bold',
  },
  gray: {
    color: 'rgba(0,0,0,0.15)',
  },
  white: {
    color: 'white',
  },
  width_100: {
    width: '100%',
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex_column: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  align_center: {
    alignItems: 'center',
  },
  justify_center: {
    justifyContent: 'center',
  },
  flex_1: {
    flex: 1,
  },
  margin_top_30: {
    marginTop: 30,
  },
  margin_bottom_30: {
    marginBottom: 30,
  },
  margin_left_16: {
    marginLeft: 16,
  },
  margin_left_30: {
    marginLeft: 30,
  },
  margin_right_30: {
    marginRight: 30,
  },
  margin_top_16: {
    marginTop: 16,
  },
  margin_right_16: {
    marginRight: 16,
  },
  margin_bottom_16: {
    marginBottom: 16,
  },
  padding_LR_40: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  padding_TB_10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  padding_20: {
    padding: 20,
  },
  padding_8: {
    padding: 8,
  },
  text_10: {
    fontSize: 10,
  },
});

export default styles;
