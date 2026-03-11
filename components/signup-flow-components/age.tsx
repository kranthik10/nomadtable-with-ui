import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

const MINIMUM_AGE = 18;
const ITEM_HEIGHT = 50;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function AgeScreen({ onNext }: { onNext?: (date?: Date) => void }) {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = range(currentYear - 100, currentYear - MINIMUM_AGE).reverse();

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(currentYear - MINIMUM_AGE);

  const dayRef = useRef<ScrollView>(null);
  const monthRef = useRef<ScrollView>(null);
  const yearRef = useRef<ScrollView>(null);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  const openPicker = () => {
    const d = date || new Date(currentYear - MINIMUM_AGE, 0, 1);
    setSelectedDay(d.getDate());
    setSelectedMonth(d.getMonth());
    setSelectedYear(d.getFullYear());
    setShowPicker(true);

    setTimeout(() => {
      dayRef.current?.scrollTo({ y: (d.getDate() - 1) * ITEM_HEIGHT, animated: false });
      monthRef.current?.scrollTo({ y: d.getMonth() * ITEM_HEIGHT, animated: false });
      const yearIndex = years.indexOf(d.getFullYear());
      if (yearIndex >= 0) yearRef.current?.scrollTo({ y: yearIndex * ITEM_HEIGHT, animated: false });
    }, 100);
  };

  const onConfirm = () => {
    const maxDay = getDaysInMonth(selectedMonth, selectedYear);
    const day = Math.min(selectedDay, maxDay);
    const selected = new Date(selectedYear, selectedMonth, day);
    setDate(selected);
    setShowPicker(false);
  };

  const isValid = () => {
    if (!date) return false;
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < date.getDate())) age--;
    return age >= MINIMUM_AGE;
  };

  const onPressNext = () => {
    if (isValid()) onNext?.(date || undefined);
  };

  const formatted = date
    ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : 'select date';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>when's your birthday?</Text>
          <Text style={styles.sub}>you must be at least 18 years old</Text>
        </View>

        <TouchableOpacity style={styles.selector} onPress={openPicker} activeOpacity={0.8}>
          <Text style={[styles.selectorText, !date && { color: '#6b7280' }]}>{formatted}</Text>
        </TouchableOpacity>

        <View style={styles.buttonWrap}>
          <Button title="next" onPress={onPressNext} variant="primary" size="large" disabled={!isValid()} />
        </View>

        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text style={styles.cancelButton}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfirm}>
                  <Text style={styles.confirmButton}>OK</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.pickerContent}>
                <View style={styles.centerHighlight} />
                
                <View style={styles.columnsContainer}>
                  <ScrollView
                    ref={dayRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
                    style={styles.column}
                    onMomentumScrollEnd={(e) => {
                      const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                      setSelectedDay(Math.min(index + 1, getDaysInMonth(selectedMonth, selectedYear)));
                    }}
                  >
                    {range(1, getDaysInMonth(selectedMonth, selectedYear)).map((day) => (
                      <View key={day} style={styles.item}>
                        <Text style={[styles.itemText, day === selectedDay && styles.selectedText]}>
                          {day.toString().padStart(2, '0')}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  <ScrollView
                    ref={monthRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
                    style={styles.column}
                    onMomentumScrollEnd={(e) => {
                      const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                      setSelectedMonth(index);
                    }}
                  >
                    {months.map((month, index) => (
                      <View key={month} style={styles.item}>
                        <Text style={[styles.itemText, index === selectedMonth && styles.selectedText]}>
                          {month}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  <ScrollView
                    ref={yearRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
                    style={styles.column}
                    onMomentumScrollEnd={(e) => {
                      const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                      setSelectedYear(years[index]);
                    }}
                  >
                    {years.map((year) => (
                      <View key={year} style={styles.item}>
                        <Text style={[styles.itemText, year === selectedYear && styles.selectedText]}>
                          {year}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 24, paddingTop: 24, flex: 1 },
  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logo: { fontSize: 28, fontWeight: '700' },
  headingWrap: { marginBottom: 20 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#374151', fontSize: 16 },
  selector: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
  },
  selectorText: { fontSize: 18, color: '#111827' },
  buttonWrap: { marginTop: 24, paddingHorizontal: 4 },
  
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  pickerContainer: {
    backgroundColor: '#444',
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 320,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  cancelButton: { color: '#ccc', fontSize: 16 },
  confirmButton: { color: '#fff', fontSize: 16, fontWeight: '600' },
  pickerContent: { position: 'relative', height: ITEM_HEIGHT * 5 },
  centerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 16,
    right: 16,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    zIndex: 1,
  },
  columnsContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  column: { 
    flex: 1, 
    height: ITEM_HEIGHT * 5 
  },
  item: { 
    height: ITEM_HEIGHT, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  itemText: { 
    color: '#999', 
    fontSize: 18 
  },
  selectedText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
});
