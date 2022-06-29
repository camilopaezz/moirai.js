import chalk from 'chalk';

export function ca(text) {
  console.log('\n' + chalk.bold.yellowBright('Hombre del pueblo: ') + text + '\n')
}

export function pa(text) {
  console.log(chalk.bold.yellowBright('Hombre del pueblo: ') + text)
}

export function cb(text) {
  console.log('\n' + chalk.bold.redBright('Hombre Desconocido: ') + text + '\n');
}

export function pb(text) {
  console.log(chalk.bold.yellowBright('Hombre Desconocido: ') + text)
}