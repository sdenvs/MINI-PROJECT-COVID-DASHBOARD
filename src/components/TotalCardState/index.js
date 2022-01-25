import './index.css'

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
        <p>{details.text}</p>
        <img src={details.imgUrl} alt={details.altText} />
      </div>
      <p>{details.total}</p>
    </div>
  )
}

export default TotalCardState
