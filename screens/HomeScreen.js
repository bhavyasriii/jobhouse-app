import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { JobContext } from '../utils/JobContext';

const quotes = [
  "You're doing great. Every rejection is a redirection.",
  "Keep going. Something amazing is waiting for you.",
  "Rejections are redirections. Trust the process.",
  "Your dream job is just around the corner.",
  "Every no brings you closer to a yes.",
  "You’re capable of more than you know.",
  "The comeback is always stronger than the setback.",
];

const HomeScreen = ({ navigation }) => {
  const { jobs, clearJobs } = useContext(JobContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [quote, setQuote] = useState('');

  useFocusEffect(
    useCallback(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }, [])
  );

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportJobs = async () => {
    if (jobs.length === 0) {
      Alert.alert('No jobs to export');
      return;
    }
    try {
      const jobData = JSON.stringify(jobs, null, 2);
      await Share.share({
        message: jobData,
        title: 'My Job List',
      });
    } catch (error) {
      Alert.alert('Export failed', error.message);
    }
  };

  const handleClearJobs = () => {
    Alert.alert(
      'Clear All Jobs?',
      'Are you sure you want to delete all saved jobs?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Clear All',
          style: 'destructive',
          onPress: () => {
            clearJobs();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>Company: {item.company}</Text>
      <Text style={styles.jobStatus}>Status: {item.status}</Text>
      <Text style={styles.jobDate}>Applied On: {item.appliedDate || item.date}</Text>
      {item.statusUpdatedDate && (
        <Text style={styles.jobDate}>Status Updated On: {item.statusUpdatedDate}</Text>
      )}
      <Pressable
        style={styles.editButton}
        onPress={() => navigation.navigate('Edit Job', { jobId: item.id })}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>JobHouse Tracker</Text>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>💡 <Text style={{ fontStyle: 'italic' }}>{quote}</Text></Text>
      </View>

      <TextInput
        placeholder="Search by title or company..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No jobs match your search or all jobs cleared.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Pressable style={styles.addJobBtn} onPress={() => navigation.navigate('Add Job')}>
        <Text style={styles.addJobText}>➕ Add New Job</Text>
      </Pressable>

      <Pressable style={styles.exportBtn} onPress={handleExportJobs}>
        <Text style={styles.exportBtnText}>📤 Export Job List</Text>
      </Pressable>

      <Pressable style={styles.clearBtn} onPress={handleClearJobs}>
        <Text style={styles.clearBtnText}>🗑️ Clear All Jobs</Text>
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAF8F4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quoteContainer: {
    backgroundColor: '#FFF5CC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 14,
    color: '#444',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 14,
    marginTop: 4,
  },
  jobStatus: {
    fontSize: 14,
    marginTop: 4,
  },
  jobDate: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addJobBtn: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  addJobText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exportBtn: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  exportBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearBtn: {
    backgroundColor: '#DC3545',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  clearBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
