import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const SUGGEST_TYPES = {
    LOADING:'LOADING_SUGGEST',
    GET_USERS:'GET_USERS_SUGGEST',
}

export const getSuggestions = (token) => async(dispatch) =>{
    try {
        dispatch({type: SUGGEST_TYPES.LOADING, payload:true})

        const res = await getDataApi('suggestionsUser', token);
        
        dispatch({type: SUGGEST_TYPES.GET_USERS, payload: res.data})

        dispatch({type: SUGGEST_TYPES.LOADING, payload:false})
    } catch (err) {
        dispatch({
            type:GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}
        })
    }
}