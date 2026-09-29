import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';

// Typ-Definition für die Sensordaten
interface SensorData {
  x: number;
  y: number;
  z: number;
}

// Typ-Definition für das Subscription-Objekt von Expo
interface SubscriptionType {
  remove: () => void;
}

export default function SensorDebug() {
  const [{ x, y, z }, setData] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  
  const [subscription, setSubscription] = useState<SubscriptionType | null>(null);

  const subscribe = (): void => {
    Accelerometer.setUpdateInterval(100);
    
    const newSubscription = Accelerometer.addListener((sensorData: AccelerometerMeasurement) => {
      setData(sensorData);
    });

    setSubscription(newSubscription);
  };

  const unsubscribe = (): void => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const renderBar = (value: number, label: string) => {
    const cappedValue = Math.max(-2, Math.min(2, value));
    const barWidth = Math.abs(cappedValue) * 50; 

    return (
      <View style={styles.axisContainer}>
        <Text style={styles.axisLabel}>{label}: {value.toFixed(3)}</Text>
        
        <View style={styles.barWrapper}>
          <View style={styles.halfBarLeft}>
            {value < 0 && (
              <View style={[styles.barFill, { width: `${barWidth}%`, backgroundColor: '#ff4444' }]} />
            )}
          </View>

          <View style={styles.centerLine} />

          <View style={styles.halfBarRight}>
            {value > 0 && (
              <View style={[styles.barFill, { width: `${barWidth}%`, backgroundColor: '#00C851' }]} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Debug</Text>

      {renderBar(x, 'X-Achse')}
      {renderBar(y, 'Y-Achse')}
      {renderBar(z, 'Z-Achse')}

      <TouchableOpacity 
        style={[styles.button, subscription ? styles.buttonStop : styles.buttonStart]} 
        onPress={subscription ? unsubscribe : subscribe}
      >
        <Text style={styles.buttonText}>
          {subscription ? 'Pause' : 'Resume'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  axisContainer: {
    width: '100%',
    marginBottom: 25,
  },
  axisLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  barWrapper: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  halfBarLeft: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
  },
  halfBarRight: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
  },
  barFill: {
    height: '100%',
  },
  centerLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#333',
    zIndex: 10,
  },
  button: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonStart: {
    backgroundColor: '#00C851',
  },
  buttonStop: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});