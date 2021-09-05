import axios from "axios"
import {
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE
} from './jobTypes'

export const fetchJobsRequest = () => {
    return {
        type: FETCH_JOBS_REQUEST
    }
}
export const fetchJobsSuccess = jobs => {
    return {
        type: FETCH_JOBS_SUCCESS,
        payload: jobs
    }
}
export const fetchJobsFailure = error => {
    return {
        type: FETCH_JOBS_FAILURE,
        payload: error
    }
}
export const fetchJobs = () => {
    return (dispatch) =>{
        dispatch(fetchJobsRequest)
        axios.get('https://localhost:44381/api/Jobs', { headers: {
            'Content-Type': 'application/json;charset=utf-8',
        } })
        .then(response => {
            console.log(response)
            const jobs = response.data
            dispatch(fetchJobsSuccess(jobs))
        })
        .catch(error =>{
            const errorMsg = error.message 
            dispatch(fetchJobsFailure(errorMsg))
        })
        
    }
}