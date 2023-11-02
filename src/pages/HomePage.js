/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import {styles, modalStyles, homePageStyles} from '../styles/styles';
import RNPickerSelect from 'react-native-picker-select';
import MonthPicker from 'react-native-month-year-picker';
import {ACTION_DATE_SET} from 'react-native-month-year-picker';
import moment from 'moment';
import Storage from '../Storage';
import APIManager from '../api';

const dayToString = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function HomeComponent() {
  const today = new Date();
  const todayDay = parseInt(today.getDate(), 10);
  const todayWeek = Math.min(parseInt((todayDay - 1) / 7, 10) + 1, 4);
  const fullWeekList = [
    {label: 'Week 1', value: 1},
    {label: 'Week 2', value: 2},
    {label: 'Week 3', value: 3},
    {label: 'Week 4', value: 4},
  ];

  const [year, setYear] = useState(String(today.getFullYear()));
  const [month, setMonth] = useState(
    String(today.getMonth() + (todayWeek == 4 ? 3 : 2)),
  );
  const [week, setWeek] = useState('1');
  const [date, setDate] = useState(
    new Date(parseInt(year, 10), parseInt(month, 10) - 1),
  );
  const [dateList, setDateList] = useState([]);
  const [weekSelectorShow, setWeekSelectorShow] = useState(false);
  const [sportsData, setSportsData] = useState({});
  const [voteModalShow, setVoteModalShow] = useState(false);
  const [weekList, setWeekList] = useState(
    year == today.getFullYear() && month == today.getMonth() + 1
      ? fullWeekList.slice(todayWeek)
      : fullWeekList,
  );
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [voting, setVoting] = useState(false);

  const handleModalOpen = async () => {
    if (week > '0') {
      setVoteModalShow(true);
      const dateRanges = getDateRanges(year, month, week);
      setDateList(dateRanges.dateList);
    } else {
      Alert.alert('Please select Week.');
      return;
    }
  };
  const handleInfoModalOpen = () => {
    if (voteModalShow) {
      Alert.alert('Please close the vote modal first.');
      return;
    }
    setShowInfoModal(true);
  };
  const handleSubmit = async () => {
    if (voting) {
      Alert.alert('Please wait for the vote to finish.');
      return;
    }
    setVoting(true);
    if (!(sportsData && dateList && dateList.length >= 7)) {
      Alert.alert('Please Retry Again.');
      setVoteModalShow(false);
      setSportsData({});
      setVoting(false);
      return;
    }

    for (const date of dateList) {
      const data = sportsData[date];
      const sl = Object.values(data);
      if (
        !['Basketball', 'Volleyball', 'Badminton'].every(v => sl.includes(v))
      ) {
        Alert.alert(
          'Duplicate sports cannot be voted on for a single day vote.',
        );
        setVoting(false);
        return;
      }
    }

    if (!isValidVoteData(sportsData, dateList)) {
      Alert.alert('Please fill in all the vote blanks.');
      setVoting(false);
      return;
    }
    const [votingWeight, graduationYear] = await Promise.all([
      Storage.get('sportshall_votingWeight'),
      Storage.get('sportshall_graduationYear'),
    ]);
    const body = {
      voteData: sportsData,
      votingWeight,
      year,
      month,
      week,
      graduationYear,
    };
    const apiResult = await APIManager.vote(body);
    if (!apiResult) {
      Alert.alert('Authorization failed. Please re-login.');
      setVoting(false);
      return;
    }
    if (apiResult.code == 1000) {
      Alert.alert('Successfully Vote counted.');
      setVoting(false);
      setVoteModalShow(false);
      setSportsData({});
      return;
    } else if (apiResult.code == 1001) {
      Alert.alert('Please retry again later.');
      setVoting(false);
      return;
    } else if (apiResult.code == 3001) {
      Alert.alert('Please retry again later.');
      setVoting(false);
      return;
    } else if (apiResult.code == 4001) {
      Alert.alert('Please retry again later.');
      setVoting(false);
      return;
    } else if (apiResult.code == 5001) {
      Alert.alert(
        'Your vote are already counted in this date.',
        'Do you wanna change your vote?',
        [
          {
            text: 'No',
            onPress: () => {
              setVoting(false);
              return;
            },
            style: 'No',
          },
          {
            text: 'Change Vote',
            onPress: async () => {
              const apiResult = await APIManager.voteChange(body);
              if (apiResult.code == 1000) {
                Alert.alert('Successfully Vote counted.');
                setVoting(false);
                setSportsData({});
                setVoteModalShow(false);
                return;
              } else {
                Alert.alert('Please retry again later.');
                setVoting(false);
                return;
              }
            },
          },
        ],
      );
    }
    setVoting(false);
    return;
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/backgrounds.jpg')}
        style={styles.bottomTabContainer}>
        <Text style={styles.title1}>Sports Hall</Text>
        <Text style={styles.title2}>VOTING SYSTEM</Text>
        <Text style={styles.title3}>@NLCS JEJU</Text>
        <TouchableOpacity
          style={homePageStyles.info_button}
          onPress={handleInfoModalOpen}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              textAlign: 'center',
              padding: '3%',
            }}>
            🗣️ Learning Voting Policies
          </Text>
        </TouchableOpacity>
        <Text style={homePageStyles.label}>Year and Month</Text>
        <TouchableOpacity
          style={homePageStyles.year_and_month}
          onPress={() => setWeekSelectorShow(true)}>
          <View>
            <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
              {new Date(date.valueOf() + 9 * 60 * 60 * 1000)
                .toISOString()
                .substring(0, 7)}{' '}
              ▽
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={homePageStyles.label}>Week</Text>
        <View style={homePageStyles.week}>
          <RNPickerSelect
            title=""
            onValueChange={value => setWeek(String(value))}
            placeholder={{
              label: 'Week ▽',
              value: 0,
            }}
            items={weekList}
            style={{
              inputIOS: {
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '3%',
              },
              inputAndroid: {
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '3%',
              },
              placeholder: {
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '3%',
              },
            }}
          />
        </View>
        {weekSelectorShow && (
          <MonthPicker
            onChange={(event, date) => {
              if (event == ACTION_DATE_SET) {
                setDate(date);
                setMonth(String(date.getMonth() + 1));
                setYear(String(date.getFullYear()));
                setWeekList(
                  date.getFullYear() == today.getFullYear() &&
                    date.getMonth() + 1 == today.getMonth() + 2
                    ? fullWeekList.slice(todayWeek)
                    : fullWeekList,
                );
              }
              setWeekSelectorShow(false);
            }}
            value={date}
            minimumDate={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + (todayWeek == 4 ? 2 : 1),
              )
            }
            maximumDate={new Date(2028, 12)}
            locale="ko"
          />
        )}
        <TouchableOpacity
          style={homePageStyles.select_sports_button}
          onPress={handleModalOpen}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              padding: '3%',
            }}>
            Select Sports
          </Text>
        </TouchableOpacity>
        <HalfScreenModal
          visible={voteModalShow}
          year={year}
          month={month}
          week={week}
          dateList={dateList}
          setData={setSportsData}
          sportsData={sportsData}
          onSubmit={async () => {
            await handleSubmit();
          }}
          onClose={() => {
            setSportsData({});
            setVoteModalShow(false);
          }}
        />

        <InfoModal
          visible={showInfoModal}
          onClose={() => {
            setShowInfoModal(false);
          }}></InfoModal>
      </ImageBackground>
    </>
  );
}

