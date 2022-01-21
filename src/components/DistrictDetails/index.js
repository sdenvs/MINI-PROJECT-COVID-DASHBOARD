import './index.css'

const DistrictDetails = props => {
  const {details} = props
  return (
    <div className=" districtContainer ">
      <p className="districCount">{details[1]}</p>
      <p className="dustrictName">{details[0]}</p>
    </div>
  )
}

export default DistrictDetails
