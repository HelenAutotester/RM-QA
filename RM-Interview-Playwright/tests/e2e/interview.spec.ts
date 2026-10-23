import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC001 successful login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  await login.login('student.a@example.test', 'Demo-only-pass-123!');
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText('Welcome, Student')).toBeVisible();
});

test('TC002 empty credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  await login.login('', '');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('alert')).toContainText('required');
});

test('TC003 incorrect password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  await login.login('student.a@example.test', 'wrong-password');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('alert')).toContainText('Invalid credentials');
});

test('TC004 submit form', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name').fill('Helen');
  await page.getByLabel('Email').fill('helen@example.com');
  await page.getByLabel('Message').fill('Interview practice');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('status')).toHaveText('Form submitted successfully');
});

test('TC005 select a subject and verify result', async ({ page }) => {
  await page.goto('/assessments');
  await page.getByLabel('Subject').selectOption('mathematics');
  await expect(page.getByLabel('Subject')).toHaveValue('mathematics');
  await expect(page.getByRole('status')).toHaveText('Showing Mathematics assessments');
});

test('TC006 complete assessment', async ({ page }) => {
  await page.goto('/assessment/123');
  await page.getByRole('button', { name: 'Submit Assessment' }).click();
  await expect(page.getByRole('status')).toHaveText('Completed');
});
