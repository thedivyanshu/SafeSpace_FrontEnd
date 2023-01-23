import React from 'react'
import RightSide from '../../components/message/RightSide'
import LeftSide from '../../components/message/LeftSide'

const Conversation = () => {
    return (
        <div className='message d-flex'>
            <div className='col-md-4 border-right px-8'>
                <LeftSide />
            </div>
            <div className="col-md-8 px-0">
                <RightSide />
            </div>
            
        </div>
    )
}

export default Conversation
