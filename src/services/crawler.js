import puppeteer from 'puppeteer'
// import cheerio from 'cheerio'

const urlCrawl = 'https://project.bap.jp/'
const userName = 'truongvn'
const userPassword = 'abcd1234'

const urlProfile = id => `https://project.bap.jp/profile/${id}`

const prepareToPage = async (page) => {
  const btnDirect = await page.waitForSelector('.btn-login')
  btnDirect.click()

  await page.waitForSelector('.input')
  await page.type('input[type="text"]', userName)
  await page.type('input[type="password"]', userPassword)

  const btnLogin = await page.waitForSelector('button.button')
  btnLogin.click()

  const btnMainPage = await page.waitForSelector('.component.inverted')
  btnMainPage.click()

  await page.waitForSelector('button')
  const btnAccept = await page.$$('.button')
  btnAccept[1].click()
}

const getUserName = async page => {
  const groupAvatar = await page.waitForSelector('.profile-avatar')
  await page.waitForSelector('.profile-avatar h5')
  await page.waitFor(1500)
  const userName = await groupAvatar.$eval('h5', h5 => h5.innerText)
  return Promise.resolve(userName)
}

const getSkillname = async page => {
  const skillItem = await page.waitForSelector('.progressBar')
  const waitEl = await page.waitForSelector('.progressBar  .fieldName')
  await page.waitFor(1500)
  const skillName = await skillItem.$eval('h6', h6 => h6.innerText)
  return Promise.resolve(skillName)
}

const getSkillPoint = async page => {
  const pointItem = await page.waitForSelector('.customBar')
  await page.waitForSelector('.customBar  .progress-bar')
  const point = await pointItem.$eval('div', div => div.innerText)
  return Promise.resolve(point)
}

const getUserSkill = async page => {
  const skills = []
  await page.waitForSelector('.tabs button')
  const tab = await page.$$('.tabs button')
  tab[1].click()
  const data = await page.waitForSelector('.profile-content', { timeout: 1000 })
  await page.waitFor(2000)
  const progressBar = await page.$$('.skills-area .progressBar')

  if (progressBar && data) {
    for (let i = 0; i < progressBar.length; i++) {
      const data = await Promise.all([getSkillname(page), getSkillPoint(page)])
      skills.push({
        skillName: data[0],
        point: data[1]
      })
    }
  }
  return Promise.resolve(skills)
}

const getDataPerPage = async (page) => {
  const userName = await getUserName(page)
  const skill = await getUserSkill(page)
  return Promise.resolve({ userName, skill})
}

const goToProfilePage = async (page) => {
  await page.waitForSelector('.nav-item')
  const btnProfile = await page.$$('.nav-item')
  btnProfile[3].click()
}

const countValue = async (page) => {
  let i = 1
  const result = []
  const intervalId = setInterval(async () => {
    if (i === 100) {
      clearInterval(intervalId)
    }
    const data = await getDataPerPage(page)
    result.push(data)
    console.log("TCL: intervalId -> result", i, result)
    await page.goto(urlProfile(i++))
    i++
  }, 5000)
}

export const startCrawl = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(urlCrawl)

    prepareToPage(page)

    goToProfilePage(page)

    countValue(page)
  } catch (error) {
    console.log(error)
  }
}

startCrawl()