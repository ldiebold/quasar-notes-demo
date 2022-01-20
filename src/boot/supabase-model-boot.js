import { SupabasePlugin } from '@vuemodel/supabase'
import supabaseCredentials from 'app/config/supabase'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(SupabasePlugin, supabaseCredentials)
})
