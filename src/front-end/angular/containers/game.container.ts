import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { bindResizeToWindow, resize } from '../../aspect-resizer';
import {
  ActivePiece,
  Board,
  Button,
  Debug,
  InputDevice,
  NextPieces,
  Select,
}  from '../components';
import { boardToArray } from '../../../util';
import { keyPress } from '../../actions/events.actions';
import { registerKeyControls } from '../../controls';
import { columnsFromBlock } from '../../../engine/block';
import {
  board,
  flexCol,
  flexGrowShrink,
  flexShrink,
  previewDebug,
} from '../../styles';
import { Store } from '../opaque-tokens';
import { EngineStore } from '../../store/store';
import { select } from 'ng2-redux';

@Component({
  directives: [
    ActivePiece, Board, Debug, Button, NextPieces, InputDevice, Select
  ],
  selector: 'bd-game',
  template: `
    <board class="${board}" 
    [board]="(board$ | async)"
    [width]="boardWidth$ | async"
    [ngStyle]="styles"
    ></board> 
    <div class="${previewDebug}">
      <bd-next-pieces class="${flexShrink} ${flexCol}" 
      [preview]="preview"></bd-next-pieces>
      <bd-debug 
      class="${flexGrowShrink}" 
      [activePiece]="(activePiece$ | async)"
      [keyCode]="(lastEvent$ | async).keyCode"></bd-debug>
    </div>
`,
})
export class Game implements AfterViewInit, OnInit, OnDestroy {
  @select(
    (s) => recomputeBoard(s.game.buffer, s.game.config.width)) board$;
  @select((s) => s.game.lastEvent) lastEvent$;
  boardWidth$: number;
  deRegister: Function[] = [];
  preview: { name: string, cols: number[][]}[] = [];
  styles = {};
  constructor(@Inject(Store) private store: EngineStore,
              private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    resize();
  }

  ngOnInit() {
    this.deRegister.push(this.store.subscribe(() => {
      const game = this.store.getState().game;
      this.styles['min-width'] = game.currentGameViewportDimensions.x + 'px';
      this.styles['min-height'] = game.currentGameViewportDimensions.y + 'px';
      this.styles['max-width'] = game.currentGameViewportDimensions.x + 'px';
      this.styles['max-height'] = game.currentGameViewportDimensions.y + 'px';
    }));
    this.deRegister.push(bindResizeToWindow());
    // our events happen "outside" of angular.  Account for that:
    this.deRegister.push(
      this.store.game.on('redraw', this.cdRef.detectChanges.bind(this.cdRef)));

    const controls = this.store.game.controls();

    this.deRegister.push(registerKeyControls({
      37: controls.moveLeft,
      38: controls.moveUp,
      39: controls.moveRight,
      40: controls.moveDown,
      81: controls.rotateLeft,
      87: controls.rotateRight,
    }, (evt) => (<any>this.store.dispatch)(keyPress(evt))));

    this.redraw();
  }

  redraw() {
    const { preview } = this.store.getState().game;

    this.preview = preview.map((el) => ({
      name: el.name,
      cols: columnsFromBlock(el),
    }));
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.deRegister.forEach((unsubscribe) => unsubscribe());
    this.deRegister = [];
  }

}

function recomputeBoard(buffer, width) {
  const newBoard = [];
  const board = boardToArray(buffer, width);

  let rows;

  board.forEach((el, i) => {
    if (i % width === 0) {
      rows = [];
    }
    rows.push(el);
    if (rows.length === width) {
      newBoard.push(rows);
    }
  });

  return newBoard;
}
