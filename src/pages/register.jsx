import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import { register } from '../redux/actions/authAction';

import logo from '../images/S.png';

const Register = () => {
    const {auth, alert} = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = {
        fullname:'', username:'', email:'', password:'', cf_password:'', gender:'male'
    };
    const [userData,setUserData] = useState(initialState);
    const{fullname, username, email, password, cf_password} = userData;

    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setCfTypePass] = useState(false);

    useEffect(()=>{
        if(auth.token) history.push('/')
    },[auth.token,history])

    const handleChangeInput = e =>{
        const{name, value} = e.target;
        setUserData({...userData,[name]:value});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(register(userData));
    }
    return (
        <div className="auth_page">
                <h3 className="text-uppercase welcomeLogin">Welcome to 
                    <div className="socialLogo">
                        SAFE SPACE
                    </div>
                </h3>
            <form onSubmit={handleSubmit} >
                <div className="logo"><img src={logo} alt="" /></div>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name:</label>
                    <input type="text" className="form-control" id="fullname"
                     onChange={handleChangeInput} name="fullname" value={fullname}
                     style={{background: `${alert.fullname ? '#fc1f6113' : ''}`}}/>
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" className="form-control" id="username"
                         onChange={handleChangeInput} name="username" 
                         value={username.toLowerCase().replace(/ /g, '')}
                         style={{background: `${alert.username ? '#fc1f6113' : ''}`}}/>
                    <small className="form-text text-danger">
                        {alert.username ? alert.username : ''} 
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                        aria-describedby="emailHelp" onChange={handleChangeInput}
                        name="email" value={email}
                        style={{background: `${alert.email ? '#fc1f6113' : ''}`}}/>
                    <small id="emailHelp" className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password:</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"
                        style={{background: `${alert.password ? '#fc1f6113' : ''}`}}/>
                        <small onClick={()=>setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                        <small className="form-text text-danger">
                            {alert.password ? alert.password : ''}
                        </small>
                    
                    
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password:</label>
                    <div className="pass">
                        <input type={typeCfPass ? "text" : "password"} className="form-control" id="cf_password"
                        onChange={handleChangeInput} value={cf_password} name="cf_password"
                        style={{background: `${alert.cf_password ? '#fc1f6113' : ''}`}}/>
                        <small onClick={()=>setCfTypePass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                        </div>
                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>
                <div className="row justify-content-between mx-0 mb-1">
                    Gender:
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender" 
                        value="male" defaultChecked onChange={handleChangeInput} />
                    </label>
                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender" 
                        value="female"onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className="btn w-100">
                    Register
                </button>
                <p>Already have an Account? <Link to='/'
                style={{color:"#1e93bf"}}>
                    Login Now!
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register
