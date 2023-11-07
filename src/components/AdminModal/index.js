import React from 'react';
import {View, Text, TouchableOpacity, Modal, ScrollView} from 'react-native';
import Input from '../Input';
import Space from '../Space';
export default function AdminModal({visible, onClose, onSubmit}) {
  const [adminEmail, setAdminEmail] = React.useState('');
  const [reportYear, setReportYear] = React.useState('');
  const [reportMonth, setReportMonth] = React.useState('');
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex h-full w-full flex-col items-center justify-center bg-[#00000088]">
        <View className="flex h-fit w-3/4 items-center justify-center rounded-xl bg-gray-100 p-10 shadow-xl shadow-gray-600">
          <ScrollView className="w-full">
            <InputField
              label="Your Email"
              value={adminEmail}
              setValue={setAdminEmail}
            />
            <Space size="h-5" />
            <View className="flex w-full flex-row">
              <View className="w-[47.5%]">
                <InputField
                  label="Year"
                  value={reportYear}
                  setValue={setReportYear}
                />
              </View>
              <Space size="w-[5%]" />
              <View className="w-[47.5%]">
                <InputField
                  label="Month"
                  value={reportMonth}
                  setValue={setReportMonth}
                />
              </View>
            </View>
          </ScrollView>
          <Space size="h-8" />
          <View className="absolute bottom-0 right-5 mb-1 flex flex-row items-center justify-center">
            <TouchableOpacity
              className="flex h-10 items-center justify-center rounded-xl"
              onPress={async () => {
                await onSubmit({
                  email: adminEmail,
                  year: reportYear,
                  month: reportMonth,
                });
              }}>
              <Text className="text-lg font-bold text-[#008844]">Submit</Text>
            </TouchableOpacity>
            <Space size="w-5" />
            <TouchableOpacity
              className="flex h-10 items-center justify-center rounded-xl"
              onPress={onClose}>
              <Text className="text-lg font-bold text-[#004488]">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function InputField({label, value, setValue, placeholder}) {
  return (
    <>
      <Text className="text-center text-lg font-bold text-gray-900">
        {label}
      </Text>
      <Space size="h-1" />
      <Input
        value={value}
        setValue={setValue}
        extraClassName="text-normal h-9 w-full border-blue-900 text-gray-900 font-semibold border-2 rounded-xl"
        placeholder={placeholder}
      />
    </>
  );
}
