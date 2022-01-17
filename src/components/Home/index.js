import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ConvertObjectDataIntoList from '../ConvertObjectDataIntoList'
import ExtractCountryCount from '../ExtractCountryCount'
import TotalCard from '../TotalCard'
import RenderTable from '../TablesList'
import Footer from '../Footer'
import './index.css'

const renderStatusList = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failed: 'failed',
}

class Home extends Component {
  state = {
    renderStatus: renderStatusList.progress,
    homeData: [],
    countryCount: [],
  }

  componentDidMount() {
    this.fetchHomeDetails()
  }

  fetchHomeDetails = async () => {
    this.setState({renderStatus: renderStatusList.progress})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const listData = ConvertObjectDataIntoList(data)
      const countryCount = ExtractCountryCount(listData)
      this.setState({homeData: listData, countryCount})
      this.setState({renderStatus: renderStatusList.success})
    }
  }

  renderLoadingView = () => (
    <div
      testid="homeRouteLoader"
      className="products-loader-container Loader-container"
    >
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {countryCount, homeData} = this.state
    console.log(homeData)
    return (
      <div className="success-bg">
        <div className="alignInputContainer">
          <div className="d-flex search-container">
            <BsSearch className="search-icon" />
            <input
              placeholder="Enter the State"
              type="search"
              className="form-control search-bar"
            />
          </div>
        </div>
        <ul className="totalCountList" testid="countryWideConfirmedCases">
          {countryCount.map(eachItem => (
            <TotalCard details={eachItem} key={eachItem.text} />
          ))}
        </ul>
        <RenderTable details={homeData} />
        <Footer />
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

  render() {
    return (
      <div className="home-bg">
        <Header />
        {this.renderDetails()}
      </div>
    )
  }
}

export default Home
