<script setup>
import { useModel } from '@vuemodel/supabase'
import Note from 'src/models/Note'
import NoteForm from './NoteForm.vue'
import { watchEffect } from 'vue'

const props = defineProps({
  id: {
    required: true,
    type: [Number, String]
  }
})

const {
  id,
  update,
  loading,
  form,
  removing,
  remove
} = useModel(Note)

watchEffect(() => { id.value = props.id })
</script>

<template>
  <q-card
    flat
    bordered
    class="relative-position"
  >
    <q-spinner
      v-if="loading"
      size="xs"
      color="primary"
      class="absolute-top-right q-mt-xs q-mr-xs"
    />
    <q-card-section>
      <NoteForm
        v-model:note="form.note"
        @blur="update"
      />
    </q-card-section>
    <q-card-actions>
      <q-btn
        :loading="removing"
        icon="delete"
        flat
        size="sm"
        color="grey"
        @click="remove"
      />
    </q-card-actions>
  </q-card>
</template>
