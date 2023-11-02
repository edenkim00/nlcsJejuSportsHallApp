export function getWeekDateList(startDate, endDate) {
  const dateList = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateList.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.clone().add(1, 'd');
  }
  return dateList;
}

export function isValidVoteData(voteData, dateRanges) {
  for (const date of dateRanges) {
    const data = voteData[date];
    if (!(data && data['1'] && data['2'] && data['3'])) {
      return false;
    }
  }
  return true;
}
