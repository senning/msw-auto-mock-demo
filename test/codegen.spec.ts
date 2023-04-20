import { rest } from 'msw'
import { startWorker } from '../mock'
import { describe, expect, it, beforeAll } from 'vitest';

beforeAll(() => {
  startWorker()
})

describe('/test endpoint', () => {
  it('responds to a fetch with the expected properties', async () => {
    const response = await fetch('https://test.com/test')
    const data = await response.json();

    expect(data?.smallNumbers).toBeDefined()
  })
})

describe('/test-multiple-responses/:id endpoint', () => {
  it('responds with a 200 status for a normal request', async () => {
    const response = await fetch('https://test.com/test-multiple-responses/normal');
    
    expect(response.status).toEqual(200)
  });

  it('responds with a 404 status for a bad request', async () => {
    const response = await fetch('https://test.com/test-multiple-responses/bad');
    
    expect(response.status).toEqual(404)
  });

  it('responds with a 400 status for a bad-ish request', async () => {
    const response = await fetch('https://test.com/test-multiple-responses/badish');
    const data = await response.json();

    
    expect(response.status).toEqual(200)
    expect(data.status).toEqual('Generic error')
  });
})