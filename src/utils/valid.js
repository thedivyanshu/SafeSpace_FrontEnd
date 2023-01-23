const valid = ({fullname, username, email, password, cf_password}) =>{
    const err ={}

    if(!fullname){
        err.fullname = "Please enter your full name!"
    }else if(fullname.length > 25){
        err.fullname="Full Name should be less than 25 characters!"
    }

    if(!username){
        err.username="Please enter username!"
    }else if(username.replace(/ /g, '').length > 20){
        err.username = "User Name should be less than 20 characters!"
    }

    if(!email){
        err.email="Please enter your email!"
    }else if(!validateEmail(email)){
        err.email = "Please enter correct email!"
    }

    if(!password){
        err.password="Please enter password!";
    }else if(password.length < 7){
        err.password = "Password is too short!";
    }

    if(password !== cf_password){
        err.cf_password="Password doesn't matched!";
    }

    return {
        errMsg:err,
        errLength:Object.keys(err).length
    }
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export default valid;