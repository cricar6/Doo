import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './GDescription.scss';

import { store } from '../../stores/Store';

interface GDescriptionProps { 
    daysUntilDeadline : number,
    name: string,
    description : string,
    members: any []
 }

export class GDescription extends React.Component<GDescriptionProps> {

    constructor(props: any) {
        super(props);

    }

    render() {

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
            <article >
                <div className="generalContainer">

                    <div className="container">
                        <div className="supbar">

                        </div>
                        <div className="daysLeft">
                            <div className="item2">
                                <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
                                    <circle className="donut-segment-base" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#2C3460" strokeWidth="2"
                                        strokeDasharray="50 50" strokeDashoffset="250" strokeLinecap="round"></circle>


                                    <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#4cbcc3" strokeWidth="2"
                                        strokeDasharray="25 75" strokeDashoffset="250" strokeLinecap="round"></circle>

                                    <g className="chart-text">

                                        <text x="50%" y="50%" className="chart-number">
                                            {this.props.daysUntilDeadline}d
                                    </text>
                                        <text x="50%" y="50%" className="chart-label">
                                            <tspan x="50%" y="50%" className="chart-label-one"> Time Left</tspan>
                                        </text>

                                    </g>

                                </svg>
                            </div>
                        </div>
                        <div className="teamMembers">

                            {membersUserArray.map(
                                (e: any) => 
                                <div className="member secondary" key={e.id}>
                                    <div className="avaContainer">
                                        <Avatar indentifier={e.avatar}    />  
                                    </div>
                                    <h3>{e.name}</h3>

                                </div>
                                )
                            }

                        </div>
                        <div className="generalInfo">
                            <div className="title">
                                {this.props.name}
                        </div>
                            <div className="description">
                               {this.props.description}
                        </div>
                        </div>
                    </div>
                    <div className="background">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#1B408E" d="M0 0 v100 Q50 60 100 100 V0z" />
                        </svg>
                    </div>
                </div>


            </article>



        )
    }
};
