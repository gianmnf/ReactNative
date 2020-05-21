const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
    
    try {
        console.log(req.headers);
        const authHeaders = req.headers.authorization;
    
        if (!authHeaders) {
            return res.status(401).json({ error: "Token não fornecido" });
        }
    
        const [, token] = authHeaders.split(" ");
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded._id;
        req.userName = decoded.NomeUsuario;

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token Inválido " + err });
    }
}