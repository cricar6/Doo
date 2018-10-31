import { observable, action, computed } from 'mobx';
import { store } from './Store';

interface Task {
    name: string,
    id: string,
    ended : boolean
}

export class TasksStore {

    @observable task: Task = {
        name: null,
        id: null,
        ended: null
    }

    @observable tasks : any[];

    @observable tasksEnded : any [];
    @observable tasksUnEnded : any [];
    

    @action handleTaskName (taskName: string) {
        this.task.name = taskName;
    }

    IDGenerator = ()  => {
        return '_' + Math.random().toString(26).substr(2, 9);
    }

    @action createTask () {
        this.task.id = this.IDGenerator();

        let taskArray = [];

        this.task.ended = false;
        
        let task = {
            name: this.task.name,
            id : this.task.id,
            ended : this.task.ended
        }


        taskArray.push (task);

        console.log (task);
        console.log (taskArray);

        store.groups.currentGroup.tasks = taskArray.concat(store.groups.currentGroup.tasks);
        console.log (store.groups.currentGroup.tasks);

        let actualGroupId = store.groups.currentGroup.id;


        let startSpliceGroupIndex = store.groups.groups.indexOf (store.groups.groups.find((elem: any) => actualGroupId === elem.id));
        store.groups.groups.splice(startSpliceGroupIndex, 1, store.groups.currentGroup);

        localStorage.setItem('groupArray', JSON.stringify(store.groups.groups));

    }

    @action filterTasks () {

        this.tasksUnEnded = JSON.parse(localStorage.getItem('tasksUnEnded'));
        this.tasksEnded = JSON.parse(localStorage.getItem('tasksEnded'));

        const actualTaskArray = store.groups.currentGroup.tasks;

        if (actualTaskArray != null) {

            if (actualTaskArray.some(elem => elem == null)) {
                actualTaskArray.splice(
                    actualTaskArray.indexOf(
                        actualTaskArray.find(
                            elem => elem == null
                        )
                    ), 1)
            };
    
            this.tasksEnded = actualTaskArray.filter(
                (e: any) => 
                    e.ended == true
            );
    
            localStorage.setItem('tasksEnded', JSON.stringify(this.tasksEnded));
    
            this.tasksUnEnded = actualTaskArray.filter(
                (e: any) => 
                    e.ended == false
            );
    
            localStorage.setItem('tasksUnEnded', JSON.stringify(this.tasksUnEnded));
    
        }
        

    }

    @action endATask(id: string) {
        console.log (id);


        let task = store.groups.currentGroup.tasks.find(
            (elem:any) => 
                elem.id === id 
            );

        task.ended = true;
        
    }

    @action unEndATask(id: string) {
        console.log (id);

        let task = store.groups.currentGroup.tasks.find(
            (elem:any) => 
                elem.id === id 
            );
            //Hacer logica para que cuando una tarea sea true o false esa tarea cambie en realidad
            //Hacer logica de porcentaje
        task.ended = false;
    }

    @observable calculatePercentageofTasksLeft () {
        if (this.tasksEnded!= null ||this.tasksUnEnded!= null ) {
            let tasksEnded = this.tasksEnded;
        
            let tasksUnEnded = this.tasksUnEnded;
            
            let qEnded = tasksEnded.length;
            let qUnEnded = tasksUnEnded.length;
            let qTotal = qEnded+qUnEnded;
            
            if (isNaN(qTotal)) {
                return qTotal = 0;
            } else {
                return Math.floor(((qEnded) / (qTotal)) * 100);   
            }
        }

    }
}
