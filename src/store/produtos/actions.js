import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function obterGrupos(store) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=ObterGruposProdutos`, {
      Token: localStorage.getItem('token'),
    })
      .then(({ data }) => {
        store.commit('setGroups', data)
      })
      .catch(() => {
        Notify.create({
          color: 'red',
          position: 'bottom',
          message: 'Erro de conexão',
          icon: 'ion-ios-warning'
        })
        reject();
      })
      .finally(() => {

      });
  })
}

export function listar(store) {
  Loading.show();
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=ObterProdutos`, {
      Token: localStorage.getItem('token'),
    })
      .then(({ data }) => {

      })
      .catch(() => {
        Notify.create({
          color: 'red',
          position: 'bottom',
          message: 'Erro de conexão',
          icon: 'ion-ios-warning'
        })
        reject();
      })
      .finally(() => {
        Loading.hide();
      });
  });
}

export function filtrar(store, params) {
  Loading.show();
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=ObterProdutosPG`, {
      Token: localStorage.getItem('token'),
      pagina: params.page,
      grupo: params.group,
      descricao: params.description
    })
      .then(({ data }) => {
        store.commit('setProductsCount', data.length)
        store.commit('setProducts', data)
      })
      .catch(() => {
        Notify.create({
          color: 'red',
          position: 'bottom',
          message: 'Erro de conexão',
          icon: 'ion-ios-warning'
        })
        reject();
      })
      .finally(() => {
        Loading.hide();
      });
  });
}

export function paginar(store, params) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=ObterProdutosPG`, {
      Token: localStorage.getItem('token'),
      pagina: params.page,
      grupo: params.group,
      descricao: params.description
    })
      .then(({ data }) => {
        store.commit('setProductsCount', data.length)
        if(data.length > 0) {
          if(params.page < 2)
            store.commit('setProducts', data)
          else
            store.commit('paginateProducts', data)
        }
      })
      .catch(() => {
        Notify.create({
          color: 'red',
          position: 'bottom',
          message: 'Erro de conexão',
          icon: 'ion-ios-warning'
        })
        reject();
      })
      .finally(() => {
        // Loading.hide();
      });
  });
}

export function detalharProduto(store, param) {
  console.log(param)
  store.commit('setProductDetails', param)
}

export function adicionarNoCarrinho(store, params) {
  store.commit('addToShoppingCart', params)
  store.commit('addQuantityShoppingCart', params)
}

export function removerDoCarrinho(store, params) {
  store.commit('removeFromShoppingCart', params)
  store.commit('removeQuantityShoppingCart', params)
}

export function enviarPedidos(store, params) {
  Loading.show();
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=EnviarPedidosJSON`, {
      Token: localStorage.getItem('token'),
      PedidosJSON: params
    })
      .then(({ data }) => {
        store.commit('cleanShoppingCart')
      })
      .catch(() => {
        Notify.create({
          color: 'red',
          position: 'bottom',
          message: 'Erro de conexão',
          icon: 'ion-ios-warning'
        })
        reject();
      })
      .finally(() => {
        Loading.hide();
        Notify.create({
          color: 'green',
          position: 'bottom',
          message: 'Seu pedido foi enviado :)',
          icon: 'ion-ios-checkmark'
        })
      });
  });
}
