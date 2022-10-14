import { defineStore } from 'pinia'

export const userToEdit = defineStore('userList', {
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
        startEditing(userBeingEdited){
            this.userToEdit = userBeingEdited
            this.isEditing = true
        },
        finishEditing(){
            this.userToEdit = {
                user: null,
                idx: null
            },
            this.isEditing = false
        }
    }
})