import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import ConverToDistrictList from '../ConverToDistrictList'
import ExtractCountryCount from '../ExtractCountryCount'
import Header from '../Header'
import TotalCard from '../TotalCard'
import DistrictDetails from '../DistrictDetails'
import ConvertdateList from '../CovertdateList'

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
  Recovered: 'Recovered',
  Confirmed: 'Confirmed',
  Active: 'Active',
  Deceased: 'Deceased',
}

const activeTypeForChart = ['Recovered', 'Confirmed', 'Active', 'Deceased']

class State extends Component {
  state = {
    renderStatus: renderStatusList.progress,
    renderTimelineStatus: renderStatusList.progress,
    dateData: [],
    stateData: [],
    stateName: '',
    totalCount: [],
    active: activeType.Confirmed,
    districtList: [],
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
      const totalCount = ExtractCountryCount(totalList)
      const districtList = ConverToDistrictList(data[stateCode].districts)

      this.setState({
        renderStatus: renderStatusList.success,
        stateData: data[stateCode],
        totalCount,
        stateName: statesList.find(state => state.state_code === stateCode)
          .state_name,
        districtList,
      })
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
    this.setState({active: text})
  }

  renderSuccessView = () => {
    const {stateData, stateName, totalCount, active, districtList} = this.state
    console.log(stateName)
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
    const nth = function (d) {
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
    console.log(month, date, year)
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
          <ul
            className="totalCountList"
            testid="stateSpecificConfirmedCasesContainer"
          >
            {totalCount.map(eachItem => (
              <TotalCard
                details={eachItem}
                key={eachItem.text}
                active={active}
                changeActive={this.changeActive}
              />
            ))}
          </ul>
          <h1 className={`topDistricText ${active}`}>Top Districts</h1>
          <ul className="DistrictDetailList">
            {districtList.map(eachItem => (
              <DistrictDetails
                details={eachItem}
                key={eachItem.Name}
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
      <>
        <BarChart width={1000} height={450} data={data}>
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={active}
            fill="#8884d8"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
        {activeTypeForChart.map(eachItem => (
          <LineChart
            width={730}
            height={250}
            data={dateData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={eachItem} stroke="#8884d8" />
          </LineChart>
        ))}
      </>
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
      </div>
    )
  }
}

export default State
