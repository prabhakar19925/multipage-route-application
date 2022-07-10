import { Redirect, Route, Switch } from 'react-router-dom'
import AllQuote from './pages/AllQuote';
import NewQuote from './pages/NewQuote';
import QuoteDetail from './pages/QuoteDetail';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Layout>
     <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes' />
      </Route>
      <Route path='/quotes' exact>
        <AllQuote />
      </Route>
      <Route path='/quotes/:quoteId' >
       <QuoteDetail />
      </Route>
      <Route path='/new-quote'>
        <NewQuote />
      </Route>
      <Route path={'*'}> <NotFound /></Route>
     </Switch>
     </Layout>
    </div>
  );
}

export default App;
