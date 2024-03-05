  import { defineConfig } from "cypress";

  export default defineConfig({
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
    },

    component: {
      devServer: {
        port: 5173, // Puerto en el que se ejecutará el servidor Vite

        framework: "react",
        bundler: "webpack",
      },
    },
  });
