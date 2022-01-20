<template>
  <q-page padding>
    <h1>Notes</h1>

    <div class="full-width row">
      <div
        v-for="note in notes"
        :key="note.id"
        class="q-pa-sm"
      >
        <NoteCard :id="note.id" />
      </div>

      <div class="q-pa-sm">
        <q-btn
          :loading="creatingNote"
          icon="add"
          @click="createNote({ body: '' })"
        />
      </div>
    </div>

    <pre>{{ data }}</pre>
  </q-page>
</template>

<script setup>
import Note from 'src/models/Note'
import NoteCard from 'src/components/NoteCard.vue'
import { useModelApi, useModelCollection } from '@vuemodel/supabase'
import useApi from 'src/composables/useApi'

const { collection: notes, index } = useModelCollection(Note)
index()

const { include, index: indexOther, data } = useApi('notes')
include.value = ['sub_notes']
indexOther()

const {
  create: createNote,
  creating: creatingNote
} = useModelApi(Note)
</script>
