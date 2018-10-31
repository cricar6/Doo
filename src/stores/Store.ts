import { observable, action, computed } from 'mobx';
import { array } from 'prop-types';
import { TasksStore } from './TasksStore';
import { UsersStore } from './UsersStore'
import { GroupsStore } from './GroupsStore';
import { NoteStore } from './NoteStore';


class Store {
    tasks = new TasksStore();
    users = new UsersStore();
    groups = new GroupsStore();
    notes = new NoteStore();
}

export const store = new Store();
