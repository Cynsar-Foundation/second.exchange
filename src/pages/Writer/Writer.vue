<template>
    <!--<div class="q-pa-md" style="max-width: 400px">
     <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <q-toggle v-model="accept" label="I accept the license and terms" />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div> -->
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      class="q-gutter-md"
    >
      <q-input
        filled
        />
      <q-input />
      <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>
  </div>
</template>
<script>
import './Writer.scss'

export default {
    name: 'Writer'
}
</script>
