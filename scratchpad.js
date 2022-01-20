// useApi
note.create(form)
note.find(id)
note.update(id, form)
note.delete(id)
note.index()
note.search() // ?

// useModelApi
const noteApi = useModelApi(Note)

note.create(form)
note.find(id)
note.update(id, form)
note.remove(id)
note.index()
note.search() // ?

// useModel
const note = useModel(Note)

note.create(form)
note.fetch()
note.update()
note.remove()

note.model.value
note.id.value
note.loading
