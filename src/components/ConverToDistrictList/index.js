const ConverToDistrictList = Districts => {
  const keyNames = Object.keys(Districts)
  const districtList = []
  keyNames.forEach(eachItem => {
    const {total} = Districts[eachItem]
    const Confirmed = total.confirmed ? total.confirmed : 0
    const Deceased = total.deceased ? total.deceased : 0
    const Recovered = total.recovered ? total.recovered : 0
    const Tested = total.tested ? total.tested : 0

    districtList.push({
      Name: eachItem,
      Confirmed,
      Deceased,
      Recovered,
      Tested,
      Active: Confirmed - (Deceased + Recovered),
    })
  })
  return districtList
}

export default ConverToDistrictList
