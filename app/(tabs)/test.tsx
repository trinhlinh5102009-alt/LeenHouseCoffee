// app/(tabs)/test.tsx - Test Connection Screen
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../src/services/api';

export default function TestConnectionScreen() {
  const [status, setStatus] = useState<string>('Chưa test');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLoading(true);
    setLogs([]);
    addLog('🚀 Bắt đầu test connection...');
    
    try {
      addLog('📡 Gọi API: /test/hello');
      const response = await api.get('/test/hello');
      
      addLog('✅ Success! Status: ' + response.status);
      addLog('📦 Data: ' + JSON.stringify(response.data));
      
      setStatus('✅ KẾT NỐI THÀNH CÔNG!');
      Alert.alert('Thành công', 'Backend đang hoạt động!');
    } catch (error: any) {
      addLog('❌ Error: ' + error.message);
      
      if (error.code === 'ERR_NETWORK') {
        addLog('⚠️ Network Error - Backend không chạy hoặc URL sai');
        setStatus('❌ NETWORK ERROR - CHECK BACKEND');
      } else if (error.response) {
        addLog('📛 Response Error - Status: ' + error.response.status);
        setStatus('❌ BACKEND ERROR: ' + error.response.status);
      } else {
        addLog('💥 Unknown Error');
        setStatus('❌ UNKNOWN ERROR');
      }
      
      Alert.alert('Lỗi kết nối', error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setLogs([]);
    addLog('🔐 Test Login API...');
    
    try {
      addLog('📡 POST /auth/login');
      const response = await api.post('/auth/login', {
        email: 'test@example.com',
        password: 'wrongpassword'
      });
      
      addLog('Response: ' + JSON.stringify(response.data));
    } catch (error: any) {
      if (error.response?.status === 400) {
        addLog('✅ API hoạt động! (400 là expected vì wrong password)');
        setStatus('✅ LOGIN API WORKS');
      } else {
        addLog('❌ Error: ' + error.message);
        setStatus('❌ ERROR: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🔧 Test Backend Connection</Text>
        
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={testConnection}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : '🔍 Test /test/hello'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary, loading && styles.buttonDisabled]}
          onPress={testLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : '🔐 Test /auth/login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.logsCard}>
          <Text style={styles.logsTitle}>📋 Logs:</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Debug Info:</Text>
          <Text style={styles.infoText}>Platform: {require('react-native').Platform.OS}</Text>
          <Text style={styles.infoText}>BASE_URL: Check console logs</Text>
          <Text style={styles.infoText}>Expected: http://10.0.2.2:8080/api</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#db2777',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#db2777',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonSecondary: {
    backgroundColor: '#9f1239',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  logsCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  logText: {
    fontSize: 12,
    color: '#00ff00',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  infoCard: {
    backgroundColor: '#e0f2fe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#0c4a6e',
    marginBottom: 4,
  },
});