import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";


const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const {fullname, mobile, address, website, story,gender } =userData;

  const [avatar, setAvatar] = useState(''); 
  const { auth, theme } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    setUserData(auth.user);
  },[auth.user])

  const changeAvatar = (e) =>{
    const pic = e.target.files[0];

    const err = checkImage(pic);
    console.log(err);
    if(err) return dispatch({
        type:GLOBALTYPES.ALERT, 
        payload:{err} 
    })
    setAvatar(pic);
  }
  const handleInput = e =>{
      const{name,value} = e.target;
      setUserData({...userData, [name]:value}); 
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(updateProfileUser({userData, avatar, auth}))
  }

  return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
                onClick={()=>setOnEdit(false)}>
                    close
            </button>
            <form onSubmit={handleSubmit} >
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar): auth.user.avatar}
                     alt="avatar" style={{filter:theme ? 'invert(1)' : 'invert(0)'}} />
                    <span>
                        <i className="fas fa-camera">
                            <p>Change</p>
                            <input type="file" id="file_up" 
                            accept="image/*" onChange={changeAvatar} />
                        </i>
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name:</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname" 
                        name="fullname" value={fullname} onChange={handleInput} />
                        <small className={`${fullname.length > 25 ? 'text-danger' : 'text-success'} position-absolute`}
                            style={{top:'50%', right:'10px', transform:'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No:</label>
                    <input type="number" name="mobile" value={mobile}
                    className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" value={address}
                    className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website:</label>
                    <input type="text" name="website" value={website}
                    className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="story">About:</label>
                    <textarea name="story" value={story} cols="30" rows="5"
                    className="form-control" onChange={handleInput} />
                    <small className={`${story.length > 200 ? 'text-danger' : 'text-success'}
                     d-block text-right`}>
                        {story.length}/200
                    </small>
                </div>
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button className="btn btn-info w-100">Save</button>
            </form>
        </div>
  );
};

export default EditProfile;
