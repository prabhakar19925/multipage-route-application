import QuoteList from "../components/quotes/QuoteList";
import { useEffect } from "react";
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const DUMMY_QUOTES = [
    {id:'1', author: 'prabhakar', text:'Learning React is Great!'},
    {id:'2', author: 'prabhakar1', text:'Learning React is Great!'}
]

const AllQuote = () => {
const {sendRequest, status, data: loadedQuote, error} = useHttp(getAllQuotes);
useEffect(() => {
sendRequest()
}, [sendRequest]);

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
return loadedQuote && <QuoteList quotes={loadedQuote}></QuoteList>
}

export default AllQuote; 