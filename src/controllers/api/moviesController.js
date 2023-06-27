const { getAllMovies, getOneMovie, getNewestMovies, getRecomendedMovies, createMovie, updateMovie, deleteMovie } = require('../../services/moviesServices');
const createResponseError = require('../../helpers/createResponseError');
const { validationResult } = require('express-validator');

const moviesController = {
    'list': async (req, res) => {

        try {
            const { count: total, rows: movies } = await getAllMovies(req);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/api/movies"
                },
                movies
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },
    'detail': async (req, res) => {
        try {
            const {id} = req.params;
            const movie = await getOneMovie(req, id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/movies/${id}`
                },
                data: movie
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },
    'new': async (req, res) => {
        try {
            const { count: total, rows: moviesNew } = await getNewestMovies(req)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/movies/new"
                },
                moviesNew
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },
    'recomended': async (req, res) => {
        try {
            const { count: total, rows: moviesRecommended } = await getRecomendedMovies(req)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/api/recommended"
                },
                moviesRecommended
            })

        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },
    'create': async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const movie = await createMovie(req.body)

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Pelicula creada exitosamente",
                    url: "/api/movies/create"
                },
                movie
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },
    'update': async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            let { id } = req.params;
            const movie = await updateMovie(req.body, id)
            const updatedMovie = await getOneMovie(req, id)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Pelicula actualizada exitosamente",
                    url: "/api/movies"
                },

                updatedMovie
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }

    },
    'destroy': async (req, res) => {
        try {
            let { id } = req.params;
            const movie = await deleteMovie(id)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Pelicula eliminada exitosamente",
                    url: "/api/movies"
                },
                movie
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    }
}

module.exports = moviesController;