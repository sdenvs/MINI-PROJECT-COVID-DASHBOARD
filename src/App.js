import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import State from './components/State'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={State} />
  </Switch>
)

export default App
