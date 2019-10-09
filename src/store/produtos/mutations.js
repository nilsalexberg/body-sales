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

export function addToShoppingCart(state, payload) {
  state.shoppingCart.push(payload)
  console.log(state.shoppingCart)
}

export function removeFromShoppingCart(state, payload) {
  state.shoppingCart.splice(payload, 1)
  console.log(state.shoppingCart)
}

export function cleanShoppingCart(state) {
  state.shoppingCart = []
}
