import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ConvertObjectDataIntoList from '../ConvertObjectDataIntoList'
import ExtractCountryCount from '../ExtractCountryCount'
import TotalCard from '../TotalCard'
import RenderTable from '../TablesList'
import Footer from '../Footer'
import SuggetionItem from '../SuggetionItem'
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

class Home extends Component {
  state = {
    renderStatus: renderStatusList.progress,
    homeData: [],
    countryCount: [],
    searchText: '',
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

  changeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  renderSearchSuggetion = () => {
    const {searchText} = this.state
    const modStateList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchText.toLowerCase()),
    )
    console.log(modStateList)
    return (
      <ul testid="searchResultsUnorderedList" className="ulList">
        {modStateList.map(eachItem => (
          <SuggetionItem details={eachItem} ket={eachItem.state_code} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {countryCount, homeData, searchText} = this.state
    console.log(homeData)
    return (
      <div className="success-bg">
        <div className="alignInputContainer">
          <div className="d-flex search-container">
            <BsSearch className="search-icon" />
            <input
              onChange={this.changeSearchText}
              placeholder="Enter the State"
              type="search"
              className="form-control search-bar"
              value={searchText}
            />
          </div>
        </div>
        {searchText === '' ? (
          <>
            <ul className="totalCountList" testid="countryWideConfirmedCases">
              {countryCount.map(eachItem => (
                <TotalCard details={eachItem} key={eachItem.text} />
              ))}
            </ul>
            <RenderTable details={homeData} key="table" />
          </>
        ) : (
          this.renderSearchSuggetion()
        )}
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
        <Footer />
      </div>
    )
  }
}

export default Home
