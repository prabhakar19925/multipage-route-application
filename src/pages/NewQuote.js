import { useHistory } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import { useEffect } from 'react';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote); 
    const history = useHistory();
     useEffect(()=>{ 
     if(status === 'completed') {
        history.push('/quotes')
     }
     }, [status]);

    const addQuoteHandler = (data) => {
      console.log(data)
      sendRequest(data);
    }

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}></QuoteForm>
    )
}

export default NewQuote;