<template>
  <div class="q-pa-md">
    Início
    <div class="q-gutter-md">
      <q-select filled v-model="group" :options="groups" label="Grupo"
      use-input input-debounce="0" @filter="filterGroup">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select filled v-model="description" :options="descriptions" label="Descrição"
      use-input input-debounce="0" @filter="filterDescription">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div v-for="product in products" :key="product.ID_Produto">
        <q-card class="my-card">
          <q-img :src="product.urlProduto">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ product.Produto_Descricao }}
            </div>
          </q-img>
          <q-card-section>
            <div class="text-h6">{{ description }}</div>
            <div class="text-subtitle2">R$ {{ product.preco_venda }},00</div>
          </q-card-section>
          <q-card-section>
            Disponível no estoque: {{ product.Saldo_Disponivel_Dominio }}
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat round color="red" icon="add_shopping_cart" />
            <q-btn flat round color="teal" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </div>
</template>

<script>
import { QSelect, QCard, QCardSection, QCardActions, QImg } from 'quasar'

const GROUP_OPTIONS = [
  "INA", "2", "3", "4", "5", "6", "7", "9", "11", "12", "14", "16", "17", "18", "19",
  "21", "22", "23", "24", "26", "27", "28", "29"
]
const DESCRIPTION_OPTIONS = [
  "ACESSÓRIO", "ALBUMINA", "AMINOACIDOS", "ARGININA", "BARRA", "BCAA", "BETA ALANINA",
  "CASEINA", "COLAGENO", "CREATINA", "ENERGETICOS", "FITOTERAPICOS", "GH", "GLUTAMINA",
  "GOURMET", "HIPERCALORICO", "INATIVO", "L-CARNITINA", "OLEO", "PACK", "PRÉ TREINO",
  "PRO HORMONAL", "PROTEINAS", "ROUPAS", "SHAKE", "TERMOGENICO", "VITAMINAS/MINERAIS",
  "WHEY", "ZMA"
]

export default {
  components: { QSelect, QCard, QCardSection, QCardActions, QImg },
  data () {
    return {
      page: 0,
      group: 2,
      products: ['Oi', 1],
      description: "CREATINA",
      groups: GROUP_OPTIONS,              /** grupo = Codigo_Grupo */
      descriptions: DESCRIPTION_OPTIONS   /** descricao = Descricao_Grupo */
    }
  },
  mounted () {
    this.$store.dispatch('produtos/filtrar', {group: this.group, description: this.description, page: this.page})
    this.products = this.$store.getters.getProducts
    console.log(this.products)
    /** produtos/filtrar: colocar aqui para retornar a busca padrão paginada na 1º pagina */
    // this.$store
    //   .dispatch('produtos/listar')
  },
  watch: {
    group: function (val) {
      this.$store.dispatch('produtos/filtrar', {group: val, description: this.description, page: this.page})
      this.products = this.$store.getters.getProducts
      console.log(this.products)
    },
    description: function (val) {
      this.$store.dispatch('produtos/filtrar', {group: this.group, description: val, page: this.page})
      this.products = this.$store.getters.getProducts
      console.log(this.products)
    }
  },
  methods: {
    getProductsByFilter() {
      this.$store
        .dispatch('produtos/filtrar', {})
    },
    filterGroup (val, update) {
      if (val === '') {
        update(() => {
          this.groups = GROUP_OPTIONS
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.groups = GROUP_OPTIONS.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterDescription (val, update) {
      if (val === '') {
        update(() => {
          this.descriptions = DESCRIPTION_OPTIONS
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.descriptions = DESCRIPTION_OPTIONS.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
