import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SuggetionItem = props => {
  const {details} = props
  return (
    <li className="suggetion-item">
      <Link to={`/state/${details.state_code}`} className="LinkContainer">
        <p className="state-name">{details.state_name}</p>
        <div>
          <p className="state-code">{details.state_code}</p>
          <BiChevronRightSquare className="go-icon" />
        </div>
      </Link>
    </li>
  )
}
export default SuggetionItem
