import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const DUMMY_QUOTES = [
    {id:'1', author: 'prabhakar', text:'Learning React is Great!'},
    {id:'2', author: 'prabhakar1', text:'Learning React is Great!'}
]
const QuoteDetail = () => {

    const params = useParams();
    const { quoteId }= params; 
    const match = useRouteMatch();
    console.log('useRouteMatch', match); 
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote);
    useEffect(()=>{
       sendRequest(quoteId);
    },[sendRequest, quoteId]);
    console.log(quoteId); 
    if(status === 'pending') {
        return (
            <div className="centered">
             <LoadingSpinner />
            </div>
        )
    
    }
    if(status === 'completed' && (!loadedQuote || loadedQuote.lenght === 0)) {
      return <NoQuotesFound />
    }
    
    if(!loadedQuote) {
        return <NoQuotesFound />
    }
    
    return (
    <Fragment>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
        <Route path={`${match.path}`} exact>
        <div className={'centered'}>
           <Link  className='btn-flat' to={`${match.url}/comments`} >
            Load Comment 
            </Link>
        </div>
        </Route>
        <Route path={`${match.path}/comments`}>
            <Comments quoteId={quoteId}/>
        </Route>
        
    </Fragment>
        )
}

export default QuoteDetail; 