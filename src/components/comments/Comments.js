import { useCallback, useEffect, useState } from 'react';
import CommentsList from './CommentsList'; 
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { getAllComments } from '../../lib/api';
import useHttp from '../../hooks/use-http';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data:loadedComments} = useHttp(getAllComments);
  const params = useParams();
  const {quoteId } = params; 
  let comments = ''; 

  useEffect(()=>{
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedCommentHandler = useCallback(() => {
  sendRequest(quoteId)
  },[sendRequest, quoteId]);

  if(status === 'pending') {
    comments = (
      <div className='centered' >
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }

  if(status === 'completed' && (loadedComments && loadedComments.length > 0)) {

    comments = (
      <CommentsList  comments={loadedComments}/> 
    )
  }
  if(status === 'completed' && (loadedComments && loadedComments.length === 0)) {

    comments = (
      <p>No Comment found </p>
    )
  }
  
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={props.quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
