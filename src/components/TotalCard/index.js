import './index.css'

const activeType = {
  Recovered: 'Recovered',
  Confirmed: 'Confirmed',
  Active: 'Active',
  Deceased: 'Deceased',
}

const TotalCard = props => {
  const {details} = props

  return (
    <div
      role="tab"
      tabIndex={0}
      testid={details.testid}
      className={`${details.text} totalCard`}
    >
      <div>
        <p>{details.text}</p>
        <img src={details.imgUrl} alt={details.altText} />
      </div>
      <p>{details.total}</p>
    </div>
  )
}

export default TotalCard
