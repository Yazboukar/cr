const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.on('console', (msg) => console.log('PAGE:', msg.text()));
  page.on('dialog', async (dialog) => { console.log('DIALOG:', dialog.message()); await dialog.dismiss(); });
  page.on('request', async (request) => {
    try {
      if (request.method() === 'POST') {
        const postData = request.postData();
        console.log('REQUEST:', request.method(), request.url(), postData ? postData.slice(0, 1000) : '');
      } else {
        console.log('REQUEST:', request.method(), request.url());
      }
    } catch (e) {
      console.log('REQUEST LOG ERROR', e);
    }
  });
  page.on('response', async (response) => {
    try {
      const url = response.url();
      if (url.includes('/api/') || url.includes('/api/auth')) {
        const status = response.status();
        let body = '';
        try { body = await response.text(); } catch (_) { body = '<non-text response>'; }
        console.log('RESPONSE:', status, url, body.slice(0, 200));
      }
    } catch (e) {
      console.log('RESPONSE LOG ERROR', e);
    }
  });

  try {
    console.log('Opening sign-in page...');
    await page.goto('http://localhost:3000/auth/signin', { waitUntil: 'networkidle2' });
    const preCookies = await page.cookies();
    console.log('COOKIES BEFORE SUBMIT:', JSON.stringify(preCookies));

    await page.waitForSelector('input[name="email"]', { timeout: 5000 });
    await page.type('input[name="email"]', 'organizer@example.com');
    await page.type('input[name="password"]', 'organizerpass');

    console.log('Submitting sign-in form...');
    // Refresh CSRF token from API just before submitting (avoid CSRF mismatch)
    try {
      const fetched = await page.evaluate(() => fetch('/api/auth/csrf').then(r => r.json()));
      console.log('Fetched CSRF object:', JSON.stringify(fetched));
      await page.evaluate((t) => { const el = document.querySelector('input[name="csrfToken"]'); if (el) el.value = t; }, fetched.csrfToken);
    } catch (e) {
      console.log('Error fetching CSRF before submit', e);
    }

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {})
    ]);
    const postCookies = await page.cookies();
    console.log('COOKIES AFTER SUBMIT:', JSON.stringify(postCookies));
    console.log('Signed in, current URL:', page.url());

    console.log('Opening create meeting page...');
    await page.goto('http://localhost:3000/meetings/create', { waitUntil: 'networkidle2' });
    await page.waitForSelector('input[name="title"]', { timeout: 5000 });

    await page.type('input[name="title"]', 'Automated Meeting');
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const dateStr = tomorrow.toISOString().slice(0, 10);
    await page.evaluate((d) => { document.querySelector('input[name="date"]').value = d; }, dateStr);
    await page.evaluate(() => { document.querySelector('input[name="startTime"]').value = '09:00'; });
    await page.evaluate(() => { document.querySelector('input[name="endTime"]').value = '10:00'; });
    await page.type('textarea[name="description"]', 'Created by automated script');
    await page.type('input[name="participants"]', 'participant@example.com');

    console.log('Submitting create form...');
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {})
    ]);

    console.log('After submit, URL:', page.url());
    if (page.url().includes('/meetings/')) {
      console.log('Meeting creation appears successful.');
    } else {
      console.log('Meeting creation may have failed; check server logs or alert output above.');
    }
  } catch (err) {
    console.error('Automation error:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
