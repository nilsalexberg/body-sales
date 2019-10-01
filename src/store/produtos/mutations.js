export function setLista(state, lista) {
  state.lista = lista
}

export function setProducts(state, payload) {
  state.products = payload
}

export function setPaginateProducts(state, payload) {
  state.products = [ ...state.products, ...payload]
}

export function setGroups(state, payload) {
  state.groups = payload
}
