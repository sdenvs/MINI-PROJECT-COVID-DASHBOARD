import './index.css'

const TotalCard = props => {
  const {details} = props

  return (
    <div testid={details.testid} className={`${details.text} totalCard`}>
      <h1>{details.text}</h1>
      <img src={details.imgUrl} alt="" />
      <p>{details.total}</p>
    </div>
  )
}

export default TotalCard
