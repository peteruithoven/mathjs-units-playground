<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      Mathjs units playground
    </v-app-bar>
    <v-content>
      <v-container>
        <section class="d-flex">
          <section class="flex-grow-1 mr-3">
            <h2>Source</h2>
            <v-text-field label="Unit" placeholder="kg" v-model="sourceUnit" />
            <v-text-field label="Value" v-model="sourceValue" />
          </section>
          <section class="flex-grow-1">
            <h2>Target</h2>
            <v-text-field label="Unit" placeholder="kg" v-model="targetUnit" />
            {{ result.value }}
          </section>
        </section>
        <v-alert v-if="result.error" type="error">
          {{ result.error }}
        </v-alert>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { create, unitDependencies } from "mathjs";

const math = create({
  unitDependencies,
});

export default {
  name: "App",
  data: () => ({
    sourceUnit: "kg",
    targetUnit: "g",
    sourceValue: 1,
  }),
  computed: {
    result() {
      let value = "";
      let error = "";
      try {
        value = math
          .unit(this.sourceValue, this.sourceUnit)
          .toNumber(this.targetUnit);
      } catch (e) {
        error = e.message;
      }

      return { value, error };
    },
  },
};
</script>
