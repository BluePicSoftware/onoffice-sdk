<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'


/*
import { OnOfficeAPIClient, fetchActions, Types } from 'onoffice-sdk'

console.log(fetchActions);


const action: Types.IAction = {
  actionid: 'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
  parameters: {
    data: ['string'],
    filter: {
      'lol': [
        {
          op: '>',
          val: 1
        }
      ]
    },
    listlimit: 100,
    sortby: {
      'lol': 'hjajha'
    }
  },
  indentifier: 'true',
  resourceid: 'string',
  resourcetype: 'string',
  timestamp: Date.now(),
  hmac_version: 2,
  hmac: 'XXX'
}

console.log(action);*/
import { OnOfficeAPIClient, IAction, fetchActions } from 'onoffice'

console.log(OnOfficeAPIClient);



const action: IAction = {
  actionid: 'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
  parameters: {
    data: ['string'],
    filter: {
      'lol': [
        {
          op: '>',
          val: 1
        }
      ]
    },
    listlimit: 100,
    sortby: {
      'lol': 'hjajha'
    }
  },
  indentifier: 'false',
  resourceid: 'string',
  resourcetype: 'string',
  timestamp: Date.now(),
  hmac_version: 2,
  hmac: 'XXX'
}




</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
