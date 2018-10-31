import { observable, action, computed } from 'mobx';
import { createSecureServer } from 'http2';
import { store } from './Store';

interface Group {
    id: string,
    name: string;
    description: string;
    date: Date;
    deadlineDate: Date;
    daysUntilDeadLine: number;
    deadLinePercentage: number;
    finishedPercentage: number;
    tasks: any[];
    notes: any [];
    usersInGroup: any[];
}

export class GroupsStore {

    @observable group: Group = {
        id: null,
        name: null,
        description: null,
        date: null,
        deadlineDate: null,
        daysUntilDeadLine: 0,
        deadLinePercentage: 0,
        finishedPercentage: 0,
        tasks: null,
        notes: null,
        usersInGroup: null
    };

    @observable groups: any[];
    @observable redirecttoGroups: boolean;
    @observable currentGroup : Group = null;
    
    @action handleName(name: string) {
        this.group.name = name;
    }

    @action handleDescription(description: string) {
        this.group.description = description;
    }

    @action handleDate(date: Date) {
        this.group.deadlineDate = date;
    }

    IDGenerator = () => {
        return '_' + Math.random().toString(26).substr(2, 9);
    }

    @action createGroup() {

        this.groups = JSON.parse(localStorage.getItem('groupArray'));

        this.group.id = this.IDGenerator();

        let temporalArray = [];
        temporalArray.push(store.users.currentUser.id);

        this.group.usersInGroup = temporalArray.concat(this.group.usersInGroup);
        this.group.usersInGroup.reduce((anterior, inicial, index, vector) => {
            if (anterior == inicial) {
                this.group.usersInGroup.splice(index, 1)
            }
        });

        if (this.group.usersInGroup.some(elem => elem == null)) {
            this.group.usersInGroup.splice(
                this.group.usersInGroup.indexOf(
                    this.group.usersInGroup.find(
                        elem => elem == null
                    )
                ), 1)
        };

        let group = {

            id: this.group.id,
            name: this.group.name,
            description: this.group.description,
            date: this.group.date,
            deadlineDate: this.group.deadlineDate,
            daysUntilDeadLine: this.group.daysUntilDeadLine,
            deadLinePercentage: this.group.deadLinePercentage,
            finishedPercentage: this.group.finishedPercentage,
            tasks: this.group.tasks,
            notes : this.group.notes,
            usersInGroup: this.group.usersInGroup

        }

        let today = new Date();
        let dayT = today.getDate();
        let monthT = today.getMonth()+1;
        let yearT = today.getFullYear();
        
        let deadline =  group.deadlineDate;
        let dayD = deadline.getDate()+1;
        let monthD = deadline.getMonth()+1;
        let yearD = deadline.getFullYear();
        
        let fTodayDate = Date.UTC(yearT, monthT, dayT);
        let fDeadlineDate = Date.UTC(yearD, monthD, dayD);
        let diff = fTodayDate - fDeadlineDate;
        let days = Math.floor (diff / (1000 * 60 * 60 * 24));
        this.group.daysUntilDeadLine = days;

        let currentGroupArray = [];
        currentGroupArray.push(group);

        ((this.groups != null) ? currentGroupArray = this.groups.concat(currentGroupArray) : console.log("El primer grupo será añadido"));

        this.groups = currentGroupArray;
        localStorage.setItem('groupArray', JSON.stringify(this.groups));

        let temporalUserGroupArray = [];
        temporalUserGroupArray.push(group.id);
        store.users.currentUser.groups = temporalUserGroupArray.concat(store.users.currentUser.groups);

        localStorage.setItem('currentUser', JSON.stringify(store.users.currentUser));

        let startSpliceIndex = store.users.users.indexOf(store.users.users.find(elem => elem.email === store.users.currentUser.email
            && elem.email === store.users.currentUser.password));

        store.users.users.splice(startSpliceIndex, 1, store.users.currentUser);
        localStorage.setItem('userArray', JSON.stringify(store.users.users));

        this.redirecttoGroups = true;
    }

    @action searchGroup (id : string) {
        let currentGroup = this.groups.find ((e : any) => id == e.id);
        localStorage.setItem('currentGroup', JSON.stringify(currentGroup));
        this.currentGroup = currentGroup;
        

    }
}
