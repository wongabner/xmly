import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'react';

export interface HomeState {
  num: number;
}
interface payloadA {
  num: number;
}
export interface HomeAction {
  type: string;
  payload?: any;
}

interface homeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    add: Reducer<HomeState, HomeAction>;
  };
  effects: {
    asyncAdd: Effect;
  };
}

const initialState = {
  num: 1,
};

const delay = (timout: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(5);
    }, timout);
  });
};

const homeModel: homeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    add(state = initialState, action) {
      return {
        ...state,
        num: state.num + action.payload.num,
      };
    },
  },
  effects: {
    *asyncAdd(action, {call, put}) {
      let num = yield call(delay, 3000);
      yield put({
        type: 'add',
        payload: {
          num,
        },
      });
    },
  },
};

export default homeModel;
