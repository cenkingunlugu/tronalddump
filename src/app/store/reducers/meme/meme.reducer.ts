import { Action, createFeatureSelector } from '@ngrx/store';
import * as memeActions from '../../actions/meme/meme.actions';
import { State } from '..';
import { ReflectiveInjector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export const memeFeatureKey = 'meme';

export interface MemeState {
  isVisible: boolean;
  memeImage: string;
}

export const initialState: MemeState = {
  isVisible: false,
  memeImage: ''
};
/**
 * Selector to retrieve meme
 */
export const selectMemeState = createFeatureSelector<State, MemeState>(memeFeatureKey);


export function reducer(state = initialState, action: memeActions.MemeActions): MemeState {
  switch (action.type) {
    case memeActions.MemeActionTypes.ShowMemeSucceed:
      return {
        ...state,
        isVisible: action.isVisible,
        memeImage: URL.createObjectURL(action.image)
      };
    case memeActions.MemeActionTypes.ShowMemeCompleted:
      return {
        ...state,
        isVisible: false,
        memeImage: ''
      };
    default:
      return state;
  }
}
