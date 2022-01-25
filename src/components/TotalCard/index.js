import './index.css'

const TotalCard = props => {
  const {details} = props

  return (
    <div testid={details.testId} className={`${details.text} totalCard`}>
      <p>{details.text}</p>
      <img src={details.imgUrl} alt={details.altText} />

      <p>{details.total}</p>
    </div>
  )
}

export default TotalCard
