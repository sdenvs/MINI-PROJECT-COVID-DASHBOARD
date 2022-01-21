const ConvertdateList = dateObj => {
  const dateList = Object.keys(dateObj)

  const dateData = []
  dateList.forEach(eachItem => {
    const {total} = dateObj[eachItem]
    const obj = {
      date: eachItem,
      Recovered: total.recovered,
      Confirmed: total.confirmed,
      Deceased: total.deceased,
      Tested: total.tested,
      Active: total.confirmed - (total.deceased + total.recovered),
    }
    dateData.push(obj)
  })
  return dateData
}

export default ConvertdateList
