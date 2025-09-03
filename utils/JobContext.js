import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const JobContext = createContext({
  jobs: [],
  addJob: () => {},
  updateJob: () => {},
  deleteJob: () => {},
  clearJobs: () => {},
});

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Load jobs from AsyncStorage when app starts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const storedJobs = await AsyncStorage.getItem('jobs');
        if (storedJobs !== null) {
          setJobs(JSON.parse(storedJobs));
        }
      } catch (error) {
        console.error('Failed to load jobs from AsyncStorage:', error);
      }
    };
    loadJobs();
  }, []);

  // Save jobs to AsyncStorage whenever they change
  useEffect(() => {
    const saveJobs = async () => {
      try {
        await AsyncStorage.setItem('jobs', JSON.stringify(jobs));
      } catch (error) {
        console.error('Failed to save jobs to AsyncStorage:', error);
      }
    };
    saveJobs();
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
    };
    setJobs((prev) => [...prev, newJob]);
  };

  const updateJob = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const deleteJob = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const clearJobs = () => {
    setJobs([]);
  };

  return (
    <JobContext.Provider
      value={{ jobs, addJob, updateJob, deleteJob, clearJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};
