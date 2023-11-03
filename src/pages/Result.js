// import React, {useState} from 'react';
// import {
//   Alert,
//   TouchableOpacity,
//   ImageBackground,
//   View,
//   Text,
//   Modal,
//   ScrollView,
// } from 'react-native';

// import {styles, resultPageStyles, modalStyles} from '../styles/styles';
// import RNPickerSelect from 'react-native-picker-select';
// import MonthPicker from 'react-native-month-year-picker';
// import {ACTION_DATE_SET} from 'react-native-month-year-picker';
// import moment from 'moment';

// import APIManager from '../api';
// import {months, dayToString} from '../lib/constants';

// function ResultComponent() {
//   const today = new Date();
//   const todayDay = parseInt(today.getDate());
//   const todayWeek = Math.min(parseInt((todayDay - 1) / 7) + 1, 4);
//   const fullWeekList = [
//     {label: 'Week 1', value: 1},
//     {label: 'Week 2', value: 2},
//     {label: 'Week 3', value: 3},
//     {label: 'Week 4', value: 4},
//   ];

//   const [year, setYear] = useState(String(today.getFullYear()));
//   const [month, setMonth] = useState(String(today.getMonth() + 1));
//   const [week, setWeek] = useState('0');
//   const [date, setDate] = useState(
//     new Date(parseInt(year), parseInt(month) - 1),
//   );
//   const [dateList, setDateList] = useState([]);
//   const [selectedGrade, setSelectedGrade] = useState('');
//   const [weekSelectorShow, setWeekSelectorShow] = useState(false);
//   const [showResultModal, setShowResultModal] = useState(false);
//   const [weekList, setWeekList] = useState(
//     year == today.getFullYear() && month == today.getMonth() + 2
//       ? fullWeekList.slice(0, todayWeek)
//       : fullWeekList,
//   );
//   const [resultData, setResultData] = useState({});

//   const handleModalOpen = async () => {
//     if (!(week > '0')) {
//       Alert.alert('Please select week.');
//       return;
//     }
//     if (selectedGrade == '') {
//       Alert.alert('Please select grade.');
//       return;
//     }
//     setDateList(getDateRanges(year, month, week).dateList);
//     const apiResult = await APIManager.getVotingResult(
//       selectedGrade,
//       year,
//       month,
//       week,
//     );
//     if (apiResult.code == 6002 || apiResult.code == 6001) {
//       Alert.alert('The voting is still in progress.');
//       return;
//     }
//     if (apiResult.code != 1000) {
//       Alert.alert('Please try again later.');
//       return;
//     }
//     setResultData(apiResult.result);
//     setShowResultModal(true);
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/backgrounds.jpg')}
//       style={styles.bottomTabContainer}>
//       <Text style={styles.title1}>Sports Hall</Text>
//       <Text style={styles.title2}>VOTING SYSTEM</Text>
//       <Text style={styles.title3}>@NLCS JEJU</Text>
//       <Text style={resultPageStyles.label}>Grade</Text>
//       <View style={resultPageStyles.week}>
//         <RNPickerSelect
//           title=""
//           onValueChange={value => setSelectedGrade(value)}
//           placeholder={{
//             label: 'Grade ▽',
//             value: '',
//           }}
//           items={[
//             {label: 'MS', value: 'MS'},
//             {label: 'HS', value: 'HS'},
//           ]}
//           style={{
//             inputIOS: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//             inputAndroid: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//             placeholder: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//           }}
//         />
//       </View>
//       <Text style={resultPageStyles.label}>Year and Month</Text>
//       <TouchableOpacity
//         style={resultPageStyles.year_and_month}
//         onPress={() => setWeekSelectorShow(true)}>
//         <View>
//           <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
//             {new Date(date.valueOf() + 9 * 60 * 60 * 1000)
//               .toISOString()
//               .substring(0, 7)}{' '}
//             ▽
//           </Text>
//         </View>
//       </TouchableOpacity>
//       <Text style={resultPageStyles.label}>Week</Text>
//       <View style={resultPageStyles.week}>
//         <RNPickerSelect
//           title=""
//           onValueChange={value => setWeek(String(value))}
//           placeholder={{
//             label: 'Week ▽',
//             value: 0,
//           }}
//           items={weekList}
//           style={{
//             inputIOS: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//             inputAndroid: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//             placeholder: {
//               textAlign: 'center',
//               color: '#FFFFFF',
//               fontSize: 15,
//               padding: '3%',
//             },
//           }}
//         />
//       </View>
//       {weekSelectorShow && (
//         <MonthPicker
//           onChange={(event, date) => {
//             if (event == ACTION_DATE_SET) {
//               setDate(date);
//               setMonth(String(date.getMonth() + 1));
//               setYear(String(date.getFullYear()));
//               setWeekList(
//                 date.getFullYear() == today.getFullYear() &&
//                   date.getMonth() + 1 == today.getMonth() + 2
//                   ? fullWeekList.slice(0, todayWeek)
//                   : fullWeekList,
//               );
//             }
//             setWeekSelectorShow(false);
//           }}
//           value={date}
//           minimumDate={new Date(2023, 0)}
//           maximumDate={new Date(today.getFullYear(), today.getMonth() + 1)}
//           locale="ko"
//         />
//       )}
//       <TouchableOpacity
//         style={resultPageStyles.button}
//         onPress={handleModalOpen}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 18,
//             textAlign: 'center',
//             padding: '3%',
//           }}>
//           Check Voting Results
//         </Text>
//       </TouchableOpacity>
//       <ResultModal
//         visible={showResultModal}
//         setClose={() => {
//           setShowResultModal(false);
//         }}
//         year={year}
//         month={month}
//         week={week}
//         dateList={dateList}
//         resultData={resultData}
//       />
//     </ImageBackground>
//   );
// }

