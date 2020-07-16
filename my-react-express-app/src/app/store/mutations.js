export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const REQUEST_AUTHENTICATED_USER = 'REQUEST_AUTHENTICATED_USER';
export const PROCESSING_AUTHENTICATED_USER = 'PROCESSING_AUTHENTICATED_USER';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';

export const requestTaskCreation = (groupId) => ({
    type: REQUEST_TASK_CREATION,
    groupId
});

export const createTask = (groupId, taskId, ownerId ) => ({
    type: CREATE_TASK,
    groupId,
    taskId,
    ownerId
});

export const setTaskCompletion = ({id, isComplete}) => ({
    type: SET_TASK_COMPLETE,
    taskId: id,
    isComplete
});

export const setTaskName = ({id, name}) => ({
    type: SET_TASK_NAME,
    taskId: id, 
    name
});

export const setTaskGroup = ({id, groupId}) => ({
    type: SET_TASK_GROUP,
    taskId  : id,
    groupId
});

export const requestAuthenticatedUser = (username, password) => ({
    type: REQUEST_AUTHENTICATED_USER,
    username,
    password
});

export const processingAuthenticatedUser = (status = AUTHENTICATING , session = null) => ({
    type: PROCESSING_AUTHENTICATED_USER,
    session,
    authenticated: status
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});