import useApi from './useApi'
import { useAuthState } from '@vueauth/core'

export default function useModelApi (ModelClass) {
  const { user } = useAuthState()
  const apiService = useApi(ModelClass.entity, user.value.id)

  async function create (form = {}) {
    await apiService.create(form)

    ModelClass.insert({
      data: apiService.data.value
    })
  }

  async function find (id) {
    await apiService.find(id)

    ModelClass.insert({
      data: apiService.data.value
    })
  }

  async function update (id, form) {
    await apiService.update(id, form)

    ModelClass.insert({
      data: apiService.data.value
    })
  }

  async function remove (id) {
    await apiService.remove(id)

    ModelClass.delete(id)
  }

  async function index () {
    await apiService.index()

    ModelClass.insert({
      data: apiService.data.value
    })
  }

  return {
    create,
    find,
    update,
    remove,
    index,
    data: apiService.data,
    error: apiService.error,
    userId: apiService.userId,
    indexing: apiService.indexing,
    creating: apiService.creating,
    finding: apiService.finding,
    updating: apiService.updating,
    removing: apiService.removing,
    loading: apiService.loading
  }
}
