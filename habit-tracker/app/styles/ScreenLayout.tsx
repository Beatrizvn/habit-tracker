import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '@/styles/Theme';

interface ScreenLayoutProps {
  children: ReactNode;
}

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: theme.colors.background,
    padding: 24
  },
});

export default ScreenLayout;