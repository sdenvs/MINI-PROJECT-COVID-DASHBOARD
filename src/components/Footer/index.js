import './index.css'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="header-logo-1">COVID19</span>
        <span className="header-logo-2">INDIA</span>
      </div>
      <p>we stand with everyone fighting on the front lines</p>
      <div className="text-center">
        <VscGithubAlt className="social-icon" />
        <FiInstagram className="social-icon" />
        <FaTwitter className="social-icon" />
      </div>
    </footer>
  )
}
