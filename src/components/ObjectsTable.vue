<template>
  <div class="row">
    <div class="column">
      <h2>Pick an object Id</h2>
        <select v-model.number="selected">
          <option v-for="id of uniqueId" :key="id">{{ id }}</option>
        </select>
    </div>
    <div>
      <h2>All activities for id :{{ selected }}</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Type</th>
            <th scope="col">Place</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="object of filteredObjects" :key="object.id">
            <td>{{new Date(object.timestamp*1000).toLocaleTimeString('fr-FR',{day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",})}}</td>
            <td>{{object.type}}</td>
            <td>{{object.place}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { computed, defineComponent, reactive, ref } from "vue";

  export default defineComponent({
    props: {
      objectInformations : Array
    },
    
    setup(props) {

      const allObjectsId = reactive(props.objectInformations.map(obj => obj.id))
      const uniqueId =[...new Set(allObjectsId)]
      const now = ref(new Date())
      const selected = ref(uniqueId[0])

      const filteredObjects = computed(() => {
        return props.objectInformations.filter(object => {
          return new Date(object.timestamp*1000) < now.value && object.id === selected.value // Filter to only have select Id activites
        })
      })

      return {uniqueId, selected, filteredObjects};
    }
  });
</script>

<style scoped>
.column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.row {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}
</style>
