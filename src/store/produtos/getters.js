export function getGroups(state) {
  return state.groups
}

export function getGroupsFiltered(state) {
  return state.groupsFiltered
}

export function getProducts(state) {
  return state.products
}

export function getProductsCount(state) {
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

export function getProductDisponibility(state) {
  return state.productDisponibility
}

// export function getGroupsId(state) {
//   return state.groups.filter(group => group.Codigo_Grupo)
// }

// export function getGroupsDescription(state) {
//   return state.groups.filter(group => group.Descricao)
// }
