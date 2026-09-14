import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['pages/**/*.test.ts'],
  },
})
