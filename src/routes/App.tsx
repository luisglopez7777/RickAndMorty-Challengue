import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import Home from '../pages/Home'
import Character from '../pages/Character'
import MoreCharacters from '../pages/MoreCharacters'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:characterId" component={Character} />
        <Route exact path="/page/:pageId" component={MoreCharacters} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;

    // "jsx": "react-jsx"

