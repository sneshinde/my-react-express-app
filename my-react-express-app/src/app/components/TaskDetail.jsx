import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({id, comments, task, isComplete, groups, setTaskCompletion, setTaskGroup, setTaskName}) => (
    <div>
        <input defaultValue={task.name} onChange={setTaskName}></input>
        <div>
            <button onClick={()=> setTaskCompletion(id, !isComplete)}>{isComplete ? `ReOpen${isComplete}` : `Complete${isComplete}`}</button>
        </div>
        <div>
            <select onChange={setTaskGroup}>
                {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>
        <div>
            <Link to="/dashboard">
                <button>Done</button>
            </Link>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let task = state.tasks.find((task)=>task.id === id);
    let groups = state.groups;

    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
};

const matchDispatchToProps = (dispatch, ownProps) => {
    let id = ownProps.match.params.id;

    return {
        setTaskCompletion(id, isComplete) {
            mutations.setTaskCompletion(id, isComplete);
        },
        setTaskGroup(e) {
            mutations.setTaskGroup(id, e.target.value);
        },
        setTaskName(e) {
            mutations.setTaskName(id, e.target.value);
        }
    }
}
export const ConnectedTaskDetail = connect(mapStateToProps, matchDispatchToProps)(TaskDetail);