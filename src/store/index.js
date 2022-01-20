import { store } from 'quasar/wrappers'
import VuexORM from '@vuex-orm/core'
import { createStore } from 'vuex'
import Note from 'src/models/Note'

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(Note)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    plugins: [VuexORM.install(database)],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
