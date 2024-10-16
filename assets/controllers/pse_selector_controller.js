import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

class PseSelectorController extends Controller {
  async initialize() {
    this.component = await getComponent(this.element);
    console.log('test');
  }

  change(e) {
    console.log(e);
  }
}

export default PseSelectorController;
