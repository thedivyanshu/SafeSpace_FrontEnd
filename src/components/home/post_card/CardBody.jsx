import React,{ useState } from 'react';
import Carousel from '../../Carousel';
import { useSelector } from 'react-redux';

const CardBody = ({post}) => {
    const [readMore, setReadMore] = useState(false);
    const {theme} = useSelector(state => state);
    
    return (
        <div className="card_body">
            <div className="card_body_content"
            style={{
                filter : theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : 'black'
            }}>
                <span>
                    {
                        post.content.length < 50
                        ? post.content
                        : readMore ? post.content + ' ' : post.content.slice(0,40) + '.....'
                    }
                </span>
                {
                    post.content.length > 50 &&
                    <span className="readMore" onClick={()=> setReadMore(!readMore)}>
                        { readMore ? '(hide content)' : '(read more)'}
                    </span>
                }
            </div>
            {
               post.images.length > 0 && <Carousel images={post.images} id={post._id}/>
            }
        </div>
    )
}

export default CardBody
