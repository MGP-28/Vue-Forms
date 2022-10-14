import { defineStore } from 'pinia'

import User from '../models/User'

export const userList = defineStore('userList', {
    state: () => ({ users: [] }),
    getters: {
        //getUser: (idx) => JSON.parse(JSON.stringify(this.users[idx]))
    },
    actions: {
        addUser(user){
            this.users.push(user)
            this.saveUsersToLC()
        },
        replaceUser(idx, newUser){
            this.users[idx] = new User(newUser)
            this.saveUsersToLC()
        },
        removeUser(idx){
            //not used rn
        },
        saveUsersToLC(){
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        getUsersFromLC(){
            const users = JSON.parse(localStorage.getItem('users'));
            if(!users) return
            users.forEach(user => {
                this.users.push(
                    new User(
                        user
                    )
                )
            });
        }
    }
})