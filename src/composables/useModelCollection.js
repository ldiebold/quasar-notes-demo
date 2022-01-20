import useModelApi from './useModelApi'
import { ref, computed } from 'vue'

export default function useModelCollection (ModelClass) {
  const modelApi = useModelApi(ModelClass)
  const ids = ref()

  const collection = computed(() => {
    if (Array.isArray(ids.value)) {
      return ModelClass.query().whereIdIn(ids.value)
    }

    return ModelClass.all()
  })

  async function index () {
    await modelApi.index()
  }

  return {
    index,
    ids,
    collection,
    error: modelApi.error,
    indexing: modelApi.indexing
  }
}

// ids
// index
// collection
// collectionsIds
