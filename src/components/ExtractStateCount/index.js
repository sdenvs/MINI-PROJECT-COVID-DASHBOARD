const ExtractStateCount = data => {
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
      altText: 'state specific confirmed cases pic',
      testid: 'stateSpecificConfirmedCasesContainer',
    },
    {
      text: 'Active',
      altText: 'state specific active cases pic',
      testid: 'stateSpecificActiveCasesContainer',
      total: active,
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/protection_2active_jf7dby.png',
    },
    {
      text: 'Recovered',
      total: recovered,
      altText: 'state specific recovered cases pic',
      testid: 'stateSpecificRecoveredCasesContainer',
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/recovered_1recovered_jogvut.png',
    },
    {
      text: 'Deceased',
      total: deceased,
      altText: 'state specific deceased cases pic',
      testid: 'stateSpecificDeceasedCasesContainer',
      imgUrl:
        'https://res.cloudinary.com/nani57/image/upload/v1642313511/Covid-19%20dashboard/breathing_1deceased_xvzewn.png',
    },
  ]
}

export default ExtractStateCount
