
import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs';


(async () => {
  main()
})();


async function main() {
  console.log(envs)
  Server.start()
}