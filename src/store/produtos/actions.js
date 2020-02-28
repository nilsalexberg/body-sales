import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function obterGrupos(store) {
  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=ObterGruposProdutos`, {
    //   Token: localStorage.getItem('token'),
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=ObterGruposProdutos',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
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

  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=ObterProdutos`, {
    //   Token: localStorage.getItem('token'),
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=ObterProdutos',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
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

  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));
  parameters.set('pagina', params.page);
  parameters.set('grupo', params.group);
  parameters.set('descricao', params.description);

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=ObterProdutosPG`, {
    //   Token: localStorage.getItem('token'),
    //   pagina: params.page,
    //   grupo: params.group,
    //   descricao: params.description
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=ObterProdutosPG',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
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
  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));
  parameters.set('pagina', params.page);
  parameters.set('grupo', params.group);
  parameters.set('descricao', params.description);

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=ObterProdutosPG`, {
    //   Token: localStorage.getItem('token'),
    //   pagina: params.page,
    //   grupo: params.group,
    //   descricao: params.description
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=ObterProdutosPG',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
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
  store.commit('setProductDetails', param)
}

export function adicionarNoCarrinho(store, params) {
  store.commit('addToShoppingCart', params)
  store.commit('addQuantityShoppingCart', params)
}

export function removerDoCarrinho(store, params) {
  store.commit('removeFromShoppingCart', params.index)
  store.commit('removeQuantityShoppingCart', params)
}

export function enviarPedidos(store, params) {
  Loading.show();

  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));
  parameters.set('PedidosJSON', params);

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=EnviarPedidosJSON`, {
    //   Token: localStorage.getItem('token'),
    //   PedidosJSON: params
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=EnviarPedidosJSON',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
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
