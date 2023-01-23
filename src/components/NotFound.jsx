import React from 'react'

const NotFound = () => {
    return (
        <div className="position-relative" style={{minHeight:'100vh'}}>
            <h2 className="position-absolute text-secondary"
            style={{top:'50%', left:'50%' ,transform:'translate(-50%, -50%)'}}>
                404 | PAGE NOT FOUND</h2>
        </div>
    )
}

export default NotFound
