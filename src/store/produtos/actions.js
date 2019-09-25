import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function listar(store) {
  Loading.show();
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/posseidom.php?op=ObterProdutos`, {
      Token: localStorage.getItem('token'),
    })
      .then(({ data }) => {
        console.log(data)
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
        // console.log(data)
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

