import { createFeatureSelector } from '@ngrx/store';
import * as memeActions from '../../actions/meme/meme.actions';
import { State } from '..';

/**
 * feature key for the meme
 */
export const memeFeatureKey = 'meme';

/**
 * MemeState to show or not
 */
export interface MemeState {
  /**
   * visibility flag for the meme
   */
  isVisible: boolean;
  /**
   * Image for the meme
   */
  memeImage: string;
}
/**
 * Initial meme state
 */
export const initialState: MemeState = {
  /**
   * visibility flag for the meme
   */
  isVisible: false,
  /**
   * Image for the meme
   */
  memeImage: ''
};
/**
 * Selector to retrieve meme
 */
export const selectMemeState = createFeatureSelector<State, MemeState>(memeFeatureKey);

/**
 * reducer function
 * @param state MemeState to deal with
 * @param action Action related to MemeState
 */
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
