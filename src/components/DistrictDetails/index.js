import './index.css'

const DistrictDetails = props => {
  const {details, active} = props
  return (
    <div className=" districtContainer ">
      <p className="districCount">{details[active]}</p>
      <p className="dustrictName">{details.Name}</p>
    </div>
  )
}

export default DistrictDetails
