import React from 'react';
import {Modal, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Space from '../Space';
const INSTRUCTIONS = [
  '1. You can vote for the court you want to play on a half-termly basis.',
  '2. The breakouts on Friday and Saturday are divided into two sessions.',
  '3. You can vote for up to 2 sports and your first option will be weighed more than the second vote. If you do not select any of the options, it will be considered a null vote.',
  '4. You can edit your vote anytime before the deadline.',
  '5. Voting sports include volleyball, basketball, badminton, and netball.',
  '6. The deadline for voting is 7 days before the half-term starting date you are voting for. (e.g. the voting for Spring Term 2 closes on the 2nd of February)',
];

function Instruction({index}) {
  return (
    <>
      <Space size="h-2" />
      <Text className="text-[14px]">{INSTRUCTIONS[index]}</Text>
    </>
  );
}
export default function InfoModal({showInfoModal, setShowInfoModal}) {
  return (
    <Modal visible={showInfoModal} transparent animationType="slide">
      <View className="absolute bottom-1/4 left-[12.5%] h-1/2 w-3/4 rounded-xl bg-[#FFFFFFBB] px-4  py-8">
        <View className="h-[90%]">
          <Text className="h-[10%] text-center text-2xl font-bold text-purple-900">
            ℹ️ Voting Policies
          </Text>
          <Space size="h-1" />
          <ScrollView className="h-3/4">
            <Space size="h-6" />
            {INSTRUCTIONS.map((_, index) => {
              return <Instruction key={index} index={index} />;
            })}
          </ScrollView>
        </View>
        <View className="absolute bottom-2 right-6 h-[10%]">
          <TouchableOpacity
            className=""
            onPress={() => {
              setShowInfoModal(false);
            }}>
            <Text className="text-center text-lg font-semibold text-blue-900">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
