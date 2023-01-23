import { GLOBALTYPES } from "../actions/globalTypes";



const themeReducer = (state = null, action) =>{
    switch(action.type){
        case GLOBALTYPES.CALL:
            return action.payload;
        default:
            return state; 
    }
}

export default themeReducer;