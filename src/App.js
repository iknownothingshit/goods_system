import { BroswerRouter, HashRouter, Route, Switch } from 'react-router-dom'

import allPages from './pages/throwAll.js'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/login' component={allPages.login} />
          <Route path='/admin' component={allPages.admin} />
          <Route path='/' component={allPages.login} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
