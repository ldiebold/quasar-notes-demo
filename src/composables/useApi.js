import { useClient } from '@vueauth/supabase'
import { ref, computed } from 'vue'

export default function useApi (entity, defaultUserId = null) {
  const supabase = useClient()

  const error = ref()
  const data = ref()
  const loading = ref(false)
  const userId = ref(defaultUserId)

  const include = ref([])

  const indexing = ref(false)
  const creating = ref(false)
  const finding = ref(false)
  const updating = ref(false)
  const removing = ref(false)

  const includeQuery = computed(() => {
    if (!include.value.length) {
      return undefined
    }
    return include.value.join('(*),') + '(*)'
  })

  async function index () {
    loading.value = true
    indexing.value = true

    console.log(includeQuery.value)

    const { data: responseData, error: err } = await supabase
      .from(entity)
      .select(includeQuery.value)

    loading.value = false
    indexing.value = false

    if (err) {
      error.value = err
      return
    }
    if (responseData) {
      data.value = responseData
    }
  }

  async function create (form) {
    if (userId.value) {
      form.user_id = userId.value
    }
    loading.value = true
    creating.value = true

    const { data: responseData, error: err } = await supabase
      .from(entity)
      .insert([form])

    loading.value = false
    creating.value = false

    if (err) {
      error.value = err
      return
    }
    if (responseData) {
      data.value = responseData?.[0]
    }
  }

  async function find (id) {
    loading.value = true
    finding.value = true

    const { data: responseData, error: err } = await supabase
      .from(entity)
      .select()
      .eq('id', id)

    loading.value = false
    finding.value = false

    if (err) {
      error.value = err
      return
    }
    if (!responseData.length) {
      error.value = { message: `${entity} with id ${id} not found` }
    }
    if (responseData) {
      data.value = responseData?.[0]
    }
  }

  async function update (id, form) {
    if (userId.value) {
      form.user_id = userId.value
    }
    loading.value = true
    updating.value = true

    const { data: responseData, error: err } = await supabase
      .from(entity)
      .update(form)
      .match({ id })

    loading.value = false
    updating.value = false

    if (err) {
      error.value = err
      return
    }
    if (responseData) {
      data.value = responseData?.[0]
    }
  }

  async function remove (id) {
    loading.value = true
    removing.value = true

    const { data: responseData, error: err } = await supabase
      .from(entity)
      .delete()
      .match({ id })

    loading.value = false
    removing.value = false

    if (err) {
      error.value = err
      return
    }
    if (responseData) {
      data.value = responseData?.[0]
    }
  }

  return {
    index,
    create,
    remove,
    find,
    update,
    error,
    data,
    include,
    userId,
    loading,
    indexing,
    creating,
    finding,
    updating,
    removing
  }
}
