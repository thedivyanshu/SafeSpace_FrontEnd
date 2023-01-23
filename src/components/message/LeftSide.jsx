import React,{useState, useEffect, useRef} from 'react'
import UserCard from '../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataApi } from '../../utils/fetchData';
import { useHistory, useParams } from 'react-router-dom';
import { getConversation,MESS_TYPES } from '../../redux/actions/messageAction';


const LeftSide = () => {
    const { auth, message,online } = useSelector(state => state);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    
    const history = useHistory();
    const { id } = useParams();
    const pageEnd = useRef();
    const [page, setPage] = useState(0);

    //for auto searching
    useEffect(() => {
        if (search && auth.token) {
            getDataApi(`search?username=${search}`, auth.token)
            .then((res) => setSearchUser(res.data.users))
            .catch((err) => {
                dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { err: err.response.data.msg },
                });
            });
            } else {
                setSearchUser([]);
        }
    }, [search, auth.token, dispatch]);
   
    const handleAddUser = (user) => {
        setSearch('')
        setSearchUser([])
        dispatch({ type: MESS_TYPES.ADD_USER, payload: {...user, text:'', media:[]}})
        dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }
     
    const isActive = (user) =>{
        if(id === user._id) return 'active';
        return '';
    }

    useEffect(()=>{
        if(message.firstLoad) return;
        dispatch(getConversation({auth}))
    },[dispatch, auth, message.firstLoad])

    //LoadMore
    useEffect(()=>{
        const observer = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                setPage(p =>p +1)
            }
        },{
            threshold: 0.1
        })
        observer.observe(pageEnd.current)
    },[setPage])

    useEffect(() =>{
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
            dispatch(getConversation({auth, page}))
        }
    },[message.resultUsers, page, dispatch, auth])

    //check user online offline
    useEffect(()=>{
        if(message.firstLoad) {
            dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        }
    },[online, dispatch, message.firstLoad])

    return (
        <>
            <form className="message_header">
                <input type="text" value={search} 
                placeholder='Type Something...'
                onChange={e => setSearch(e.target.value)}/>
                <button type='button' style={{display:'none'}}>Search</button>
            </form>

            <div className="message_chat_list">
                {
                   searchUser.length !== 0
                   ? <>
                        {
                            search && searchUser.map((user) => (
                            <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={()=> handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                    </>
                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                  onClick={()=> handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        {
                                            user.online
                                            ? <i className='fas fa-circle text-success'/>
                                            : auth.user.following.find(item=>
                                                item._id === user._id
                                            ) && <i className='fas fa-circle'/>
                                        }
                                        
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
                <button ref={pageEnd} style={{opacity:0}}></button>
            </div>
        </>
    )
}

export default LeftSide
