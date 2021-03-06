import {
  deepFreeze,
  noop,
  partial,
} from '../util';
import { create } from './store/store';
import { root as rootReducer } from './reducers/root.reducer.complete';
import { show, hide } from './elements';
import {
  bootstrapRoutes,
  changeFramework as changeFrameworkA,
  changeMultiFramework,
} from './actions/app.actions';
import {
  EL_ROOT,
  EL_SPLASH,
  FRAMEWORK_DESCRIPTIONS,
  VERSION,
} from './constants';
import { init } from './aspect-resizer';

const store = create(rootReducer);
const resizer = init(store);

(<any>store).dispatch(bootstrapRoutes(window.location.pathname));

// no idea why editor dislikes store.dispatch :/
(<any>store).dispatch(changeMultiFramework(true));

// no idea why editor dislikes store.dispatch :/
const changeFramework = (offset: number) => (<any>store)
  .dispatch(changeFrameworkA(offset));

const splashEl = document.getElementById(EL_SPLASH);
const rootEl = document.getElementById(EL_ROOT);

const memoPromise = (promiser) => {
  let p;
  return () => {
    if (p) {
      return p;
    }
    p = promiser();
    return p;
  };
};

const angular = memoPromise(() =>
  import(/* webpackChunkName: "angular" */ './angular/angular')
);
const react = memoPromise(() =>
  import(/* webpackChunkName: "react" */ './react/react')
);
const vue = memoPromise(() =>
  import(/* webpackChunkName: "vue" */ './vue/vue')
);

const frameWorks = deepFreeze({
  'bd-root-angular': angular,
  'bd-root-react': react,
  'bd-root-vue': vue,
});

const elements = FRAMEWORK_DESCRIPTIONS.reduce(
  (state, { id }) => {
    state[id] = document.getElementById(id);
    return state;
  },
  Object.create(null)
);

let listeners: Function[] = [];
let unmountCurrent = noop;
hide(rootEl);
hideAll();

if ((<any>window).BLOCK_DROP) {
  console.warn('Block Drop currently only supports one installed instance per' +
    `page :( ... replacing ${(<any>window).BLOCK_DROP.version} with: ` +
    VERSION);
}
(<any>window).BLOCK_DROP = deepFreeze({
  version: VERSION,
  mount,
  unmount,
});


function hideAll() {
  Object.keys(elements).forEach((id) => hide(elements[id]));
}

function mount() {
  rootEl.innerHTML = '';
  FRAMEWORK_DESCRIPTIONS.forEach((fwDesc, i) => {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = fwDesc.name;
    button.addEventListener('click', onClick);

    function onClick() {
      const el = elements[fwDesc.id];
      frameWorks[fwDesc.id]().then((fw) => {
        hideAll();
        unmountCurrent();
        fw.mount(store, resizer);
        show(el);
        unmountCurrent = partial(fw.unmount, el);
        changeFramework(i);
      });
    }

    listeners.push(() => {
      button.removeEventListener('click', onClick);
    });

    rootEl.appendChild(button);
  });
  hide(splashEl);
  show(rootEl);
}

function unmount() {
  hide(rootEl);
  hideAll();
  listeners.forEach((unsubscribe) => unsubscribe());
  listeners = [];
  rootEl.innerHTML = '';
  show(splashEl);
}
