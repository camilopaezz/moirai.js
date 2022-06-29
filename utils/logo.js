import figlet from "figlet"
import chalk from "chalk"

export function printLogo() {
  console.log(
    chalk.bold.greenBright(
      `
${figlet.textSync('Moirai', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })}
Una experiencia de juego compartida en homenaje al juego indie lanzado en 2017.
  `
    )
  )
}
