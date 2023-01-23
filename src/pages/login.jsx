import { useState,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import {login} from '../redux/actions/authAction';
import { useDispatch,useSelector } from 'react-redux';
import logo from '../images/S.png';

const Login = () => {
    const {auth} = useSelector(state => state);
    const initialState = {email:'', password:''};
    const [userData,setUserData] = useState(initialState);
    const{email, password} = userData;
    const history = useHistory();

    const [typePass, setTypePass] = useState(false);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        if(auth.token) history.push('/')
    },[auth.token,history])

    const handleChangeInput = e =>{
        const{name, value} = e.target;
        setUserData({...userData,[name]:value});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(login(userData));

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
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                        aria-describedby="emailHelp" onChange={handleChangeInput}
                        name="email" value={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"/>
                        <small onClick={()=>setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    
                </div>
                
                <button type="submit" className="btn w-100"
                disabled={email && password ? false : true}>
                    Login
                </button>
                <p>Don't have an Account? <Link to='/register'
                style={{color:"#1e93bf"}}>
                    Register Now!
                    </Link>
                </p>
                <p>Forgot Password? <Link to='/ForgotPassword'
                style={{color:"#1e93bf"}}>
                    Reset Now!
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
