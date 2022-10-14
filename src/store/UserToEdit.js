import { defineStore } from 'pinia'
import User from '../models/User'

export const userToEdit = defineStore('userToEdit', {
    state: () => ({ userToEdit: {
            user: null,
            idx: null
        },
        isEditing: false
    }),
    getters: {
        //name: (param) => instructions
    },
    actions: {
        startEditing(userBeingEdited, idx){
            this.userToEdit.user = userBeingEdited
            this.userToEdit.idx = idx
            this.isEditing = true
        },
        finishEditing(){
            this.userToEdit = {
                user: new User(),
                idx: null
            },
            this.isEditing = false
        }
    }
})