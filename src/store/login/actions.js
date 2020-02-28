import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function autenticar(store, { username, password }) {
  Loading.show();

  var parameters = new FormData();
  parameters.set('Nome', username);
  parameters.set('Senha', password);
  parameters.set('Emp_ID', 216);

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'http://escoladmart.com/guto2/posseidom.php?op=AutenticarJSON',
      data: parameters,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    // axios.post(`http://escoladmart.com/guto2/posseidom.php?op=AutenticarJSON`, {
    //   Nome: username,
    //   Senha: password,
    //   Emp_ID: 216
    // },
    // {
    //   headers: {'Content-Type': 'multipart/form-data'}
    // })
      .then(({ data }) => {
        // console.log(data);
        if (data.TokenAtivo.substring(0, 3) !== 'RN.') {
          store.commit('setLogged', true);

          store.commit('setUsername', username);
          store.commit('setToken', data.TokenAtivo);

          localStorage.setItem('username', username);
          localStorage.setItem('token', data.TokenAtivo);

          resolve();
        } else {
          let msg = data.TokenAtivo.substring(12);

          Notify.create({
            color: 'red',
            position: 'bottom',
            message: msg,
            icon: 'ion-ios-warning'
          });

          reject();
        }
      })
      .catch((e) => {
        // console.log(e);
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
