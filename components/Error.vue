<template>
  <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
    <strong class="block font-medium text-red-800"> Something went wrong </strong>

    <p class="mt-2 text-sm text-red-700">
      {{ text }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>