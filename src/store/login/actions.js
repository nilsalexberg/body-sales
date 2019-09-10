import axios from 'axios'
import { Loading, Notify } from 'quasar'

export function autenticar(store, { username, password }) {
  Loading.show();
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8888/proxy/posseidom.php?op=AutenticarJSON`, {
      Nome: username,
      Senha: password,
      Emp_ID: 216
    })
      .then(({ data }) => {

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
