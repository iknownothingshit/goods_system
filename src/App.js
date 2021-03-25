import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import allPages from './pages/throwAll.js'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/login' component={allPages.login} />
          <Route path='/admin' component={allPages.admin} />
          <Redirect to='/login' />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
