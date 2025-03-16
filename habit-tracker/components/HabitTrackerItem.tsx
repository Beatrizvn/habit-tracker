import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import theme from '@/styles/Theme';
import { HabitTracker } from 'types/HabitTypes';

const HabitTrackerItem = ({ name, category, days }: HabitTracker ) => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {name} - {category}
      </Text>
      <Text style={styles.subtitle} >This Week</Text>
      <View style={styles.daysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.dayWrapper}>
            <View
              style={[
                styles.circle,
                { backgroundColor: days[index] ? theme.colors.primary : '#444' }, // Verde se preenchido, cinza se não
              ]}
            />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 12,
  },
});

export default HabitTrackerItem;