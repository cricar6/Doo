import * as React from 'react';
import { observer } from 'mobx-react';

import './TaskManager.scss';
import AddTask from '../AddTask/AddTask';

import { store } from '../../stores/Store';
import Task from '../Task/Task';

@observer class TaskManager extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        let tasksEnded = store.tasks.tasksEnded;
        let tasksUnEnded = store.tasks.tasksUnEnded;

        if (tasksEnded == null) {
            store.tasks.filterTasks();
            tasksEnded = store.tasks.tasksEnded;
        } else {
            tasksEnded = store.tasks.tasksEnded;
        }; 

        if (tasksUnEnded == null) {
            store.tasks.filterTasks();
            tasksUnEnded = store.tasks.tasksUnEnded;
        } else {
            tasksUnEnded = store.tasks.tasksUnEnded;
        };

        return (
            <div className="taskManager">
                <div className="taskContainer">
                <div className="tasks">
                
                </div>
                {
                    (tasksUnEnded!=null)? tasksUnEnded.map(
                        (e: any) =>
                            <Task key={e.id} id={e.id} name={e.name} ended={e.ended} />
                    ) : console.log("wea no woreal")
                }

                </div>
            <AddTask />

            </div>

        )
    }

};

export default TaskManager;