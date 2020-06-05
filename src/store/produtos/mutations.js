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

export function setProductDetails(state, payload) {
  state.productDetails = payload
}

export function addToShoppingCart(state, payload) {
  state.shoppingCart.push(payload)
  /** Sort shopping cart by same products */
  state.shoppingCart.sort(function(a, b) {return a.ID_Produto - b.ID_Produto})
}

export function removeFromShoppingCart(state, payload) {
  state.shoppingCart.splice(payload, 1)
}

export function cleanShoppingCart(state) {
  state.shoppingCart = []
  state.qtdShoppingCart = []
}

export function addQuantityShoppingCart(state, payload) {
  for(let i = 0; i < state.qtdShoppingCart.length; i++) {
    if (state.qtdShoppingCart[i].ID_Produto == payload.ID_Produto) {
      state.qtdShoppingCart[i].quantidade += 1
      return
    }
  }
  state.qtdShoppingCart.push(payload)
  state.qtdShoppingCart[state.qtdShoppingCart.length - 1]['quantidade'] = 1
}

export function removeQuantityShoppingCart(state, payload) {
  for(let i = 0; i < state.qtdShoppingCart.length; i++) {
    if (state.qtdShoppingCart[i].ID_Produto == payload.product.ID_Produto) {
      state.qtdShoppingCart[i].quantidade -= 1
    }
    if (state.qtdShoppingCart[i].quantidade == 0)
      state.qtdShoppingCart.splice(payload.index, 1)
  }
}
