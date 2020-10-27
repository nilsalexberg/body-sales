export function setClients(state, payload) {
  state.clients = payload
  state.clientsFiltered = payload
}

export function setClientsFiltered(state, payload) {
  if(payload)
    state.clientsFiltered = state.clients.filter(v => v.Nome.includes(payload))
  else
    state.clientsFiltered = state.clients
}

export function setSellers(state, payload) {
  state.sellers = payload
}

export function setSellersFiltered(state, payload) {
  if(payload)
    state.sellersFiltered = state.sellers.filter(v => v.Nome.includes(payload))
  else
    state.sellersFiltered = state.sellers
}
