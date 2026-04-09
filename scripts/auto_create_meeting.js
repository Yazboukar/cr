const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.on('console', (msg) => console.log('PAGE:', msg.text()));
  page.on('dialog', async (dialog) => { console.log('DIALOG:', dialog.message()); await dialog.dismiss(); });

  try {
    console.log('Opening sign-in page...');
    await page.goto('http://localhost:3000/auth/signin', { waitUntil: 'networkidle2' });

    await page.waitForSelector('input[name="email"]', { timeout: 5000 });
    await page.type('input[name="email"]', 'organizer@example.com');
    await page.type('input[name="password"]', 'organizerpass');

    console.log('Submitting sign-in form...');
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {})
    ]);
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
