<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  note: {
    required: true,
    type: String
  }
})
const emit = defineEmits([
  'update:note',
  'blur'
])

const note = useVModel(props, 'note', emit)
</script>

<template>
  <q-form>
    <q-input
      :model-value="note"
      borderless
      @update:model-value="value => emit('update:note', value)"
      @blur="emit('blur')"
    />
  </q-form>
</template>
