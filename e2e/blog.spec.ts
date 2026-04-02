import { test, expect } from '@playwright/test'

test.describe('Blog homepage', () => {
  test('loads and shows featured post', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Decoupled Drupal Blog/)
    await expect(page.locator('text=Powered by Drupal')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Featured' })).toBeVisible()
    await expect(page.locator('text=Why Headless Drupal Is the Future of Content Management').first()).toBeVisible()
  })

  test('shows latest posts section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible()
  })
})

test.describe('Posts listing page', () => {
  test('lists all posts', async ({ page }) => {
    await page.goto('/posts')
    await expect(page.getByRole('heading', { name: 'All Posts' })).toBeVisible()
    await expect(page.locator('text=Why Headless Drupal Is the Future of Content Management').first()).toBeVisible()
    await expect(page.locator('text=GraphQL vs JSON:API for Headless Drupal').first()).toBeVisible()
    await expect(page.locator('text=Content Modeling Best Practices').first()).toBeVisible()
  })
})

test.describe('Individual post page', () => {
  test('renders post with title and author', async ({ page }) => {
    await page.goto('/posts/why-headless-drupal-future-cms')
    await expect(page.locator('h1')).toContainText('Why Headless Drupal Is the Future of Content Management')
    await expect(page.locator('text=Alex Rivera').first()).toBeVisible()
  })

  test('renders another post', async ({ page }) => {
    await page.goto('/posts/graphql-vs-jsonapi-drupal')
    await expect(page.locator('h1')).toContainText('GraphQL vs JSON:API')
    await expect(page.locator('text=Samira Patel').first()).toBeVisible()
  })
})

test.describe('Static pages', () => {
  test('privacy page renders', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible()
    await expect(page.locator('text=respects your privacy')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('header and footer are present on all pages', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header, [class*="fixed"]').first()).toBeVisible()
    await expect(page.locator('footer').first()).toBeVisible()
  })
})
