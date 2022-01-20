import useModelApi from './useModelApi'
import { ref, computed, watch } from 'vue'

const ignoreOnUpdateFields = [
  'id', 'created_at'
]

export default function useModel (ModelClass) {
  const modelApi = useModelApi(ModelClass)

  const id = ref()

  const model = computed(() => {
    return ModelClass.find(id.value)
  })

  function getUpdateableFieldKeys () {
    const fields = ModelClass.getFields()
    return Object.keys(fields)
      .filter(field => !ignoreOnUpdateFields.includes(field))
  }

  const form = ref({})

  function resetFormToNulls () {
    getUpdateableFieldKeys().forEach(key => {
      const fields = ModelClass.getFields()
      form.value[key] = fields[key].value
    })
  }

  function resetFormToModel () {
    getUpdateableFieldKeys().forEach(key => {
      form.value[key] = model.value?.[key]
    })
  }

  function resetForm () {
    if (model.value) {
      resetFormToModel()
    } else {
      resetFormToNulls()
    }
  }

  watch(model, () => {
    resetForm()
  }, { immediate: true })

  async function create (form) {
    await modelApi.create(form)
    id.value = modelApi.data?.value?.id
  }

  async function find () {
    await modelApi.find(id.value)
  }

  async function update () {
    if (!id.value) {
      modelApi.error.value = 'no id has been set'
      return
    }
    await modelApi.update(id.value, form.value)
  }

  async function remove (form) {
    if (!id.value) {
      modelApi.error.value = 'no id has been set'
      return
    }
    await modelApi.remove(id.value)
    id.value = null
  }

  return {
    create,
    find,
    update,
    remove,
    model,
    form,
    resetForm,
    id,
    error: modelApi.error,
    creating: modelApi.creating,
    finding: modelApi.finding,
    updating: modelApi.updating,
    removing: modelApi.removing,
    loading: modelApi.loading
  }
}
