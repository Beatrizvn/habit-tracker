import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { Text } from "@components/Text";
import { useForm, Controller } from "react-hook-form";
import theme from "@/styles/Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

type SelectOption = {
  label: string;
  value: string | number;
};

// Props do componente
type SelectModalProps = {
  options: SelectOption[];
  onSelect: (value: SelectOption) => void;
  selectedValue?: string | number;
  placeholder?: string;
};

export const SelectModal = ({
  options,
  onSelect,
  selectedValue,
  placeholder = "Selecione uma opção",
}: SelectModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Encontra o label da opção selecionada
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const renderItem = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        onSelect(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão que abre o modal */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>{displayText}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
