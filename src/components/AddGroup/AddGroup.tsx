import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import './AddGroup.scss'

import { store } from '../../stores/Store';
import { observer } from 'mobx-react';

interface AGroupProps {
    history : any,
    match: any,
    location: any
}

@observer class AddGroup extends React.Component<AGroupProps> {
    
    render() {

        var today = new Date();
        var date = today.toISOString().substr(0, 10);

        return (
            <div className="cPopUp">
                <div className="popContainer">
                    <h3>Create a new group</h3>
                    <form 
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            store.groups.createGroup();
                            this.props.history.push ("/groups");

                        }
                    }>
                    <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={
                        (e) => {
                            store.groups.handleName(e.target.value)
                        }
                    }/>
                    <textarea 
                    placeholder="Description" 
                    onChange={
                        (e) => {
                        store.groups.handleDescription(e.target.value)
                        }
                    }></textarea>
                    <input 
                    type="date" 
                    placeholder="Deadline" 
                    onChange={
                        (e) => {
                            store.groups.handleDate(e.target.valueAsDate)
                            }
                        } />
                    <button type="submit">OK</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default AddGroup;