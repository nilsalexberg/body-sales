<template>
  <div class="q-pa-md">
    Carrinho
    <div class="q-gutter-md">
      <div v-for="(product, index) in shoppingCart" :key="index" class="q-gutter-x-xs">
        <q-card class="my-card" style="margin-bottom: 1rem">
          <q-img :src="product.urlProduto"></q-img>
          <q-card-section>
            <div class="text-h6">{{ product.Produto_Descricao }}</div>
            <div class="text-subtitle2">R$ {{ product.preco_venda }},00</div>
          </q-card-section>
          <q-card-section>
            Disponível no estoque: {{ product.Saldo_Disponivel_Dominio }}
          </q-card-section>
          <!--
          <q-card-actions align="around">
            <q-btn flat round color="negative" icon="remove_circle" />
            <q-btn flat round color="secondary" icon="add_circle" />
          </q-card-actions>
          -->
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QCard, QCardSection, QCardActions, QImg,
  QSpinnerTail, QTooltip, QPageSticky
  } from 'quasar'

export default {
  components: {
    QCard, QCardSection, QCardActions, QImg,
    QSpinnerTail, QTooltip, QPageSticky
  },
  computed: {
    shoppingCart() {
      return this.$store.getters['produtos/getShoppingCart']
    }
  }
}
</script>
