import { nextConfigProp } from '../../actions/game.actions';
import { Store } from '../opaque-tokens';
import { configInterfaces } from '../../../engine/configs/config-interfaces';

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';

import {
  Button,
  Number,
  Select,
} from '../components';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { isObject } from '../../../util';
import { EngineStore } from '../../store/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    Button,
    Number,
    Select,
  ],
  selector: 'bd-config',
  template: `
    <div *ngFor="let i of configInterfaces">
      <div [ngSwitch]="i.type" >
          <strong>{{ i.label }}</strong>
          <bd-select *ngSwitchCase="'select'"
          [model]="(config$ | async)[i.prop]" 
          (update)="updateSelection($event.value, i.prop)"
          [options]="i.options()"
          byValue="true"></bd-select>
          <bd-number *ngSwitchCase="'number'"
          [model]="(config$ | async)[i.prop]"
          (update)="updateSelection($event, i.prop)"
          [min]="(config$ | async)[i.min]"
          [max]="(config$ | async)[i.max]"></bd-number> 
      </div>  
    </div>
    <button [onClick]="createGame" value="New Game"></button> 
`,
})
export class GameConfig {
  @select((s) => s.nextConfig) config$: Observable<string>;
  createGame: Function;
  configInterfaces: any[];

  constructor(@Inject(Store) private store: EngineStore) {
    this.configInterfaces = configInterfaces;
    this.createGame = store.game.create;
  }

  updateSelection(selection, prop) {
    let value = selection;
    if (isObject(selection)) {
      value = selection.value;
    }
    (<any>this.store.dispatch)(nextConfigProp(prop, value));
  }
}