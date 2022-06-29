import inquirer from "inquirer"
import { play } from "./play.js"

export async function menu() {
  const { menu } = await inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: '¿Qué quieres hacer?',
      choices: [
        {
          name: 'Jugar',
          value: 1
        },
        {
          name: 'Salir',
          value: 0
        }
      ]
    }
  ])

  if (menu == 1) {
    play()
  } else {
    console.log('Adios...')
    process.exit(0)
  }
}
