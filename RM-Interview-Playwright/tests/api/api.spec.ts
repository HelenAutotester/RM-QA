import { test, expect } from '@playwright/test';

test('TC-API-001 incorrect password returns 401', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: { email: 'student.a@example.test', password: 'wrong-password' },
  });
  expect(response.status()).toBe(401);
  expect(await response.json()).toHaveProperty('error');
});

test('TC-API-002 health returns 200', async ({ request }) => {
  const response = await request.get('/health');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ demo: 'assessment', version: 1 });
});

test('TC-API-003 empty credentials returns 400', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: { email: '', password: '' },
  });
  expect(response.status()).toBe(400);
  expect(await response.json()).toHaveProperty('error');
});
