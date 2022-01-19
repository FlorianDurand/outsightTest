<template>
  <div class="row">
    <div class="column">
      <h2>Recents activities (1hour)</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Id</th>
            <th scope="col">Type</th>
            <th scope="col">Place</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="object of recentActivites" :key="object.id">
            <td>{{new Date(object.timestamp*1000).toLocaleTimeString('fr-FR')}}</td>
            <td>{{object.id}}</td>
            <td>{{object.type}}</td>
            <td>{{object.place}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>All activities</h2>
      <button @click="update">Update</button>
      <table>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Id</th>
            <th scope="col">Type</th>
            <th scope="col">Place</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="object of filteredObjects" :key="object.id">
            <td>{{new Date(object.timestamp*1000).toLocaleTimeString('fr-FR',{day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",})}}</td>
            <td>{{object.id}}</td>
            <td>{{object.type}}</td>
            <td>{{object.place}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { computed, defineComponent, onUnmounted, ref } from "vue";

  export default defineComponent({
    props: {
      objectInformations : Array
    },
    setup(props) {
      const now = ref(new Date())

      const filteredObjects = computed(() => {
        return props.objectInformations.filter(object => {
          return new Date(object.timestamp*1000) < now.value // Filter to only have past activites
        })
      })

      const oneHour = 3600000 //ms

      const recentActivites = computed(() => {
        return props.objectInformations.filter(object => {
          return new Date(now.value - oneHour) < new Date(object.timestamp*1000) && new Date(object.timestamp*1000) < now.value // Filter to only have recent activities (one hour)
        })
      })

      const update = () => {
        now.value = new Date()
      };

      const interval = window.setInterval(() => {
        now.value = new Date()
      }, 5000); // Every 5s update activities

      onUnmounted(() => {
        clearInterval(interval)
      })

      return {filteredObjects, update, recentActivites};
    }
  });
</script>

<style scoped>
  .row {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
  }
</style>

