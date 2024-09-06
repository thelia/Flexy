import { Controller } from '@hotwired/stimulus';
import { trans, EXPIRED } from '../translator';
/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
class HelloController extends Controller {
  connect() {
    this.element.textContent = `Hello Stimulus! Edit me in assets/controllers/hello_controller.js \n
       test translation: ${trans(EXPIRED)}`;
  }
}

export default HelloController;
