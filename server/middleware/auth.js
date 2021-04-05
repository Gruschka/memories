import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        //Add user ID to the request depending on auth system
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData.id;
        } else {
            //Googles id
            decodedData = jwt.decode(token);
            //We use gooogles Id
            req.userId = decodedData.sub;
        }

        next();
    } catch (error) {
        console.log(`error`, error)
    }
}

export default auth;