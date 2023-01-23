import React,{useState, useEffect} from 'react';
import PostThumb from '../PostThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataApi } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import LoadIcon from '../../images/loader.gif';

const Saved = ({auth, dispatch}) => {
    const [savePosts, setSavePosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage ] = useState(2);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(true)
        getDataApi('getSavePost', auth.token)
        .then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err=>{
            dispatch({type: GLOBALTYPES.ALERT, payload:{err:err.response.data.msg}})
        })

        return () => setSavePosts([]);
    },[auth.token, dispatch])

    const handleLoadMore = async() =>{
        setLoad(true);
        const res = await getDataApi(`getSavePost?limit=${page * 9}`, auth.token);
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false);       
    }
    return (
        <div>
            <PostThumb posts={savePosts} result={result}/>

            {
                load && <img src={LoadIcon} alt="loader" className="d-block mx-auto"/>
            }

            <LoadMoreBtn result={result} page={page}
            load={load} handleLoadMore = {handleLoadMore} />
        </div>
    )
}

export default Saved
