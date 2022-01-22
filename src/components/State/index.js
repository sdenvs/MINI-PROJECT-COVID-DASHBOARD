import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ConverToDistrictList from '../ConverToDistrictList'
import ExtractStateCount from '../ExtractStateCount'
import Header from '../Header'
import TotalCardState from '../TotalCardState'
import DistrictDetails from '../DistrictDetails'
import ConvertdateList from '../CovertdateList'
import RenderBarChart from '../BarChart/index'
import RenderLineChart from '../LineChart/index'
import Footer from '../Footer'
import './index.css'

const renderStatusList = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failed: 'failed',
}
const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const activeType = {
  Confirmed: 'Confirmed',
  Active: 'Active',
  Recovered: 'Recovered',
  Deceased: 'Deceased',
  Tested: 'Tested',
}

const activeTypeForChart = [
  'Confirmed',
  'Active',
  'Recovered',
  'Deceased',
  'Tested',
]

class States extends Component {
  state = {
    renderStatus: renderStatusList.progress,
    renderTimelineStatus: renderStatusList.progress,
    dateData: [],
    stateData: [],
    stateName: '',
    totalCount: [],
    active: activeType.Confirmed,
    districtList: [],
    sortable: [],
    sortedDistrictList: [],
  }

  componentDidMount() {
    this.fetchStateDetails()
    this.fetchStateTimelineDetails()
  }

  fetchStateTimelineDetails = async () => {
    const {match} = this.props
    const {stateCode} = match.params
    this.setState({renderStatus: renderStatusList.progress})
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const stateData = data[stateCode]
      const dateData = ConvertdateList(stateData.dates)

      this.setState({renderTimelineStatus: renderStatusList.success, dateData})
    }
  }

  fetchStateDetails = async () => {
    const {active} = this.state
    const {match} = this.props
    const {stateCode} = match.params
    this.setState({renderStatus: renderStatusList.progress})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const {total} = data[stateCode]
      const totalList = [
        {
          ...total,
          active: total.confirmed - (total.deceased + total.recovered),
        },
      ]
      const totalCount = ExtractStateCount(totalList)
      const districtList = ConverToDistrictList(data[stateCode].districts)
      const sortable = []
      districtList.forEach(eachItem => {
        sortable.push([eachItem.Name, eachItem[active]])
      })
      sortable.sort((a, b) => b[1] - a[1])

      this.setState({
        renderStatus: renderStatusList.success,
        stateData: data[stateCode],
        totalCount,
        stateName: statesList.find(state => state.state_code === stateCode)
          .state_name,
        districtList,
        sortable,
      })
    }
  }

  sequenceList = () => {
    const {districtList, active} = this.state
    if (districtList.length > 0) {
      const sortable = []
      districtList.forEach(eachItem => {
        sortable.push([eachItem.Name, eachItem[active]])
      })
      sortable.sort((a, b) => b[1] - a[1])

      this.setState({sortable})
    }
  }

  renderLoadingView = () => (
    <div
      testid="stateDetailsLoader"
      className="products-loader-container Loader-container"
    >
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderTimelineLoadingView = () => (
    <div
      testid="timelinesDataLoader"
      className="products-loader-container Loader-container"
    >
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  changeActive = text => {
    this.setState({active: text}, this.sequenceList)
  }

  renderSuccessView = () => {
    const {
      stateData,
      stateName,
      totalCount,
      active,
      sortedDistrictList,
      sortable,
    } = this.state
    console.log(sortedDistrictList)
    const lastUpdateDate = new Date(stateData.meta.last_updated)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const nth = d => {
      if (d > 3 && d < 21) return `${d}th`
      switch (d % 10) {
        case 1:
          return `${d}st`
        case 2:
          return `${d}nd`
        case 3:
          return `${d}rd`
        default:
          return `${d}th`
      }
    }
    const [month, date, year] = [
      months[lastUpdateDate.getMonth()],
      nth(lastUpdateDate.getDate()),
      lastUpdateDate.getFullYear(),
    ]

    return (
      <div className="centerContainer">
        <div className="state-bg">
          <div className="DateContainer">
            <div>
              <div className="stateName-bg">
                <h1 className="stateName">{stateName}</h1>
              </div>
              <p className="dateString">{`Last update on ${month} ${date} ${year}.`}</p>
            </div>
            <div>
              <p className="testedText">Tested</p>
              <p className="testedCount">{stateData.total.tested}</p>
            </div>
          </div>
          <ul className="totalCountList">
            {totalCount.map(eachItem => (
              <TotalCardState
                details={eachItem}
                key={eachItem.text}
                active={active}
                changeActive={this.changeActive}
              />
            ))}
          </ul>
          <h1 className={`topDistricText ${active}`}>Top Districts</h1>
          <ul testid="topDistrictsUnorderedList" className="DistrictDetailList">
            {sortable.length === 0
              ? ''
              : sortable.map(eachItem => (
                  <DistrictDetails
                    details={eachItem}
                    key={eachItem[0]}
                    active={active}
                  />
                ))}
          </ul>
        </div>
      </div>
    )
  }

  renderTimelineSuccessView = () => {
    const {dateData, active} = this.state
    const data = dateData.slice(0, 10)
    return (
      <div className="centerContainer">
        <div className="state-bg">
          <RenderBarChart data={data} active={active} />

          <div testid="lineChartsContainer">
            <h1 className="daily-spread-text">Daily Spread Trends</h1>
            {activeTypeForChart.map(eachItem => (
              <RenderLineChart
                dateData={dateData}
                key={eachItem}
                name={eachItem}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderDetails = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderStatusList.success:
        return this.renderSuccessView()
      case renderStatusList.failed:
        return null
      case renderStatusList.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTimelineResult = () => {
    const {renderTimelineStatus} = this.state
    switch (renderTimelineStatus) {
      case renderStatusList.success:
        return this.renderTimelineSuccessView()
      case renderStatusList.failed:
        return null
      case renderStatusList.progress:
        return this.renderTimelineLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg">
        <Header />
        {this.renderDetails()}
        {this.renderTimelineResult()}
        <Footer />
      </div>
    )
  }
}

export default States
