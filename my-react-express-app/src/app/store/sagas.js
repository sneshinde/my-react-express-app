import { take, put, select } from 'redux-saga/effects';
import * as mutations from './mutations';
import uuid from 'uuid';

import axios from 'axios';
import { history } from './history';

const url = process.env.NODE_ENV == `production` ? `` : `http://localhost:8888`;

export function* taskCreationSaga() {
    while (true) {
        const {groupId} = yield take(mutations.REQUEST_TASK_CREATION);
        const taskId = uuid();
        // const taskId = 'DSADAS';
        const ownerId = `U1`;
        yield put(mutations.createTask(groupId, taskId, ownerId));
        const { res } = yield axios.post(url + `/task/new`, { 
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'}},
        {
            task: {
                id: taskId,
                group: groupId,
                owner: ownerId,
                isComplete: false,
                name: "New Task from Saga"
            }
        });
        console.info("Got Response, ", res);
    }
}

// export function* taskModificationSaga() {
//     while(true) {
//         const task = yield ([
//             mutations.SET_TASK_GROUP,
//             mutations.SET_TASK_NAME,
//             mutations.SET_TASK_COMPLETE
//         ])

//         axios.post(url + `/task/update`,{
//             task: {
//                 id: task.taskId,
//                 group: task.groupId,
//                 name: task.name,
//                 isComplete: task.isComplete
//             }
//         })
//     }
// }

export function* userAuthenticationSaga(){
    while(true){
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATED_USER);
        try{
            const { data } = yield axios.post(url + `/authenticateUser`, {username, password});
            if(!data){
                throw new Error();
            }
            console.log('Authenticated, ', data);
            yield put(mutations.setState(data.state));
            yield put(mutations.processingAuthenticatedUser(mutations.AUTHENTICATED));
            history.push('/dashboard');
        }catch(e){
            console.log("can't authenticate user");
            yield put(mutations.processingAuthenticatedUser(mutations.NOT_AUTHENTICATED));
        }
    }
}