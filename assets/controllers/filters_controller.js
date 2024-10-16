import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

class FiltersController extends Controller {
  async initialize() {
    this.component = await getComponent(this.element);
  }

  filterChange() {
    this.component.action('save');
  }

  sortChange(e) {
    this.component.action('save', { order: e.target.value });
  }
  resetForm() {
    this.component.action('save', { reset: true });
  }
}

export default FiltersController;
