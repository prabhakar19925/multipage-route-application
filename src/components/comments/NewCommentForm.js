import { useEffect, useRef } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

import LoadingSpinner from '../UI/LoadingSpinner';
const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment)
  const { onAddedComment } = props;
  
  const { quoteId } = props; 
  useEffect(()=>{
  if(status === 'completed' && !error) {
    onAddedComment(); 
  }
  }, [onAddedComment, status, error])

  const submitFormHandler = (event) => {
    event.preventDefault();
   // optional: Could validate here
    const entertext = commentTextRef.current.value;
    console.log('sendRequest quoteId', quoteId)
    sendRequest({commentData: {text: entertext}, quoteId: quoteId});
    // send comment to server
  };
  
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' &&  <LoadingSpinner /> }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
