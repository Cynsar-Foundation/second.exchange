<template>
  <div style="max-width: 1000px" class="writer__container">
   <q-form class="q-gutter-md">
    <q-input
      filled
      label="Title"
    />
    <q-input
      filled
      label="Tags"
    />
    <q-input
      filled
      label="Content"
      type="textarea"
    />
    <div>
      <q-btn label="Submit" type="submit" color="transparent" flat text-color="black" class="writer__button" />
      <q-btn label="Reset" type="reset" color="primary" flat class="writer__button" text-color="black" />
    </div>
  </q-form>
  </div>
</template>

<script>
import './Writer.scss'

export default {
    name: 'Writer'
}
</script>
