import inquirer from 'inquirer'
import chalk from 'chalk'
import { ca, pa, cb } from './utils/talk.js'
import fetch from 'node-fetch'


const API_URL = 'https://whispering-woodland-26878.herokuapp.com/api'
// const API_URL = 'http://localhost:3000/api'
let myAnswer = {}

async function getPrevAnswers() {
  const res = await fetch(API_URL)
  const data = await res.json()

  return data
}

export async function play() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '¿Cómo te llamas?',
      default: 'unknown'
    }
  ])

  myAnswer.name = name

  p10()
}

async function p10() {
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: ca('¡Que bueno que se ha despertado!, ¿se encuentra bien?'),
      choices: [
        {
          name: 'Si, gracias por preguntar',
          value: 1
        },
        {
          name: '¿Quien es usted?, ¿Donde estoy?',
          value: 2
        }
      ]
    }
  ])

  if (answer == 1) {
    ca('¡Bien!')
    p10()
  }
  if (answer == 2) {
    ca(
      'Eso mismo me pregunto, sobre quien es usted claro, donde estoy lo tengo claro; Se encuentra en Treboura. Lo encontramos a medianoche en la carretera.'
    )
    p11()
  }
}

async function p11() {
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: '',
      choices: [
        {
          name: 'Me ha quedado claro',
          value: 1
        },
        {
          name: '"Lo hemos encontrado", ¿usted y quienes?',
          value: 2
        }
      ]
    }
  ])

  if (answer == 1) {
    p10()
  } else {
    ca(
      'Mi esposa y yo, ibamos caminando cuando escuchamos forcejeos en la oscuridad, mi esposa dice haber visto a alguien correr, nos acercamos y lo encontramos a usted'
    )
    ca(
      'Es lo unico que se, tal vez ella le podria resolver mas inquietudes, hablaba usted dormido y ella era la que lo escuchó'
    )
    p20()
  }
}

async function p20() {
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: pa('¿Desea hablar con ella?'),
      choices: [
        {
          name: 'Si, por favor',
          value: 1
        },
        {
          name: 'Aun no, tengo algunas dudas',
          value: 2
        }
      ]
    }
  ])

  if (answer == 1) {
    p30()
  } else {
    p21()
  }
}

async function p21() {
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: '',
      choices: [
        {
          name: 'Me queda claro',
          value: 1
        },
        {
          name: '¿Alguien mas conmigo?, no recuerdo nada',
          value: 2
        },
        {
          name: '¿Hable dormido?',
          value: 3
        }
      ]
    }
  ])

  switch (answer) {
    case 1:
      p20()
      break

    case 2:
      ca('Curioso, al menos eso dice mi esposa, no pedo asegurarle nada')
      p21()
      break

    case 3:
      ca(
        'Si, mi esposa estaba algo preocupada quien sabe que cosas dijo, prefirio no decirme, era algo intimo suyo'
      )
      p21()
      break
  }
}

async function p30() {
  ca('Ella se encuentra en el sotano, lo acompañaria pero estoy muy ocupado')

  await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: '¿Que hacer?',
      choices: ['ir']
    }
  ])

  await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: 'Un pasillo largo..., y un hombre ¿manchado de sangre?; De fondo, en el piso una mujer muerta',
      choices: ['hablar']
    }
  ])

  p40()
}

async function p40() {
    const { answer } = await inquirer.prompt([
      {
        type: 'list',
        name: 'answer',
        message: '¿Que le preguntas?',
        choices: [
          {
            name: '¿Quien eres?',
            value: 1
          },
          {
            name: '¿Has visto a una mujer?',
            value: 2
          },
          {
            name: '¿Porque las manchas de sangre?',
            value: 3
          },
          {
            name: '¿Porque el cuchillo?',
            value: 4
          },
          {
            name: '¡La has matado!',
            value: 5
          }
        ]
      }
    ])

    const prev = await getPrevAnswers()
    myAnswer.previus = prev._id

    switch (answer) {
      case 1:
        cb('Soy ' + prev.name)
        p40()
        break

      case 2:
        cb(prev.answers[0])
        p40()
        break

      case 3:
        cb(prev.answers[1])
        p40()
        break

      case 4:
        cb(prev.answers[2])

        p40()
        break

      case 5:
        cb(prev.answers[3])

        p41()
        break
    }
}

async function p41() {
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: 'Tienes un cuchillo en el bolsillo; ¿Que hacer?',
      choices: [
        {
          name: 'Matar',
          value: 1
        },
        {
          name: 'Dejar seguir',
          value: 2
        }
      ]
    }
  ])

  switch (answer) {
    case 1:
      myAnswer.kill = true
      break;
    case 2:
      myAnswer.kill = false
      break;
  }

  await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: '¿Que hacer?',
      choices: ['Contarle a su esposo']

    }
  ])

  console.log('\nSaliendo te encuentras a un hombre, que te pregunta:\n')

  const x = await inquirer.prompt([
    {
      type: 'text',
      name: 'a',
      message: '¿Has visto a una mujer?'
    },
    {
      type: 'text',
      name: 'b',
      message: '¿Porque las manchas de sangre?'
    },
    {
      type: 'text',
      name: 'c',
      message: '¿Porque el cuchillo?'
    },
    {
      type: 'text',
      name: 'd',
      message: '¡La has matado!'
    }
  ])

  
  myAnswer.answers = Object.values(x)

  const res = await fetch(API_URL, {
    body: JSON.stringify(myAnswer),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  const data = await res.json()

  console.log(chalk.redBright('\nTu historia acaba aquí... por ahora: Tu ID es ' + data._id + '\n'))
  console.log(
    chalk.redBright('Visita https://www.moirai-p.vercel.app/ para conocer la historia completa\n')
  )
}