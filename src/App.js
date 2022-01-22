import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import States from './components/State'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={States} />
    <Route exact path="/about" component={About} />
    <Route exact path="/bad-path" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
