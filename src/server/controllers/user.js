const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const saltRounds = 10;

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    let { username, password } = req.body;

    await bcrypt.hash(password, saltRounds).then(function(hash) {
        password = hash
    })

    const createdUser = await prisma.user.create({
        data: {
            username,
            password
        }
    });

    res.json({ data: createdUser });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    let passwordsMatch = ""
    await bcrypt.compare(password, foundUser.password).then(function(result) {
        passwordsMatch = result
    });

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username }, jwtSecret);

    res.json({ data: token });
};

module.exports = {
    register,
    login
};