<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-img :src="product.urlProduto"></q-img>
      <q-card-section>
        <div class="text-h6">{{ product.Produto_Descricao }}</div>
        <div class="text-subtitle2">R$ {{ product.preco_venda }},00</div>
      </q-card-section>
      <q-card-section>
        Disponível no estoque: {{ product.Saldo_Disponivel_Dominio }}
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat round color="negative" icon="remove_circle" @click="quantity > 1 ? quantity -= 1 : quantity = 1" />
        <q-input class="input-qtd" v-model.number="quantity" type="number" filled />
        <q-btn flat round color="secondary" icon="add_circle" @click="quantity += 1" />
      </q-card-actions>
      <q-btn :ripple="{ center: true }" class="full-width" label="Adicionar no carrinho" color="secondary" @click="addToCart(product, quantity)" />
    </q-card>
  </div>
</template>

<script>
import {
  QCard, QCardSection, QCardActions, QImg, QInput, Notify
  } from 'quasar'

export default {
  components: {
    QCard, QCardSection, QCardActions, QImg, QInput
  },
  data(){
    return {
      quantity: 1
    }
  },
  mounted() {
    console.log(this.product)
  },
  computed: {
    product() {
      return this.$route.params.product
    }
  },
  methods: {
    addToCart (product, quantity) {
      for(let i = 0; i < quantity; i++)
        this.$store.dispatch('produtos/adicionarNoCarrinho', product)
      Notify.create({
        color: 'green',
        position: 'bottom',
        message: 'Produto adicionado no carrinho',
        icon: 'ion-ios-checkmark'
      })
    }
  }
}
</script>
<style>
.input-qtd {
  max-width: 200px;
}
.input-qtd input {
  text-align: center;
}
</style>
