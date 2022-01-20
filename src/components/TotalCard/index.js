import './index.css'

const activeType = {
  Recovered: 'Recovered',
  Confirmed: 'Confirmed',
  Active: 'Active',
  Deceased: 'Deceased',
}

const TotalCard = props => {
  const {details, active, changeActive} = props

  const changeActiveFun = () => {
    changeActive(details.text)
  }

  const bgStyle = active === details.text ? `${active}-bg` : ''

  return (
    <div
      role="tab"
      tabIndex={0}
      onClick={changeActiveFun}
      testid={details.testid}
      className={`${details.text} totalCard ${bgStyle}`}
    >
      <h1>{details.text}</h1>
      <img src={details.imgUrl} alt="" />
      <p>{details.total}</p>
    </div>
  )
}

export default TotalCard
