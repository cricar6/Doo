import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import './AddNote.scss'

import { store } from '../../stores/Store';
import { observer } from 'mobx-react';

interface AddNoteProps {
    history : any,
    match: any,
    location: any
}

@observer export class AddNote extends React.Component<AddNoteProps> {
    
    render() {

        return (
            <div className="cPopUp">
                <div className="popContainer">
                    <h3>Create a new note</h3>
                    <form 
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            store.notes.createNote();
                            this.props.history.push ("/groups");

                        }
                    }>

                    <textarea 
                    placeholder="Description" 
                    onChange={
                        (e) => {
                        store.notes.handleNoteName(e.target.value)
                        }
                    }></textarea>
                    
                    <button type="submit">OK</button>
                    </form>
                </div>
            </div>

        )
    }
}
