import { yarg } from "./config/plugins/yargs.plugin";



// console.log(yarg)

(async () => {  // Función asíncrona autoinvocada
  await main();
  console.log('Fin de programa')
})();

async function main(){
  console.log(yarg)
}