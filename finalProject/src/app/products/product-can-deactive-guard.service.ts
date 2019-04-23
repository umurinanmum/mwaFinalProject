import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {ProductComponent} from './product-create/product.component';

@Injectable()
export class ProductCanDeactiveGuardService implements CanDeactivate<ProductComponent> {
  canDeactivate(component: ProductComponent): boolean {
    if (component.createProduct.dirty) {
      return confirm('Are you sure it to discard?');
    }
    return true;
  }

}
