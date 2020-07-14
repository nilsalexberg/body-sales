<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <div v-if="shoppingCart.length > 0">
        <div v-for="(product, index) in qtdShoppingCart" :key="index" class="q-gutter-x-xs">
          <q-card class="my-card" style="margin-bottom: 1rem">
            <q-img :src="product.urlProduto"></q-img>
            <q-card-section>
              <div class="text-h6">{{ product.Produto_Descricao }}</div>
              <div class="text-subtitle2">R$ {{ product.preco_venda }},00</div>
            </q-card-section>
            <q-card-section>
              Disponível no estoque: {{ product.Saldo_Disponivel_Dominio }}
            </q-card-section>
            <q-card-actions align="around">
              <q-btn flat round color="negative" icon="remove_circle" @click="removeFromCart(index, product)" />
              <div class="text-body2 qtd">{{ product.quantidade }}</div>
              <q-btn flat round color="secondary" icon="add_circle" @click="addToCart(product)" />
            </q-card-actions>
          </q-card>
        </div>

        <q-select outlined class="my-input" v-model="client" :options="clients" label="Cliente"
        option-value="Codigo_Cliente" option-label="Nome" color="red"
        input-debounce="0" >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sem resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input outlined class="my-input" v-model="observation" label="Observação">
          <template v-slot:append>
            <q-icon name="content_paste" />
          </template>
        </q-input>

        <q-btn :ripple="{ center: true }" class="full-width my-card" label="Enviar pedido" color="secondary" @click="dialog = true" />
        <q-dialog v-model="dialog" >
          <q-card class="bg-teal text-white" style="width: 300px">
            <q-card-section>
              <div class="text-h6">Atenção</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Deseja confirmar o envio do Pedido? <br>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="Sim" @click="sendOrder()" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>
      <div v-else>
        <q-banner class="bg-transparent-3">
          <template v-slot:avatar>
            <q-icon name="remove_shopping_cart" color="grey" />
          </template>
          Não há itens adicionados no carrinho :(
          <template v-slot:action>
            <q-btn flat color="secondary" label="Ver produtos para adicionar" to="/inicio" />
          </template>
        </q-banner>
      </div>
      <!-- <div v-if="shoppingCart.length > 0" class="q-gutter-x">

      </div> -->
    </div>
  </div>
</template>

<script>
import {
  QCard, QCardSection, QCardActions, QImg, QInput, QSpinnerTail,
  QTooltip, QPageSticky, QBanner, QSelect, QDialog
  } from 'quasar'

export default {
  data() {
    return {
      client: { Codigo_Cliente: "000001", Nome: "CONSUMIDOR" },
      observation: "",
      dialog: false
    }
  },
  mounted () {
    this.$store.dispatch('clientes/obterClientes', {})
  },
  components: {
    QCard, QCardSection, QCardActions, QImg, QInput, QSpinnerTail,
    QTooltip, QPageSticky, QBanner, QSelect, QDialog
  },
  computed: {
    shoppingCart() {
      return this.$store.getters['produtos/getShoppingCart']
    },
    qtdShoppingCart() {
      return this.$store.getters['produtos/getQtdShoppingCart']
    },
    clients() {
      return this.$store.getters['clientes/getClients']
    }
  },
  methods: {
    sendOrder () {
      this.$store.dispatch('produtos/enviarPedidos', { qtdShoppingCart: this.qtdShoppingCart, observation: this.observation, client: this.client })
    },
    addToCart (product) {
      this.$store.dispatch('produtos/adicionarNoCarrinho', product)
    },
    removeFromCart (index, product) {
      this.$store.dispatch('produtos/removerDoCarrinho', {product: product , index: index})
    }
  }
}
</script>
<style>
.qtd {
  padding: 0.75em;
}
.my-input {
  width: 96%;
  margin-left: 0.4rem;
  margin-bottom: 1rem;
  height: auto;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
  border-radius: 4px;
}
</style>
