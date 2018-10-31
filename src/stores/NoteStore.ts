import { observable, action, computed } from 'mobx';
import { store } from './Store';

interface Note {
    name: string,
    id: string
}

export class NoteStore {

    @observable note: Note = {
        name: null,
        id: null,
    }

    @observable notes : any[];


    @action handleNoteName (noteName: string) {
        this.note.name = noteName;
    }

    IDGenerator = ()  => {
        return '_' + Math.random().toString(26).substr(2, 9);
    }

    @action createNote () {
        this.note.id = this.IDGenerator();

        let noteArray = [];

        
        let note = {
            name: this.note.name,
            id : this.note.id,
        }


        noteArray.push (note);

        console.log (note);
        console.log (noteArray);

        store.groups.currentGroup.notes = noteArray.concat(store.groups.currentGroup.notes);

        if (store.groups.currentGroup.notes != null) {
            if (store.groups.currentGroup.notes.some(elem => elem == null)) {
                store.groups.currentGroup.notes.splice(
                    store.groups.currentGroup.notes.indexOf(
                        store.groups.currentGroup.notes.find(
                            elem => elem == null
                        )
                    ), 1)
            };
        };

        console.log (store.groups.currentGroup.notes);

        localStorage.setItem('currentGroup', JSON.stringify(store.groups.currentGroup));



        let actualGroupId = store.groups.currentGroup.id;

        let startSpliceGroupIndex = store.groups.groups.indexOf (store.groups.groups.find((elem: any) => actualGroupId === elem.id));
        store.groups.groups.splice(startSpliceGroupIndex, 1, store.groups.currentGroup);

        localStorage.setItem('groupArray', JSON.stringify(store.groups.groups));

    }
}
