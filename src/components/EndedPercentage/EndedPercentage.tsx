import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './EndedPercentage.scss';

interface TaskProps { 
    percentage: number
 }
 class EndedPercentage extends React.Component <TaskProps> {
    constructor (props : any) {
        super (props);
        
    }

    render () {
    
        const percentage = this.props.percentage;
        const percentageLess = Math.abs(this.props.percentage-100);
        
        return (
            <div>
                    <div className="item">
            <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
    
                <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
    
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#4cbcc3" strokeWidth="2"
                    strokeDasharray={percentage+" "+percentageLess} strokeDashoffset="205" strokeLinecap="round"></circle>
    
                <g className="chart-text">
    
                    <text x="50%" y="50%" className="chart-number">
                        {percentage}
                        <tspan x="74%" y="40%"> % </tspan>
                    </text>
                    <text x="50%" y="50%" className="chart-label">
                        <tspan x="50%" y="50%" className="chart-label-one"> Completed</tspan>
                        <tspan x="50%" y="56%" className="chart-label-two"> Tasks</tspan>
                    </text>
    
                </g>
    
            </svg>
        </div>
            </div>
    
        )
    }
 }

export default EndedPercentage;