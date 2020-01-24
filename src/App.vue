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
            <v-label>Unit base</v-label>
            <p>{{ sourceUnitBase }}</p>
            <v-text-field label="Value" v-model="sourceValue" type="number" />
          </section>
          <section class="flex-grow-1">
            <h2>Target</h2>
            <v-text-field label="Unit" placeholder="kg" v-model="targetUnit" />
            <v-label>Unit base</v-label>
            <p>{{ targetUnitBase }}</p>
            <v-label>Result</v-label>
            <p>{{ result.value }}</p>
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
import math from "@/utils/math";

export default {
  name: "App",
  data: () => ({
    sourceUnit: "kg",
    targetUnit: "g",
    sourceValue: 1,
  }),
  computed: {
    sourceUnitBase() {
      return math.getUnitBase(this.sourceUnit);
    },
    targetUnitBase() {
      return math.getUnitBase(this.targetUnit);
    },
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
