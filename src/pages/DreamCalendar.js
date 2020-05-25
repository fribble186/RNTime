import * as React from 'react';
import styles from '../styles';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

function DreamCalendar({navigation}) {
  const [selectedDate, changeSelectedDate] = React.useState('');
  return (
    <Calendar
      markedDates={{
        '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
        '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
      }}
      // Initially visible month. Default = Date()
      current={Date()}
      minDate={'2020-01-10'}
      maxDate={Date()}
      onDayPress={day => {
        console.log('selected day', day);
      }}
      monthFormat={'yyyy MM'}
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      hideArrows={false}
      hideExtraDays={true}
      disableMonthChange={false}
      hideDayNames={true}
      showWeekNumbers={false}
      disableArrowLeft={false}
      disableArrowRight={false}
    />
  );
}

export default DreamCalendar;
