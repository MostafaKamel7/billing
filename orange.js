/**
 * @name Download file / upload file
 *
 * @desc Find an image by class selector, downloads the image, saves it to disk and read it again. Use this together with a .fileUpload() method.
 *
 */

const puppeteer = require('puppeteer')
const XLSX = require('xlsx');
(async () => {
  const workbook = XLSX.readFile('bills.xlsx')
  const data = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  for (let i = 0; i < data.length; i++) {
    const element = String(data[i].Phone)
    console.log(element)

    await page.goto('https://my.te.eg/anonymous/AdslPayment', { waitUntil: 'networkidle2' })

    await page.waitForSelector('.p-inputmask.p-inputtext.p-component')
    await page.waitForSelector(':nth-child(3) > .col-md-6 > .p-inputtext-sm')
    await page.waitForSelector('.p-dropdown-label')

    await page.type('.p-inputmask.p-inputtext.p-component', ' ' + element, { delay: 50 })
    await page.type(':nth-child(3) > .col-md-6 > .p-inputtext-sm', ' m@m.com', { delay: 50 })
    await page.click('.p-dropdown-label')
    await page.click(':nth-child(1) > .p-dropdown-item')
    await page.click('.col-12 > :nth-child(2)')

    const txt = await Promise.race([
      page.waitForSelector('.p-toast-message-content'),
      page.waitForSelector('.p-field-radiobutton.mb-0.py-3')
    ])

    console.log(await txt.evaluate(el => el.textContent))
  };
})
()
