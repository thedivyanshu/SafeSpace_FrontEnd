import React,{ useState, useEffect } from 'react';
import CommentDisplay from './comments/CommentDisplay';


const Comments = ({post}) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [next, setNext] = useState(1);

    const [replyComments, setReplyComments] = useState([])

    useEffect(()=>{
        const newCm = post.comments.filter(cm => !cm.reply)
        setComments(newCm);
        setShowComments(newCm.slice(newCm.length - next))
    },[post.comments, next])

    useEffect(()=>{
        const newRep = post.comments.filter(cm => cm.reply);
        setReplyComments(newRep)
    },[post.comments])

    return (
        <div>
            {
                showComments.map((comment, index) =>(
                    <CommentDisplay key={index} comment={comment} post={post}
                    replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }

            {
                comments.length - next > 0
                ? <div className="p-2 border-top"
                    style={{color:'#1e93bf', cursor:'pointer', fontSize:'14px'}}
                    onClick={()=> setNext(next + 10)}
                    >
                    show comments...
                </div>

                : comments.length > 1 &&
                <div className="p-2 border-top"
                    style={{color:'#1e93bf', cursor:'pointer', fontSize:'14px'}}
                    onClick={()=>setNext(1)}>
                    hide comments...
                </div>
            }
        </div>
    )
}

export default Comments
