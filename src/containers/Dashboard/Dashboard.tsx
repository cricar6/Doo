import * as React from 'react';
import { store } from '../../stores/Store';
import { GDescription } from '../../components/GDescription/GDescription';
import TaskManager from '../../components/TaskManager/TaskManager';
import { FinishedTasks } from '../../components/FinishedTasks/FinishedTasks';
import { NoteManager } from '../../components/NoteManager/NoteManager';

import './Dashboard.scss';
import { Header } from '../../components/Header/Header';

export class Dashboard extends React.Component {

    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        let locationWindow = window.location.pathname;
        let locationArray = locationWindow.split('/');
        return locationArray.slice(-1)[0];
    }
    render() {
        const groupIdLocation = this.componentDidMount();
        store.groups.searchGroup(groupIdLocation);

        let currentGroup = store.groups.currentGroup;
        console.log(currentGroup);


        return (
            <div className="dashboard">
                <Header />
                <div className="first column">
                    <GDescription daysUntilDeadline={currentGroup.daysUntilDeadLine} name={currentGroup.name} description={currentGroup.description} members={currentGroup.usersInGroup} />
                </div>
                <div className="second column">
                    <div className="firstRow">
                        <TaskManager />
                    </div>
                    <div className="secondRow">
                        <NoteManager />
                    </div>
                </div>
                <div className="third column">
                    <FinishedTasks />
                </div>

            </div>
        )
    }

}
