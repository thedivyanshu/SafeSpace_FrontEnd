import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
            style={{background:"#0008", 
                color:"white",
                top:0 ,left:0,
                zIndex:50}}>
            <svg height="250" width="200" >
                <circle cx="100" cy="100" r="80" 
                    stroke="white" 
                    strokeWidth="4" 
                    fill="none" 
                    className="circle1"
                />
                <circle cx="100" cy="100" r="50" 
                    stroke="white" 
                    strokeWidth="4" 
                    fill="none" 
                    className="circle2"
                />
                <circle cx="100" cy="100" r="65" 
                    stroke="white" 
                    strokeWidth="4" 
                    fill="none" 
                    className="circle3"
                />
                <text fill="#fff" x="30" y="210">Please Wait..</text>
            </svg>
        </div>
    )
}

export default Loading
