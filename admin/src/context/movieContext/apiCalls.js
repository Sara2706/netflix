import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMoviesFailure, deleteMoviesStart, deleteMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"

export const getMovies = async(dispatch) => {
    dispatch(getMoviesStart());

    try {
        const res = await axios.get('/movies', {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(getMoviesSuccess(res.data))
    } catch (error) {
        dispatch(getMoviesFailure());
    }
}

export const deleteMovie = async(id,dispatch) => {
    dispatch(deleteMoviesStart);

    try {
        await axios.delete('/movies/'+id, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(deleteMoviesSuccess(id))
    } catch (error) {
        dispatch(deleteMoviesFailure());
    }
}

export const createMovie = async(movie,dispatch) => {
    dispatch(createMovieStart);

    try {
        const res = await axios.post('/movies/',movie, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(createMovieSuccess(res.data))
    } catch (error) {
        dispatch(createMovieFailure());
    }
}

export const updateMovie = async(id,movie,dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put('/movies/'+id,movie, {headers:{token:'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken},});
        dispatch(updateMovieSuccess(res.data))
    } catch (error) {
        dispatch((updateMovieFailure()));
    }
}