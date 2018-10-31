import * as React from 'react';
import Group from '../../components/Group/Group';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Note.scss';
import Avatar from '../Avatar/Avatar';

import { store } from '../../stores/Store';

interface NoteProps { 
    id: string,
    name: string,
 }
export class Note extends React.Component <NoteProps> {

    constructor (props : any) {
        super (props);
        
    }
    
    render() {
        let name =  this.props.name;

        return (
                <div className="note">
                    <div className="members">

                    </div>
                    <div className="gContent">
                        --
                    </div>
                    <div className="name">
                    <p>
                        {name}
                    </p>
                    </div>
                </div>



        )
    }

}

