import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Task.scss';
import { store } from '../../stores/Store';

interface TaskProps {
    id: string,
    name: string,
    ended: boolean
}

class Task extends React.Component<TaskProps> {

    constructor(props: any) {
        super(props);

    }
    render() {
        const id = this.props.id;
        const ended = this.props.ended;
        function exportButton() {
            if (!ended) {
                return <button
                    type="submit"
                    className="checkBox"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            store.tasks.endATask(id);
                            store.tasks.filterTasks();
                        }
                    } >
                    <div>
                    </div>
                </button>
            } else {

                return <button
                    type="submit"
                    className="checkBox"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            store.tasks.unEndATask(id);
                            store.tasks.filterTasks();

                        }
                    } >
                    <div>
                    </div>
                </button>

            }

        }

        return (
            <div className="task" >
                {exportButton()}
                <div className="taskInfo">
                    <span>{this.props.name}</span>
                    <div className="members">
                        <div className="member">
                        </div>
                    </div>
                </div>
            </div>


        )
    }
};

export default Task;