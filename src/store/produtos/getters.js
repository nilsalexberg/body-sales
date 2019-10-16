export function getGroups(state) {
  return state.groups
}

export function getProducts(state) {
  console.log(state.products)
  return state.products
}

export function getProductsCount(state) {
  // console.log(state.productsCount)
  return state.productsCount
}

export function getProductDetails(state) {
  return state.getProductDetails
}

export function getShoppingCart(state) {
  return state.shoppingCart
}

export function getQtdShoppingCart(state) {
  return state.qtdShoppingCart
}

// export function getGroupsId(state) {
//   return state.groups.filter(group => group.Codigo_Grupo)
// }

// export function getGroupsDescription(state) {
//   return state.groups.filter(group => group.Descricao)
// }
