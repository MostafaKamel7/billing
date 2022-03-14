
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');

(async () => {
  const workbook = XLSX.readFile('bills.xlsx')
  const data = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // const data = [{ phone: '0222801891' }, { phone: '042202320' }, { phone: '0222793999' }]

  for (let i = 0; i < data.length; i++) {
    const element = data[i].Phone
    console.log(element)

    await page.goto('https://dsl.orange.eg/ar/myaccount/pay-bill', { waitUntil: 'networkidle2' })
    await page.type('.FormControl.FL input', String('0' + element), { delay: 50 })
    await page.click('#ctl00_ctl33_g_b2324828_3a1e_47b3_96a3_ff169f762c76_ctl00_btnGetUserBills')

    // await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const txt = await Promise.race([
      page.waitForSelector('.GeneralLink span')
    ])

    console.log(await txt.evaluate(el => el.textContent))
  }
  //convert to xsal sheet
  // await browser.close()
})()
