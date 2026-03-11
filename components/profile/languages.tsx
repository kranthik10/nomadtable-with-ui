import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LanguagesProps {
  languages?: { name: string; level: string }[];
  onEditPress?: () => void;
}

const Languages: React.FC<LanguagesProps> = ({
  languages = [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Fluent' },
    { name: 'French', level: 'Intermediate' }
  ],
  onEditPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Languages</Text>
        <TouchableOpacity onPress={onEditPress}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      {languages.map((language, index) => (
        <View key={index} style={styles.languageItem}>
          <Text style={styles.languageName}>{language.name}</Text>
          <Text style={styles.languageLevel}>{language.level}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  edit: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  languageName: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  languageLevel: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Languages;