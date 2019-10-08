<template>
  <div class="q-pa-md">
    Início
    <div class="q-gutter-md">
      <q-select filled v-model="group" :options="groups" label="Grupo"
        option-value="Codigo_Grupo" option-label="Descricao"
        use-input input-debounce="0" @input="getProductsByFilter">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input filled v-model="description" label="Descrição"
        use-input input-debounce="0" @input="getProductsByFilter" />

      <q-infinite-scroll @load="onLoadProducts" class="q-mt-md">
        <div v-for="(product, index) in products" :key="index" class="q-gutter-x-xs">
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
              <q-btn flat round color="teal" icon="add_shopping_cart" @click="addToCart(product)" />
            </q-card-actions>
          </q-card>
        </div>

        <template v-slot:loading>
          <div v-if="productsCount > 0" class="row justify-center q-my-md">
            <q-spinner-tail color="primary" size="40px"></q-spinner-tail>
            <q-tooltip :offset="[0, 8]">Verificando mais produtos para carregar</q-tooltip>
          </div>
        </template>
      </q-infinite-scroll>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn to="/carrinho" fab icon="shopping_cart" color="accent" />
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
import {
  QSelect, QCard, QCardSection, QCardActions, QImg,
  QInfiniteScroll, QSpinnerTail, QTooltip, QPageSticky
  } from 'quasar'

export default {
  components: {
    QSelect, QCard, QCardSection, QCardActions, QImg,
    QInfiniteScroll, QSpinnerTail, QTooltip, QPageSticky
  },
  data () {
    return {
      group: {Codigo_Grupo: 13, Descricao: "ALBUMINA", urlGrupo: null},
      description: "",
      page: 1,
    }
  },
  mounted () {
    // this.getProductsByFilter()
    this.$store.dispatch('produtos/obterGrupos', {})
  },
  computed: {
    groups() {
      return this.$store.getters['produtos/getGroups']
    },
    products() {
      return this.$store.getters['produtos/getProducts']
    },
    productsCount() {
      return this.$store.getters['produtos/getProductsCount']
    }
  },
  methods: {
    getProductsByFilter() {
      this.page = 1
      this.$store.dispatch('produtos/filtrar', {
        group: this.group.Codigo_Grupo,
        description: this.description,
        page: this.page
      })
    },
    getProductsByPagination(pagination) {
      this.$store.dispatch('produtos/paginar', {
        group: this.group.Codigo_Grupo,
        description: this.description,
        page: pagination
      })
    },
    onLoadProducts (index, done) {
      // if(this.productsCount > 0) {
        setTimeout(() => {
          this.getProductsByPagination(this.page)
          this.page += 1
          done()
        }, 3000)
      // }
    },
    addToCart (product) {
      this.$store.dispatch('produtos/adicionarNoCarrinho', product)
    }
    // filterGroup (val, update) {
    //   if (val === '') {
    //     update(() => {
    //       this.groups = GROUP_OPTIONS
    //     })
    //     return
    //   }
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.groups = GROUP_OPTIONS.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // }
  }
}
</script>
