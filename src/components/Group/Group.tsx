import * as React from 'react';
import Group from '../../components/Group/Group';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Group.scss';
import Avatar from '../Avatar/Avatar';

import { store } from '../../stores/Store';

interface GroupProps { 
    id: string,
    name: string,
    members : any[];
 }
class Groups extends React.Component <GroupProps> {

    constructor (props : any) {
        super (props);
        
    }
    
    render() {
        let name =  this.props.name;
        let id =  this.props.id;
        let members = this.props.members;
        let membersUserArray : any[];

        
        members.forEach((e1) => {

            let memberUser = store.users.users.find( e2 => 
                e2.id == e1
             );

            let temporalArr = [];
            temporalArr.push(memberUser);

            membersUserArray = temporalArr.concat(membersUserArray);

            if (membersUserArray.some(elem => elem == null)) {
                membersUserArray.splice(
                    membersUserArray.indexOf(
                        membersUserArray.find(
                            elem => elem == undefined
                        )
                    ), 1)
            };
        });


        return (

            <Link to= {`/dashboard/${id}`} >
                <div className="group">
                    <div className="members">
                    {membersUserArray.map(
                        (e: any) => 
                            <Avatar indentifier={e.avatar} key={e.id}   />  
                        )
                    }
                                  

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
            </Link>


        )
    }

}



export default Groups;