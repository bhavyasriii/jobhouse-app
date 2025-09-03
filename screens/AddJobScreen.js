import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { JobContext } from '../utils/JobContext';

const AddJobScreen = ({ navigation }) => {
  const { addJob } = useContext(JobContext);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [statusDate, setStatusDate] = useState(new Date());

  const formatDate = (date) =>
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  const handleSubmit = () => {
    if (!title || !company || !status) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }

    addJob({
      title,
      company,
      status,
      date: formatDate(appliedDate),
      statusUpdatedOn: formatDate(statusDate),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />

      <Text style={styles.label}>Status</Text>
      {Platform.OS === 'web' ? (
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setStatusDate(new Date());
          }}
          style={styles.webSelect}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      ) : (
        <Picker
          selectedValue={status}
          onValueChange={(value) => {
            setStatus(value);
            setStatusDate(new Date());
          }}
          style={styles.input}
        >
          <Picker.Item label="Applied" value="Applied" />
          <Picker.Item label="Interview" value="Interview" />
          <Picker.Item label="Selected" value="Selected" />
          <Picker.Item label="Rejected" value="Rejected" />
          <Picker.Item label="Offer" value="Offer" />
        </Picker>
      )}

      <Text style={styles.label}>Applied Date</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={appliedDate.toISOString().split('T')[0]}
          onChange={(e) => setAppliedDate(new Date(e.target.value))}
          style={styles.webDateInput}
        />
      ) : (
        <DateTimePicker
          value={appliedDate}
          mode="date"
          display="default"
          onChange={(event, date) => date && setAppliedDate(date)}
        />
      )}

      <Text style={styles.label}>Status Updated Date</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={statusDate.toISOString().split('T')[0]}
          onChange={(e) => setStatusDate(new Date(e.target.value))}
          style={styles.webDateInput}
        />
      ) : (
        <DateTimePicker
          value={statusDate}
          mode="date"
          display="default"
          onChange={(event, date) => date && setStatusDate(date)}
        />
      )}

      <Button title="Save Job" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FAF8F4' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: { fontWeight: 'bold', marginBottom: 5 },
  webDateInput: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 20,
    width: '100%',
  },
  webSelect: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default AddJobScreen;

