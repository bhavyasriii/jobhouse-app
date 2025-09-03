import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePickerInput from '../components/DatePickerInput';
import { JobContext } from '../utils/JobContext';

const EditJobScreen = () => {
  const { updateJob, deleteJob, jobs } = useContext(JobContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = route.params;

  const jobToEdit = jobs.find((job) => job.id === jobId);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [statusUpdatedDate, setStatusUpdatedDate] = useState(new Date());

  const statusOptions = ['Applied', 'Interview', 'Rejected', 'Offer'];

  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title || '');
      setCompany(jobToEdit.company || '');
      setStatus(jobToEdit.status || 'Applied');

      // Safely parse dates
      setAppliedDate(
        jobToEdit.appliedDate ? new Date(jobToEdit.appliedDate) : new Date()
      );
      setStatusUpdatedDate(
        jobToEdit.statusUpdatedDate
          ? new Date(jobToEdit.statusUpdatedDate)
          : new Date()
      );
    }
  }, [jobToEdit]);

  const handleUpdate = () => {
    const updatedJob = {
      id: jobId,
      title,
      company,
      status,
      appliedDate: appliedDate.toISOString().split('T')[0],
      statusUpdatedDate: statusUpdatedDate.toISOString().split('T')[0],
    };
    updateJob(updatedJob);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteJob(jobId);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter job title"
      />

      <Text style={styles.label}>Company</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
        placeholder="Enter company name"
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
          style={Platform.OS === 'web' ? styles.pickerWeb : styles.picker}
        >
          {statusOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <DatePickerInput
        label="Applied Date"
        date={appliedDate}
        setDate={setAppliedDate}
      />

      <DatePickerInput
        label="Status Updated Date"
        date={statusUpdatedDate}
        setDate={setStatusUpdatedDate}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>UPDATE JOB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>DELETE JOB</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fcf6ee',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  pickerWrapper: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerWeb: {
    height: 40,
    width: '100%',
    padding: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditJobScreen;
