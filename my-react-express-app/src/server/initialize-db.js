import { defaultState } from './defaultState';
import { connect, connectDB } from './connect-db';

async function intializeDB() {
    let db = await connectDB();
    let user = await db.collection('users').findOne({id: "U1"});
    if(!user){
        for(let collectionName in defaultState) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
        }
    }
    
}

intializeDB();