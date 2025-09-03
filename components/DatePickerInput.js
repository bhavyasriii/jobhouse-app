import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, View } from 'react-native';

const DatePickerInput = ({ label, date, setDate }) => {
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (currentDate instanceof Date && !isNaN(currentDate)) {
      setDate(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={
            date instanceof Date && !isNaN(date)
              ? date.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) => {
            const selected = new Date(e.target.value);
            if (!isNaN(selected)) setDate(selected);
          }}
          style={styles.webInput}
        />
      ) : (
        <DateTimePicker
          value={date instanceof Date && !isNaN(date) ? date : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={styles.picker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  webInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  picker: {
    width: '100%',
  },
});

export default DatePickerInput;
