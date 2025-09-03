// ErrorBoundary.js
import { Component } from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ padding: 20 }}>
          <Text>Something went wrong. Check the console for details.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;