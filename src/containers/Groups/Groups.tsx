import * as React from 'react';
import Group from '../../components/Group/Group';
import { Link } from 'react-router-dom';
import './Groups.scss';

import { store } from '../../stores/Store';
import { Header } from '../../components/Header/Header';


class Admin extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {

        const actualGroupArray = store.groups.groups;

        if (actualGroupArray != null) {
            let newArray = actualGroupArray.filter((e) => {

                return e.usersInGroup.includes(store.users.currentUser.id);

            });

        };

        return (
            <div className="groups">
                <Header />
                <div className="groupsContainer">

                    <Link to="/groups/addGroup">
                        <div className="group gEmpty">
                            <div className="supbar">

                            </div>
                            <div className="nState">
                                <span>+</span>
                                <p>Haz click para añadir un grupo</p>
                            </div>
                            <div className="nContent">

                            </div>
                        </div>
                    </Link>

                    {(actualGroupArray!=null)? actualGroupArray.map(
                        (e: any) =>
                            <Group key={e.id} id={e.id} name={e.name} members={e.usersInGroup} />
                    ) : console.log("Esta wea no funciona")
                    }

                </div>
            </div>



        )
    }

}



export default Admin;