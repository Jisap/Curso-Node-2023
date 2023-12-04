import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";




(async () => {  // Función asíncrona autoinvocada
  await main();
  console.log('Fin de programa')
})();

async function main(){

  const { b: base, l: limit, s: showTable } = yarg;

  ServerApp.run({
    base,
    limit,
    showTable,
  });
}

// npx ts-node src/app --base 10 -s