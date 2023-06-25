import { describe, it } from 'vitest'
import { parseComponent } from '../src/utils/te'

describe('index', () => {
  it('hi vitest', () => {
    parseComponent('base/button/btn.vue')
  })
})
