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
  await page.waitForSelector('.profile-avatar h5')
  const groupAvatar = await page.waitForSelector('.profile-avatar')
  const userName = await groupAvatar.$eval('h5', h5 => h5.innerText)
  return Promise.resolve(userName)
}

const getSkillname = async page => {
  try {
    await page.waitForSelector('.progressBar  .fieldName')
    const skillItem = await page.waitForSelector('.progressBar')
    const skillName = await skillItem.$eval('h6', h6 => h6.innerText)
    return Promise.resolve(skillName)
  } catch (error) {
    console.log('skill name not found')
  }
}

const getSkillPoint = async page => {
  try {
    const pointItem = await page.waitForSelector('.customBar')
    await page.waitForSelector('.customBar  .progress-bar')
    const point = await pointItem.$eval('div', div => div.innerText)
    return Promise.resolve(point)
  } catch (error) {
    console.log('no skill point found')
  }
}

const getUserSkill = async page => {
  const skills = []
  try {
    await page.waitForSelector('.tabs button')
    const tab = await page.$$('.tabs button')
    tab[1].click()
    const data = await page.waitForSelector('.profile-content', { timeout: 2000 })
    const progressBar = await page.$$('.skills-area .progressBar')

    if (progressBar && data) {
      for (let i = 0; i < progressBar.length; i++) {
        const data = await Promise.all([getSkillname(page), getSkillPoint(page)])
        skills.push({
          skillName: data[0],
          point: data[1]
        })
      }
      return Promise.resolve(skills)
    }
  } catch (error) {
    console.log('no skill data')
  }
}

const getDataPerPage = async (page) => {
  const data = await Promise.all([getUserName(page), getUserSkill(page)])
  if (data) {
    return Promise.resolve({ userName: data[0], skill: data[1] })
  }
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
    await page.goto(urlProfile(i))
    console.log("TCL: intervalId -> result", i, result)
    i++
  }, 5000)
}

export const startCrawl = async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

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