// export default ResultComponent;

// const ResultModal = ({
//   visible,
//   setClose,
//   year,
//   month,
//   week,
//   dateList,
//   resultData,
// }) => {
//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={modalStyles.modalOverlay}>
//         <View style={modalStyles.voteResultModal}>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontSize: 20,
//               color: 'black',
//               marginBottom: '5%',
//             }}>
//             Voting Results
//           </Text>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontSize: 15,
//               color: 'black',
//               marginBottom: '5%',
//             }}>
//             {months[parseInt(month) - 1]} {year} (Week {week})
//           </Text>
//           <View style={modalStyles.divider}></View>
//           <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
//             {dateList.map((dateString, i) => {
//               return (
//                 <View key={i}>
//                   <DayResult
//                     dateString={dateString}
//                     sports={resultData[dateString]?.sports ?? '정보 없음'}
//                   />
//                   <View style={modalStyles.divider}></View>
//                 </View>
//               );
//             })}
//           </ScrollView>
//           <View style={modalStyles.divider}></View>
//           <TouchableOpacity style={modalStyles.closeButton} onPress={setClose}>
//             <Text style={modalStyles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const DayResult = ({dateString, sports}) => {
//   const date = new Date(dateString);
//   const day = dayToString[date.getDay()];
//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginVertical: '5%',
//         }}>
//         <View style={{alignItems: 'center', width: '30%'}}>
//           <Text style={{textAlign: 'center'}}>
//             {months[date.getMonth()]} {date.getDate()}
//           </Text>
//           <Text style={{textAlign: 'center', color: 'purple'}}>({day})</Text>
//         </View>
//         <View style={{alignItems: 'center', width: '40%'}}>
//           <Text
//             style={{
//               textAlign: 'center',
//               color: getColorOfSports(sports),
//               fontSize: 18,
//             }}>
//             {sports}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const getColorOfSports = sports => {
//   if (!sports) return 'black';
//   if (sports == 'Basketball') return 'darkred';
//   if (sports == 'Volleyball') return 'darkgreen';
//   if (sports == 'Badminton') return 'darkblue';
//   return 'black';
// };

// function getDateRanges(year, month, week) {
//   const paddedMonth = month.padStart(2, '0'); // 3 -> 03, 12 -> 12
//   let startDate, endDate;
//   if (week == '4') {
//     startDate = moment(`${year}-${paddedMonth}`)
//       .startOf('month')
//       .add(week - 1, 'week');
//     endDate = moment(`${year}-${paddedMonth}`).endOf('month');
//   } else {
//     startDate = moment(`${year}-${paddedMonth}`)
//       .startOf('month')
//       .add(week - 1, 'week');
//     endDate = moment(`${year}-${paddedMonth}`)
//       .startOf('month')
//       .add(week, 'week')
//       .subtract(1, 'day');
//   }
//   return {
//     startDate: startDate.format('YYYY-MM-DD'),
//     endDate: endDate.format('YYYY-MM-DD'),
//     dateList: _getWeekDateList(startDate, endDate),
//   };
// }

// function _getWeekDateList(startDate, endDate) {
//   const dateList = [];
//   let currentDate = startDate;
//   while (currentDate <= endDate) {
//     dateList.push(currentDate.format('YYYY-MM-DD'));
//     currentDate = currentDate.clone().add(1, 'd');
//   }
//   return dateList;
// }
