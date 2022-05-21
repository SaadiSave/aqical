import App from './App.svelte'
import { testEAQI, testMMAQI, testNAQI } from "../lib/test"

testEAQI()
testNAQI()
testMMAQI()

const app = new App({
  target: document.getElementById('app')!
})

export default app
