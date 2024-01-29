import {Alert} from 'react-native';
import {NLCS_DOMAIN} from './constants';
export function getWeekDateList(startDate, endDate) {
  const dateList = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateList.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.clone().add(1, 'd');
  }
  return dateList;
}

export function isAdmin(userId) {
  return userId == 1;
}

export function mayAlert(response) {
  const {code, message} = response;
  if (!code || !message) {
    Alert.alert('Please try again later.');
    return;
  }

  if (response.code !== 1000) {
    Alert.alert(response.message);
  }

  return;
}

export function getGraduationYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({length: 15}, (_, i) => String(currentYear + i));
}

export function emailAllowed(email) {
  if (!email) {
    return false;
  }
  try {
    const emailDomain = email.split('@')[1];
    return emailDomain === NLCS_DOMAIN;
  } catch (_) {
    return false;
  }
}
