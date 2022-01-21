import './index.css'

const RenderQA = props => {
  const {details} = props
  return (
    <li className="mb-5">
      <h1 className="question">{details.question}</h1>
      <p className="ans">{details.answer}</p>
    </li>
  )
}

export default RenderQA
