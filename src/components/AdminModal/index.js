import React from 'react';
import {View, Text, TouchableOpacity, Modal, ScrollView} from 'react-native';
import Input from '../Input';
import Space from '../Space';
import {CategorySelector} from '../Dropdown';
export default function AdminModal({visible, onClose, onSubmit, categories}) {
  const [adminEmail, setAdminEmail] = React.useState('');
  const [reportedCategory, setReportedCategory] = React.useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex h-full w-full flex-col items-center justify-center bg-[#00000088]">
        <View className="flex h-1/2 w-3/4 items-center justify-center rounded-xl bg-gray-100 p-10 shadow-xl shadow-gray-600">
          <ScrollView className="w-full">
            <InputField
              label="Your Email"
              value={adminEmail}
              setValue={setAdminEmail}
            />
            <Space size="h-6" />
            <View className="w-full justify-center">
              <View className="absolute top-0 flex w-full flex-col">
                <Text className="text-center text-base font-bold text-blue-800">
                  Voting Type
                </Text>
                <CategorySelector
                  {...{
                    categories,
                    setSelectedCategory: setReportedCategory,
                    dark: true,
                    customStyle: {
                      height: 40,
                      width: '100%',
                      borderColor: '#0000BB',
                      borderWidth: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 8,
                      paddingRight: -8,
                      textAlign: 'center',
                      margin: 0,
                      fontSize: 12,
                    },
                    rowStyle: {
                      marginLeft: 0,
                      width: '55%',
                    },
                  }}
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
                  category_id: reportedCategory,
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
