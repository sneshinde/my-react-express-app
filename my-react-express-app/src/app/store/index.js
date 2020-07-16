import { createStore, applyMiddleware } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';
import { combineReducers } from 'redux';

export const store = createStore(
    // function reducer (state=defaultState, action) {
    //     return state;
    // },
    combineReducers({
        session(userSession = defaultState.session || {}, action){
            let { type, authenticated, session } = action;
            switch(type) {
                case mutations.SET_STATE:
                    return {...userSession, id: action.state.session.id}
                case mutations.REQUEST_AUTHENTICATED_USER:
                    return {...userSession, authenticated: mutations.AUTHENTICATING};
                case mutations.PROCESSING_AUTHENTICATED_USER:
                    return {...userSession, authenticated};
                default:
                    return userSession;
            }
        },
        tasks(tasks = [], action){
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.tasks;
                case mutations.CREATE_TASK:
                    console.log(action);
                    return [...tasks,{
                        id: action.taskId,
                        name: 'New Task',
                        group: action.groupId,
                        owner: action.ownerId,
                        isComplete: false
                    }]
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map((task)=>{
                        return (task.id == action.taskId) ? {...task, isComplete:action.isComplete} : task;
                    });
                    case mutations.SET_TASK_NAME:
                    return tasks.map((task)=>{
                        return (task.id == action.taskId) ? {...task, name:action.name} : task;
                    });
                    case mutations.SET_TASK_COMPLETE:
                    return tasks.map((task)=>{
                        return (task.id == action.taskId) ? {...task, group:action.groupId} : task;
                    });
            }
            return tasks;
        },
        comments(comments = []){
            return comments;
        },
        users(users = []){
            return users;
        },
        groups(groups = [], action){
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.groups;
            }
            return groups;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for(let saga in sagas){
    sagaMiddleware.run(sagas[saga]);
}
