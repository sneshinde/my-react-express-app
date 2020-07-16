import md5 from 'md5';
import uuid from 'uuid';

import { connectDB } from './connect-db';

const authenticationToken = [];

export async function assembleUserState(user) {
    let db = await connectDB();

    let tasks = await db.collection(`tasks`).find({owner: user.id}).toArray();
    let groups = await db.collection(`groups`).find({owner: user.id}).toArray();

    return {
        tasks,
        groups,
        session: {authenticated: 'AUTHENTICATED', id: user.id}
    }
}
export const authenticationRoute1 = app => {
    app.post(`/authenticateUser`, async (req, res)=>{
        res.status(200).send();
    });
};
export const authenticationRoute = app => {
    app.post('/authenticateUser', async (req, res)=>{
        const { username, password }  = req.body;
        let db = await connectDB();
        let collection = db.collection('users');

        let user = await collection.findOne({name: username});

        if(!user){
            return res.status(500).send("User not found");
        }

        let hash = md5(password);
        let passwordCorrect = hash === passwordHash;

        if(!passwordCorrect){
            return res.status(500).send("password incorrect");
        }

        let token = uuid();

        authenticationRoute.push({
            token,
            userId: user.id
        });

        let state=await assembleUserState(user);
        res.send({token,state});
    });
}