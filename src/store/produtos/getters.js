export function getProducts(state) {
  console.log(state.products)
  return state.products
}

export function getGroups(state) {
  return state.groups
}

// export function getGroupsId(state) {
//   return state.groups.filter(group => group.Codigo_Grupo)
// }

// export function getGroupsDescription(state) {
//   return state.groups.filter(group => group.Descricao)
// }
