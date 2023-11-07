import React from 'react';
import {Modal, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Space from '../Space';
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
            <Space size="h-2" />
            <Text className="text-[14px]">
              1. You can vote for sports court installation events on a weekly
              basis.
            </Text>
            <Space size="h-2" />
            <Text className="text-[14px]">
              2. There are 1 to 4 weeks per month, and the voting for the 5th
              week is included in the 4th week.
            </Text>
            <Space size="h-2" />
            <Text className="text-[14px]">
              3. When selecting the month and week, you can vote for sports
              events on a daily basis, ranking them from 1 to 3.
            </Text>
            <Space size="h-2" />
            <Text className="text-[14px]">
              4. Voting sports include volleyball, basketball and badminton.
            </Text>
            <Space size="h-2" />
            <Text className="text-[14px]">
              5. The deadline for voting for the Nth month, M-1th week is until
              the Mth week of the previous month.
            </Text>
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
