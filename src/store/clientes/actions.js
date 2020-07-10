import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function obterClientes(store) {
  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));

  return new Promise((resolve, reject) => {
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=ObterClientes`, {
    //   Token: localStorage.getItem('token'),
    // })
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=ObterClientes',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(({ data }) => {
        store.commit('setClients', data)
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
