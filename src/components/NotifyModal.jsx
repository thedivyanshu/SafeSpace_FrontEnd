import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import noNotice from "../images/notice.png"
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment';
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction';


const NotifyModal = () => {
    const { auth, notify } = useSelector( state => state );
    const disptach = useDispatch();

    const handleIsRead = (msg) =>{
        disptach(isReadNotify({msg, auth}))
    }

    const handleSound = () =>{
        disptach({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () =>{
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return disptach(deleteAllNotifies(auth.token))

        if(window.confirm(`You have ${newArr.length} unread notices. Are you sure want to delete all?`)){
            return disptach(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div style={{minWidth: '280px'}}>
            <div className='d-flex justify-content-between align-items-center px-4'>
                <h4>Notifications:</h4>
                {
                    notify.sound
                    ? <i className="fas fa-bell text-danger"
                    style={{fontSize:'1.2rem', cursor:'pointer'}}
                    onClick={handleSound}/>

                    : <i className="fas fa-bell-slash text-danger"
                    style={{fontSize:'1.2rem', cursor:'pointer'}}
                    onClick={handleSound}/>
                    
                }
            </div>
            <hr className='mt-0'/>
            {
                notify.data.length === 0 &&
                <img src={noNotice} alt="noNotice" className='w-100'/>
            }

            <div style={{maxHeight:'calc(100vh - 200px)', overflow:'auto'}}>
                {
                    notify.data.map((msg, index)=>(
                        <div key={index} className='px-2 mb-3'>
                            <Link to={`${msg.url}`} className='d-flex align-items-center'
                            onClick={()=> handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar"/>

                                <div className='mx-1 flex-fill'>
                                    <div style={{fontSize:'14px'}}>
                                        <strong className='mr-1'>{msg.user.username}</strong>
                                        <span >{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>
                                {
                                    !msg.isRead && <i className='fas fa-circle text-primary'/>
                                }
                            </Link>
                            <small className='d-flex justify-content-end text-muted px-4'>
                                {moment(msg.createdAt).fromNow()}
                            </small>
                            
                        </div>
                    ))
                }
            </div>
            <hr className='my-2' />
            <div className="text-right text-danger mr-2 " style={{cursor:'pointer', opacity:'0.8'}}
                onClick={handleDeleteAll}>
                clear
            </div>
        </div>
    )
}

export default NotifyModal
