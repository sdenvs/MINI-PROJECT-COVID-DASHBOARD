import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import ConvertToFaqList from '../ConvertToFaqList'
import RenderQA from '../RenderQA'
import './index.css'

const renderStatusList = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failed: 'failed',
}

class About extends Component {
  state = {
    renderStatus: renderStatusList.initial,
    faqList: [],
  }

  componentDidMount() {
    this.fetchAboutDetails()
  }

  fetchAboutDetails = async () => {
    this.setState({renderStatus: renderStatusList.progress})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const faqList = ConvertToFaqList(data.faq)
      this.setState({faqList, renderStatus: renderStatusList.success})
    }
  }

  renderLoadingView = () => (
    <div
      testid="aboutRouteLoader"
      className="products-loader-container Loader-container"
    >
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {faqList} = this.state
    return (
      <div className="alignInputContainer">
        <div className="state-bg">
          <h1 className="AboutTitle mb-5">About</h1>
          <h1 className="covidText mb-4">
            COVID-19 vaccines be ready for distribution
          </h1>
          <ul testid="faqsUnorderedList" className="ulQAList">
            {faqList.map(eachItem => (
              <RenderQA details={eachItem} key={eachItem.question} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderResult = () => {
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
        {this.renderResult()}
        <Footer />
      </div>
    )
  }
}

export default About
