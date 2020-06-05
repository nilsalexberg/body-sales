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

  // New correct form to sendOrder JSON
  var order = JSON.stringify(formatarPedido(params));

  // console.log(params);
  console.log(order);

  var parameters = new FormData();
  parameters.set('Token', localStorage.getItem('token'));
  parameters.set('PedidosJSON', order);

  //return new Promise((resolve, reject) => {
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
      // console.log(data);
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

}

export function formatarPedido(shoppingCart) {
  // Variables to needed data
  var agora = new Date();

  // Objects and Arrays that make up EnviarPedidosJSON
  var ItemPedido = [];
    // Adicionando os objetos dos Produtos no Array ItemPedido
    for(let i in shoppingCart) {
      ItemPedido.push(
        {
          ID_ItemPedido: parseInt(i)+1,
          ID_Produto: shoppingCart[i].ID_Produto,
          Quantidade: shoppingCart[i].quantidade,
          Unidade: "und",
          Preco_Unitario: shoppingCart[i].preco_venda,
          Valor_Desconto: 0,
          Valor_Produto: shoppingCart[i].quantidade * shoppingCart[i].preco_venda,
          Valor_Total: (shoppingCart[i].quantidade * shoppingCart[i].preco_venda) - 0
        }
      )
    }

  var itens_pedido = { ItemPedido };
  var Pedido = [
    {
      ID_Pedido: "1",             // Alterar depois? COLOCAR UM AUTOINCREMENTADO NO state.js
      Codigo_Cliente: "000001",
      Emissao: agora.getDate() + '/' + parseInt(agora.getMonth()+1) + '/' + agora.getFullYear(),
      Hora: agora.getHours() + ':' + agora.getMinutes(),
      Observacao: "nao tem",      // Depois acrescentá-lo por um campo no app
      Codigo_CPG: "1",            // Atualmente sempre esse valor que é para 1x. Depois Obtê-lo do endpoint ObterFormasPagamento
      CodigoForma_Pagamento: "2", // Atualmente sempre esse valor que é para Dinheiro. Depois Obtê-lo do endpoint ObterModalidadePagamento
      Pedido_Legado: agora.getFullYear().toString() + parseInt(agora.getMonth()+1).toString() + agora.getMonth().toString() + agora.getHours().toString() + agora.getMinutes().toString() + agora.getSeconds().toString() + makechar(6),
      ItensPedido: itens_pedido   // verificar se assim pega o ItensPedido de cima
    }
  ];
  var Pedidos = { Pedido };
  var PedidosParaEnvio = { Pedidos };

  // Retorna o Pedido corretamente formatado para o endpoint
  return PedidosParaEnvio;
}

function makechar(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
