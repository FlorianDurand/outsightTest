<template>
  <div class="main-container">
    <div class="row">
      <div class="left">
        <img class="adpHeader" :src="logo" alt="adp logo" width="100">
        <ul>
          <li v-for="tab of tabs" :key="tab" v-on:click="changeTabs(tab)">{{ tab }}</li>
        </ul>
        <div class="offset" />
      </div>
      <div class="right">
        <h1>Hello {{ accountName }}</h1>
        <h2>Welcome to your Dashboard</h2>
          <div class="container">
            <notifications-table :objectInformations='augmentedObjects' v-if="selectedTab === 0"/>
            <objects-table :objectInformations='augmentedObjects' v-else-if="selectedTab === 1"/>
            <places-table :objectInformations='augmentedObjects' :ZONES='ZONES' v-else-if="selectedTab === 2"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { pointInPolygon } from 'geometric'
  import NotificationsTable from './components/NotificationsTable.vue'
  import ObjectsTable from './components/ObjectsTable.vue'
  import PlacesTable from './components/PlacesTable.vue'
  import logo from "../assets/adp-logo.png"


  // MANDATORY DATA TYPES
  type Objects = Array<{ timestamp: number; id: number; type: string; position: [number, number, number] }>
  type Zones = Array<{ name: string; points: Array<[number, number, number]> }>

  const OBJECTS: Objects = [
    { timestamp: 1642433820, id: 1, type: 'person', position: [0, 1, 0] },
    { timestamp: 1642433820, id: 2, type: 'person', position: [0, 0, 0.1] },
    { timestamp: 1642433820, id: 3, type: 'luggage', position: [3, 0, 0] },
    { timestamp: 1642433820, id: 4, type: 'person', position: [3.1, 0, 0] },
    { timestamp: 1642433820, id: 5, type: 'person', position: [4, 0, 0] },
    { timestamp: 1642433820, id: 6, type: 'luggage', position: [0, 6, 0] },
    { timestamp: 1642433820, id: 7, type: 'unknown', position: [0, 2, 0] },
    { timestamp: 1642433820, id: 8, type: 'luggage', position: [2.4, 0, 0] },
    { timestamp: 1642433920, id: 1, type: 'person', position: [0, 2, 0] },
    { timestamp: 1642433920, id: 2, type: 'person', position: [0, 1, 0] },
    { timestamp: 1642433920, id: 4, type: 'person', position: [3.5, 0, 0] },
    { timestamp: 1642600034, id: 4, type: 'person', position: [3.5, 0.8, 0] },
    { timestamp: 1642602750, id: 4, type: 'person', position: [3.5, 0.8, 0] },
  ]

  const ZONES: Zones = [
    {
      name: 'luggage_queue',
      points: [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]
    },
    {
      name: 'entry',
      points: [
        [4, 1, 0],
        [3, 1, 0],
        [3, -1, 0],
        [4, -1, 0]
      ]
    },
    {
      name: 'public_toilets',
      points: [
        [2.5, 1, 0],
        [1.5, 1, 0],
        [1.5, -1, 0],
        [2.5, -1, 0]
      ]
    }
  ]

  const isSomeWhere = (position) => {
    let place : string;
    ZONES.forEach(zone => {
      if (place === 'nowhere' || !place) {
        const isHere = pointInPolygon(position, zone.points)
        place = isHere ? zone.name : 'nowhere'
      }
    })
    return place;
  } 

  export default defineComponent({
    setup() {
      const accountName = 'ADP Admin'
      const augmentedObjects : Array<{ timestamp: number; id: number; type: string; position: [number, number, number], place?: string }> = OBJECTS
      const selectedTab = ref(0)
      const tabs = reactive(['home', 'objects', 'places'])

      augmentedObjects.forEach(object => {
        object.place = isSomeWhere(object.position)
      });

      const changeTabs = (tabName) => {
        selectedTab.value = tabs.findIndex(tab => tab === tabName)
      }
      return { accountName, ZONES, augmentedObjects, selectedTab, tabs, logo, changeTabs }
    },
    components: {
      NotificationsTable,
      ObjectsTable,
      PlacesTable,
    }
  })
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow: auto;
  }

  .container {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 50px;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 20%;
    height: 100%;
    font-size: large;
    border-right: 1px solid #031F73;
  }

  .offset {
    height: 67px;
  }

  .right {
    width: 80%;
    padding-left: 20px;
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    transition: color .3s ease;
    width: 100%;
    margin-left: 5px;
    margin-bottom: 5px;
  }

  li:hover {
    color: #031F73;
  }
</style>
