import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Send from '../../../images/send.svg';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost,savePost, unSavePost } from '../../../redux/actions/postAction';
import ShareModal from '../../ShareModal';
import { BASE_URL} from '../../../utils/config'

const CardFooter = ({post}) => {

    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState('');
    
    const [isShare, setIsShare] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadSave, setLoadSave] = useState(false);

    const { auth, theme, socket } = useSelector(state => state);
    const dispatch = useDispatch();


    //Like/unlike useEffect
    useEffect(()=>{
     if(post.likes.find(like => like._id === auth.user._id)){
         setIsLike(true)
     }else{
         setIsLike(false)
     }
    },[post.likes, auth.user._id])

    const handleLike = async() =>{
        if(loadLike) return;
        
        setIsLike(true);
        setLoadLike(true);
        await dispatch(likePost({post, auth, socket}));
        setLoadLike(false)
    }

    const handleUnLike = async() =>{
        if(loadLike) return;
        
        setIsLike(false);
        setLoadLike(true);
        await dispatch(unLikePost({post, auth, socket}));
        setLoadLike(false)
    }
    
    //SavePosts useEffect
    useEffect(()=>{
        if(auth.user.saved.find(id => id === post._id)){
            setSaved(true);
        }else{
            setSaved(false);
        }
    },[auth.user.saved, post._id])

    const handleSavePost = () =>{
        if(loadSave) return;
        
        setLoadSave(true);
        dispatch(savePost({post, auth}));
        setLoadSave(false)
    }

    const handleUnSavePost = () =>{
        if(loadSave) return;
        
        setLoadSave(true);
        dispatch(unSavePost({post, auth}));
        setLoadSave(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                    />
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>
                    <img src={Send} alt="" onClick={()=> setIsShare(!isShare)}/>
                </div>
               {
                    (auth.user._id === post.user._id)
                    ? ''
                    : saved
                        ? <i className="fas fa-bookmark text-primary" 
                        onClick={handleUnSavePost }/>
                        : <i className="far fa-bookmark"
                        onClick={handleSavePost} />
                
               }
               
            </div>
            <div className="d-flex justify-content-between">
                <h6 style={{padding:'0 25px', cursor:'pointer' }}>
                    {post.likes.length} likes
                </h6>
                <h6 style={{padding:'0 25px', cursor:'pointer' }}>
                    {post.comments.length} comments 
                </h6>
            </div>
            {
                isShare &&  <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
            }
        </div>
    )
}

export default CardFooter
