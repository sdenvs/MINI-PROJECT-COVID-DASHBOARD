import './index.css'

const activeType = {
  Recovered: 'Recovered',
  Confirmed: 'Confirmed',
  Active: 'Active',
  Deceased: 'Deceased',
}

const TotalCardState = props => {
  const {details, active, changeActive} = props

  const changeActiveFun = () => {
    changeActive(details.text)
  }

  const bgStyle = active === details.text ? `${active}-bg` : ''

  return (
    <div
      role="tab"
      tabIndex={0}
      testid={details.testid}
      onClick={changeActiveFun}
      className={`${details.text} totalCard ${bgStyle}`}
    >
      <div>
        <h1>{details.text}</h1>
        <img src={details.imgUrl} alt={details.altText} />
      </div>
      <p>{details.total}</p>
    </div>
  )
}

export default TotalCardState
