const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    console.log(req.headers.authorization)
    const { title, description, runtimeMins } = req.body;
    const { authorization } = req.headers.authorization

    try {
        const token = jwt.verify(authorization, jwtSecret);
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins
        }
    });
    
    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};