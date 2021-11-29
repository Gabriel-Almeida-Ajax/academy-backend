

class Authentication {

    login(req, token) {
        
    }

    logout(req, token) {
        
    }

    withPassAuth(req, res, next){
        const authenticated = req.cookies['academy-authenticated'];

        if (!authenticated) {
            return res.status(401).json({ message: "Não autorizado" })
        };

        next();
    }

}

module.exports = new Authentication();