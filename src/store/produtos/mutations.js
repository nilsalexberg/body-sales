export function setGroups(state, payload) {
  state.groups = payload
}

export function setLista(state, lista) {
  state.lista = lista
}

export function setProducts(state, payload) {
  state.products = payload
  state.remainedProductsCount = payload.length
}

export function setProductsCount(state, payload) {
  state.productsCount = payload
}

export function paginateProducts(state, payload) {
  state.products = [ ...state.products, ...payload]
}
