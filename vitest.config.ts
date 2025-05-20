import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.{test,spec}.{ts,js}"],
    coverage: {
      provider: "v8",
      all: true,
      include: ["src/**/*.{ts,js}"],
      exclude: ["**/node_modules/**", "src/index.ts"],
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
