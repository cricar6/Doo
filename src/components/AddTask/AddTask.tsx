import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import { observer } from 'mobx-react';

import { store } from '../../stores/Store';
import './AddTask.scss';

@observer class AddTask extends React.Component {


    render() {

        return (
            <div className="addTask">
                    <form onSubmit={
                        (ev) => {
                            ev.preventDefault();
                            store.tasks.createTask();
                            store.tasks.filterTasks();
                        }
                    }>
                        <button type="submit">Add Task</button>

                        <input type="text" placeholder="Name" onChange={(e) => store.tasks.handleTaskName(e.target.value)}/>
                    </form>


            </div>

        )
    }
}

export default AddTask;