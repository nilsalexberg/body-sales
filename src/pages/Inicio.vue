<template>
  <div class="q-pa-md">
    Início
    <form>
      <div>
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
      </div>
      <div>
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
      </div>
    </form>
  </div>
</template>

<script>
import { QSelect } from 'quasar'

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
  components: { QSelect },
  data () {
    return {
      // os models deverão se tornar os mesmos valores dispatchados (enviados)
      group: null,
      description: null,
      groups: GROUP_OPTIONS,              /** grupo = Codigo_Grupo */
      descriptions: DESCRIPTION_OPTIONS   /** descricao = Descricao_Grupo */
    }
  },
  mounted () {
    /** produtos/filtrar: colocar aqui para retornar a busca padrão paginada na 1º pagina */
    // this.$store
    //   .dispatch('produtos/listar')
  },
  // computed: {
  //   products() {
  //     return this.$store.dispatch('produtos/filtrar', {})
  //   }
  // },
  watch: {
    group: function (val) {
      return this.$store.dispatch('produtos/filtrar', {group: val, description: this.description})
    },
    description: function (val) {
      return this.$store.dispatch('produtos/filtrar', {group: this.group, description: val})
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
