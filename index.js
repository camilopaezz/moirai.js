import { menu } from './menu.js'
import { printLogo } from './utils/logo.js'
import { Answers } from './prev.js'

;(async () => {
  const answers = Answers.getInstance()

  // await answers.fecthPrevAnswers()

  console.clear()
  printLogo()

  menu()

  // answers.saveAnswers()
})()
