import './index.css'

const NotFound = props => {
  const {history} = props
  const goToHome = () => {
    history.replace('/')
  }
  return (
    <div className="centerContainer home-bg">
      <div className="state-bg d-flex flex-column align-items-center pt-5">
        <img
          className="notFoundImage mb-3"
          src="https://res.cloudinary.com/nani57/image/upload/v1642773905/Covid-19%20dashboard/Group_7484notFound_k9rrsr.png"
          alt="Not found"
        />
        <h1 className="AboutTitle mb-5">PAGE NOT FOUND</h1>
        <p className="covidText mb-4 text-center">
          we’re sorry, the page you requested could not be found
          <br />
          Please go back to the homepage
        </p>
        <button onClick={goToHome} className="btn btn-primary">
          Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
