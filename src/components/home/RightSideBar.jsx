import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';
import LoadIcon from '../../images/loader.gif';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="mt-4">
            <UserCard user={auth.user} />

            <div className="d-flex justify-content-between align-items-center my-4">
                <h5 className="text-danger">Suggestions:</h5>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo" style={{cursor:'pointer'}} 
                     onClick={()=> dispatch(getSuggestions(auth.token))}/>
                }
            </div>
            {
                suggestions.loading
                ? <img src={LoadIcon} alt="" className="d-block mx-auto my-4"/>
                : <div className="suggestions">
                    {
                        suggestions.users.map(user=>(
                            <UserCard key={user._id} user={user} >
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }
            <div className="my-2 text-center">
                <small>
                    All Right Reserved &copy; 2021
                </small>
            </div>
        </div>
    )
}

export default RightSideBar
