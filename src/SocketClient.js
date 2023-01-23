import React,{useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { POST_TYPES } from './redux/actions/postAction';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import bellAudio from './Audio/bell.mp3'
import { MESS_TYPES } from './redux/actions/messageAction';

const spawnNotification = (body, icon, url, title) =>{
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e =>{
        e.preventDefault()
        window.open(url, '_blank')
    }
}


const SocketClient = () => {
    const { auth, socket, notify, online, call } = useSelector(state => state);
    const dispatch = useDispatch();

    const audioRef = useRef();

    //JoinUser
    useEffect(()=>{
        socket.emit('joinUser', auth.user)
    },[socket, auth.user])

    //Likes
    useEffect(()=>{
        socket.on('likeToClient', newPost =>{
            dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
        })

        return () => socket.off('likeToClient')
    },[socket, dispatch])

    //unlike
    useEffect(()=>{
        socket.on('unLikeToClient', newPost =>{
            dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
        })

        return () => socket.off('unLikeToClient')
    },[socket, dispatch])

    //create comment
    useEffect(()=>{
        socket.on('createCommentToClient', newPost =>{
            dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
        })

        return () => socket.off('createCommentToClient')
    },[socket, dispatch])


    //deleteComment
    useEffect(()=>{
        socket.on('deleteCommentToClient', newPost =>{
            dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
        })

        return () => socket.off('deleteCommentToClient')
    },[socket, dispatch])


    //followAccount
    useEffect(()=>{
        socket.on('followToClient', newUser =>{
            dispatch({type:GLOBALTYPES.AUTH, payload:{...auth, user:newUser}})
        })

        return () => socket.off('followToClient')
    },[socket, dispatch, auth])


    //unFollowAccount
    useEffect(()=>{
        socket.on('unFollowToClient', newUser =>{
            dispatch({type:GLOBALTYPES.AUTH, payload:{...auth, user:newUser}})
        })

        return () => socket.off('unFollowToClient')
    },[socket, dispatch, auth])


    //Notification
    useEffect(()=>{
        socket.on('createNotifyToClient', msg =>{
            dispatch({type:NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
            if(notify.sound) audioRef.current.play()
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'SocialSpace'
            )
        })

        return () => socket.off('createNotifyToClient')
    },[socket, dispatch, notify.sound])
  
    useEffect(()=>{
        socket.on('removeNotifyToClient', msg =>{
            dispatch({type:NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })

        return () => socket.off('removeNotifyToClient')
    },[socket, dispatch, notify.sound])


    //Messages
    useEffect(()=>{
        socket.on('addMessageToClient', msg =>{
            dispatch({type:MESS_TYPES.ADD_MESSAGE, payload: msg})
            dispatch({
                type: MESS_TYPES.ADD_USER,
                payload:{...msg.user, text:msg.text,media:msg.media}
            })
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch, notify.sound])


    //user Online/offline
    useEffect(()=>{
        socket.emit('checkUserOnline', auth.user)
    },[socket, auth.user])

    useEffect(()=>{
        socket.on('checkUserOnlineToMe', data =>{
            data.forEach(item =>{
                if(!online.includes(item.id)){
                    dispatch({type:GLOBALTYPES.ONLINE, payload: item.id})
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    },[socket, dispatch, online])

    useEffect(()=>{
        socket.on('checkUserOnlineToClient', id =>{
            if(!online.includes(id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: id})
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    },[socket, dispatch, online])


    //check user offline
    useEffect(()=>{
        socket.on('checkUserOffline', id =>{
            dispatch({type: GLOBALTYPES.OFFLINE, payload:id})
        })

        return () => socket.off('checkUserOffline')
    },[socket, dispatch, online])
 

    //call
    useEffect(()=>{
        socket.on('callUserToClient', data =>{
            dispatch({type: GLOBALTYPES.CALL, payload: data})
        })

        return () => socket.off('callUserToClient')
    },[socket, dispatch])

    //userbusy
    useEffect(()=>{
        socket.on('userBusy', data =>{
            dispatch({type: GLOBALTYPES.ALERT, payload: {err: `${call.username} is busy!`}})
        })

        return () => socket.off('userBusy')
    },[socket, dispatch, call])


    return (
        <>
            <audio controls ref={audioRef} style={{display:'none'}}>
                <source src={bellAudio} type='audio/mp3' />
            </audio>
        </>
    )
}

export default SocketClient
