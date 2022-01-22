import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import TotalStats from '../TotalStats'
import './index.css'

class RenderTable extends Component {
  state = {aaccending: true}

  changeToAce = () => {
    this.setState({aaccending: true})
  }

  changeToDec = () => {
    this.setState({aaccending: false})
  }

  render() {
    const {aaccending} = this.state
    const {details} = this.props
    console.log(details)
    if (!aaccending) {
      details.reverse()
    }
    return (
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <div className="overflow-container">
          <div className="table-header">
            <div className="state-name-heading">
              <p className="table-header-title ">States/UT</p>
              <button
                className="order"
                type="button"
                testid="ascendingSort"
                onClick={this.changeToAce}
              >
                <FcGenericSortingAsc className="order-icon" />
              </button>
              <button
                className="order"
                type="button"
                testid="descendingSort"
                onClick={this.changeToDec}
              >
                <FcGenericSortingDesc className="order-icon" />
              </button>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Confirmed</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Active</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Recovered</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Deceased</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Population</p>
            </div>
          </div>
          <div className="state-wise-data-container">
            <ul className="other-tables">
              {details.map(each => (
                <TotalStats key={each.stateCode} data={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default RenderTable
