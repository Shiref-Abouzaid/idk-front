export const state = () => ({
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    qustionToAdd:'',
    notifications:0
  })
  

export const mutations = {
    addQustionToEdit(state, value, value2) {
      state.qustionToAdd = value

    }
  }