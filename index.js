const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cookieParser());
const secure = ({ origin, apiKey, tokenSecret, tokenName, sameSite, onError }) => {
    const errorMessage = onError || { error: true, message: 'Permission Denied.' };
    const secureApi = async (req, res, next) => {
        const clientOrigin = req.headers?.origin;
        const clientApiKey = req.headers['x-api-key'];
        if (origin?.includes(clientOrigin) && apiKey === clientApiKey) {
            const token = jwt.sign({ id: crypto.randomUUID(), secure: true }, tokenSecret);
            res.cookie(tokenName || 'x-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: sameSite || 'none',
            });
            try {
                await jwt.verify(token, tokenSecret);
                next();
            }
            catch (error) {
                res.status(401).send(errorMessage);
            }
        }
        else {
            res.status(401).send(errorMessage);
        }
    };
    return secureApi;
};
module.exports = secure;