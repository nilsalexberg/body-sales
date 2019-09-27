<template>
  <div class="q-pa-md">
    Início
    <div class="q-gutter-md">
      <q-select filled v-model="group" :options="groups" label="Grupo"
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

      <div v-for="product in products" :key="product.ID_Produto">
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
            <q-btn flat round color="teal" icon="add_shopping_cart" />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </div>
</template>

<script>
import { QSelect, QCard, QCardSection, QCardActions, QImg } from 'quasar'

export default {
  components: { QSelect, QCard, QCardSection, QCardActions, QImg },
  data () {
    return {
      page: 0,
      group: {Codigo_Grupo: 6, Descricao: "ACESSÓRIO", urlGrupo: null},
      description: "",
    }
  },
  mounted () {
    this.getProductsByFilter()
    this.$store.dispatch('produtos/obterGrupos', {})
  },
  computed: {
    products() {
      return this.$store.getters['produtos/getProducts']
    },
    groups() {
      return this.$store.getters['produtos/getGroups']
    }
  },
  methods: {
    getProductsByFilter() {
      this.$store.dispatch('produtos/filtrar', {
        group: this.group.Codigo_Grupo,
        description: this.description,
        page: this.page
      })
    },
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
