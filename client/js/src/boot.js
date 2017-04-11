// boot.js

import { instance } from './controllers/trade-controller'

let controller = instance()

document.querySelector('#form-add-trade').onsubmit = controller.add.bind(controller)
document.querySelector('#btn-import-trades').onclick = controller.import.bind(controller)
document.querySelector('#btn-erase-trades').onclick = controller.erase.bind(controller)
