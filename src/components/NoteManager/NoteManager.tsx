import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import './NoteManager.scss';

import { store } from '../../stores/Store';
import { AddNote } from '../AddNote/AddNote';
import { Note } from '../Note/Note';


@observer export class NoteManager extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        const actualNoteArray = store.groups.currentGroup.notes;

        return (
            <div className="noteManager">
                <div className="noteContainer">
                    <div className="notes">
                        <Link to="/addNote">
                            <div className="note gEmpty">
                                <div className="supbar">

                                </div>
                                <div className="nState">
                                    <span>+</span>
                                    <p>Haz click para añadir una nota</p>
                                </div>
                                <div className="nContent">

                                </div>
                            </div>
                        </Link>

                    {(actualNoteArray!=null)? actualNoteArray.map(
                        (e: any) =>
                            <Note key={e.id} id={e.id} name={e.name} />
                    ) : console.log("Esta wea no funciona")
                    }
                    </div>
                </div>
            </div>

        )
    }

};
