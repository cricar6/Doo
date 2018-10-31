import * as React from 'react';
import EndedPercentage from '../EndedPercentage/EndedPercentage';
import { store } from '../../stores/Store';
import Task from '../Task/Task';
import { observer } from 'mobx-react';

import './FinishedTasks.scss';


@observer export class FinishedTasks extends React.Component {

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

        let percentage = store.tasks.calculatePercentageofTasksLeft();
        console.log (percentage);

        
        return (
            <div className="endedTasks">
                <div className="container">
                    <div className="tasksEndedPercentage">
                    
                        <EndedPercentage percentage = {percentage} />
                    </div>
                    <div className="tasksEnded">
                        <div className="tasks">
                    
                        </div>
                        {
                            (tasksEnded!=null)? tasksEnded.map(
                                (e: any) =>
                                    <Task key={e.id} id={e.id} name={e.name} ended={e.ended} />
                            ) : console.log("wea no woreal")
                        }
                    </div>
                </div>

            </div>

        )
    }

};

