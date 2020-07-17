const { TestScheduler } = require('jest')

const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
    const result = palindrome('a')

    expect(result).toBe('a')
})

test('palindrome of react', () => {
    const result = palindrome('react')

    expect(result).toBe('tkaer')
})

test('palindrome of releveler', () => {
    const result = palindrome('releveler')

    expect(result).toBe('releveler')
})