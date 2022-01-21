import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {Link} from 'react-router-dom'
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
      <div className="alignTableCenter">
        <div
          testid="stateWiseCovidDataTable"
          className="tableBorder text-center"
        >
          <table>
            <tr className="bottomBorder">
              <th className="stateName">
                <div className="d-flex align-items-center">
                  <p>States/UT</p>
                  <div testid="stateWiseCovidDataTable">
                    <button
                      onClick={this.changeToAce}
                      type="button"
                      testid="ascendingSort"
                    >
                      <FcGenericSortingAsc className="tableIcon" />
                    </button>
                    <button
                      onClick={this.changeToDec}
                      type="button"
                      testid="descendingSort"
                    >
                      <FcGenericSortingDesc className="tableIcon" />
                    </button>
                  </div>
                </div>
              </th>
              <th className="count">Confirmed</th>
              <th className="count">Active</th>
              <th className="count">Recovered</th>
              <th className="count">Deceased</th>
              <th className="count">Population</th>
            </tr>

            {details.map(eachItem => (
              <tr className="highLIght">
                <td className="stateNameColumn">
                  <Link
                    to={`/state/${eachItem.stateCode}`}
                    className="colorName"
                  >
                    {eachItem.name}
                  </Link>
                </td>
                <td className="Confirmed">{eachItem.confirmed}</td>
                <td className="Active">{eachItem.active}</td>
                <td className="Recovered">{eachItem.recovered}</td>
                <td className="Deceased">{eachItem.deceased}</td>
                <td className="population">{eachItem.population}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

export default RenderTable
