const ExtractCountryCount = data => {
  let confirmed = 0
  let active = 0
  let recovered = 0
  let deceased = 0

  data.forEach(eachItem => {
    confirmed += eachItem.confirmed
    active += eachItem.active
    recovered += eachItem.recovered
    deceased += eachItem.deceased
  })
  return [
    {
      text: 'Confirmed',
      total: confirmed,
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/check-mark_1confirmed_w6adnp.png',
      altText: 'country wide confirmed cases pic',
      testId: 'countryWideConfirmedCases',
    },
    {
      text: 'Active',
      altText: 'country wide active cases pic',
      testId: 'countryWideActiveCases',
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/protection_2active_jf7dby.png',
      total: active,
    },
    {
      text: 'Recovered',
      total: recovered,
      altText: 'country wide recovered cases pic',
      testId: 'countryWideRecoveredCases',
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/recovered_1recovered_jogvut.png',
    },
    {
      text: 'Deceased',
      total: deceased,
      altText: 'country wide deceased cases pic',
      testId: 'countryWideDeceasedCases',
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/breathing_1deceased_xvzewn.png',
    },
  ]
}

export default ExtractCountryCount
