import React,{ useState, useEffect } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({comment, post, replyCm}) => {
    const [showRep, setShowRep] = useState([]);
    const [next, setNext] = useState(1);

    useEffect(()=>{
        setShowRep(replyCm.slice(replyCm.length - next))
    },[replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id}>
               <div className="pl-5">
                   {
                       showRep.map((item, index)=>(
                           item.reply &&
                           <CommentCard 
                            key={index}
                            comment={item}
                            post={post}
                            commentId={comment._id}
                           />
                       ))
                   }
                   {
                        replyCm.length - next > 0
                        ? <div style={{color:'#1e93bf', cursor:'pointer', fontSize:'14px'}}
                            onClick={()=> setNext(next + 10)}
                            >
                            show replies..
                        </div>

                        : replyCm.length > 1 &&
                        <div style={{color:'#1e93bf', cursor:'pointer', fontSize:'14px'}}
                            onClick={()=>setNext(1)}>
                            hide replies...
                        </div>
                    }
               </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