export default HomeComponent;

const InfoModal = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              color: 'black',
              marginBottom: '10%',
            }}>
            ℹ️ Voting Policies
          </Text>
          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 12,
                color: 'black',
                marginBottom: '3%',
              }}>
              1. You can vote for sports court installation events on a weekly
              basis.
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 12,
                color: 'black',
                marginBottom: '3%',
              }}>
              2. There are 1 to 4 weeks per month, and the voting for the 5th
              week is included in the 4th week.
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 12,
                color: 'black',
                marginBottom: '3%',
              }}>
              3. When selecting the month and week, you can vote for sports
              events on a daily basis, ranking them from 1 to 3.
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 12,
                color: 'black',
                marginBottom: '3%',
              }}>
              4. Voting sports include volleyball, basketball and badminton.
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 12,
                color: 'black',
                marginBottom: '3%',
              }}>
              5. The deadline for voting for the Nth month, M-1th week is until
              the Mth week of the previous month.
            </Text>
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                  padding: '3%',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const HalfScreenModal = ({
  visible,
  onSubmit,
  onClose,
  year,
  month,
  week,
  dateList,
  sportsData,
  setData,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text
            style={{
              textAlign: 'center',
              marginLeft: '25%',
              fontSize: 16,
              color: 'green',
              marginBottom: '5%',
            }}>
            Priority
          </Text>
          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
            {dateList.map((d, i) => {
              return (
                <View key={i}>
                  <SportsVoteComponent
                    sportsData={sportsData}
                    dateString={d}
                    setData={setData}></SportsVoteComponent>
                  <View style={modalStyles.divider}></View>
                </View>
              );
            })}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={onSubmit}>
              <Text style={modalStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const SportsPickerComponent = ({order, sportsData, setData, dateString}) => {
  return (
    <View
      style={{
        borderColor: 'rgba(0,125,180,0.8)',
        borderWidth: 1,
        width: '100%',
        marginHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <RNPickerSelect
        onValueChange={value => {
          setData({
            ...sportsData,
            [dateString]: {
              ...(sportsData[dateString] || {}),
              [order]: value,
            },
          });
        }}
        placeholder={{
          label: `▽`,
          value: '',
        }}
        items={[
          {label: 'Basketball', value: 'Basketball'},
          {label: 'Badminton', value: 'Badminton'},
          {label: 'Volleyball', value: 'Volleyball'},
        ]}
        style={{
          inputIOS: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          },
          inputAndroid: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          },
          placeholder: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          },
        }}
      />
    </View>
  );
};

const SportsVoteComponent = ({dateString, sportsData, setData}) => {
  const date = new Date(dateString);
  const day = dayToString[date.getDay()];
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={{alignItems: 'center', width: '20%'}}>
          <Text style={modalStyles.label}> </Text>
          <Text style={{textAlign: 'center'}}>
            {months[date.getMonth()]} {date.getDate()}
          </Text>
          <Text style={{textAlign: 'center', color: 'purple'}}>({day})</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '22%',
          }}>
          <Text style={modalStyles.label}>1</Text>
          <SportsPickerComponent
            dateString={dateString}
            order={'1'}
            sportsData={sportsData}
            setData={setData}></SportsPickerComponent>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '22%',
          }}>
          <Text style={modalStyles.label}>2</Text>
          <SportsPickerComponent
            dateString={dateString}
            order={'2'}
            sportsData={sportsData}
            setData={setData}></SportsPickerComponent>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '22%',
          }}>
          <Text style={modalStyles.label}>3</Text>
          <SportsPickerComponent
            dateString={dateString}
            order={'3'}
            sportsData={sportsData}
            setData={setData}></SportsPickerComponent>
        </View>
      </View>
    </View>
  );
};

function getDateRanges(year, month, week) {
  const paddedMonth = month.padStart(2, '0'); // 3 -> 03, 12 -> 12
  let startDate, endDate;
  if (week == '4') {
    startDate = moment(`${year}-${paddedMonth}`)
      .startOf('month')
      .add(week - 1, 'week');
    endDate = moment(`${year}-${paddedMonth}`).endOf('month');
  } else {
    startDate = moment(`${year}-${paddedMonth}`)
      .startOf('month')
      .add(week - 1, 'week');
    endDate = moment(`${year}-${paddedMonth}`)
      .startOf('month')
      .add(week, 'week')
      .subtract(1, 'day');
  }
  return {
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    dateList: getWeekDateList(startDate, endDate),
  };
}

function getWeekDateList(startDate, endDate) {
  const dateList = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateList.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.clone().add(1, 'd');
  }
  return dateList;
}

function isValidVoteData(voteData, dateRanges) {
  for (const date of dateRanges) {
    const data = voteData[date];
    if (!(data && data['1'] && data['2'] && data['3'])) {
      return false;
    }
  }
  return true;
}
