import axios from 'axios';
import { BASE_URL } from './config';

export const getDataApi = async(url,token) =>{
    const res = await axios.get(`${BASE_URL}/api/${url}`,{
        headers:{Authorization:token }
    })
    return res;
}

export const postDataApi = async(url, post, token) =>{
    const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
        headers:{Authorization:token }
    })
    return res;
}

export const putDataApi = async(url, post, token) =>{
    const res = await axios.put(`${BASE_URL}/api/${url}`, post, {
        headers:{Authorization:token }
    })
    return res;
}

export const patchDataApi = async(url, post, token) =>{
    const res = await axios.patch(`${BASE_URL}/api/${url}`, post, {
        headers:{Authorization:token }
    })
    return res;
}

export const deleteDataApi = async(url, token) =>{
    const res = await axios.delete(`${BASE_URL}/api/${url}`, {
        headers:{Authorization:token }
    })
    return res;
}