import React,{ useState, useEffect } from 'react';
import Avatar from '../../Avatar';
import {Link} from 'react-router-dom';
import moment from 'moment';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu';
import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction';
import InputComment from '../InputComment';


const CommentCard = ({children, comment, post, commentId}) => {
    const { auth, theme } = useSelector(state=>state);
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);

    const [onEdit, setOnEdit] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [onReply, setOnReply] = useState(false);

    useEffect(()=>{
        setContent(comment.content);
        setIsLike(false);
        setOnReply(false);
        if(comment.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }
    },[comment,auth.user._id])

    const handleUpdate = () =>{
        if(comment.content !== content){
            dispatch(updateComment({comment, post, content, auth}));
            setOnEdit(false);
        }else{
            setOnEdit(false);
        }
    }

    const handleLike = () =>{
        if(loadLike) return;
        setIsLike(true);

        setLoadLike(true);
        dispatch(likeComment({comment, post, auth}));
        setLoadLike(false);
    }

    const handleUnLike = () =>{
        if(loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        dispatch(unLikeComment({comment, post, auth}));
        setLoadLike(false);
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        PointerEvent: comment._id ? 'inherit' : 'none'
    }

    const handleReply = () =>{
        if(onReply) return setOnReply(false);
        setOnReply({...comment, commentId});
    }

    return (
        <div className="comment_card mt-2 w-100" stye={styleCard}>
            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 style={{marginLeft:'7px'}}>{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill"
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : 'black'}}
                >
                    {
                        onEdit
                        ? <textarea row="7" value={content}
                            onChange={e => setContent(e.target.value)}/>
                        : <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`/profile/${comment.tag._id}`} className="mr-2">
                                    @{comment.tag.username}
                                </Link>
                            }
                            <span>
                                {
                                    content.length < 100 ? content:
                                    readMore ? content + ' ' : content.slice(0,100) + '....'
                                }
                            </span>
                                {
                                    content.length > 100 &&
                                    <span className="readMore" onClick={()=> setReadMore(!readMore)}>
                                        {readMore ? '...show less' : 'show more'}
                                    </span>
                                }
                         </div>
                    }
                    <div>
                            <small className="text-muted mr-3">
                                {moment(comment.createdAt).fromNow()}
                            </small>

                            <small className="font-weight-bold mr-3">
                                {comment.likes.length} likes
                            </small>

                            {
                                onEdit
                                ? <>
                                    <small className="font-weight-bold mr-3"
                                        onClick={handleUpdate} style={{cursor:'pointer'}}>
                                        update
                                    </small>
                                    <small className="font-weight-bold mr-3"
                                        onClick={()=>setOnEdit(false)} style={{cursor:'pointer'}}>
                                        cancel
                                    </small>


                                </>
                                : <small className="font-weight-bold mr-3"
                                    onClick={handleReply} style={{cursor:'pointer'}}>
                                    {onReply ? 'cancel' : 'reply'}
                                </small>

                            }                            
                    </div>
                </div>
                    
                <div className="d-flex align-items-center mx-2"
                    style={{cursor:'pointer'}}>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                    <LikeButton 
                        isLike={isLike} 
                        handleLike={handleLike}
                        handleUnLike={handleUnLike}
                    />
                    
                </div>
            </div>

            {
                onReply&& 
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                    <Link to={`/profile/${onReply.user._id}`} className="mr-1">
                        @{onReply.user.username}:
                    </Link>
                </InputComment>
            }
            {children}
        </div>
    )
}

export default CommentCard
