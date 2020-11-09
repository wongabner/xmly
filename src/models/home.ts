import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import axios from 'axios'
import {RootState} from '.';

// 轮播图
const CAROUSEL_URL = '/carousel'
export interface ICarousel {
  id: string
  image: string
  colors: [string, string]
}

// 猜你喜欢
const GUESS_URL = '/guess';
export interface IGuess {
  id: string;
  title: string;
  image: string;
}

// 首页列表
const CHANNEL_URL = '/channel';
export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface HomeState {
  carousels: ICarousel[]
  guess: IGuess[]
  channels: IChannel[]
}

export interface HomeAction {
  type: string
  payload?: any
}

interface homeModel extends Model {
  namespace: 'home'
  state: HomeState
  reducers: {
    setState: Reducer<HomeState, HomeAction>
  }
  effects: {
    fetchCarousels: Effect
    fetchGuess: Effect
    fetchChannels: Effect
  }
}

const initialState: HomeState = {
  carousels: [],
  guess: [],
  channels: [],
}

const homeModel: homeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    /**
     * 请求首页轮播图数据
     */
    *fetchCarousels(action, { call, put }) {
      try {
        const { data } = yield call(axios.get, CAROUSEL_URL)
        // console.log(data,'轮播图数据data')

        yield put({
          type: 'setState',
          payload: {
            carousels: data
          }
        })
      } catch (err) {
        console.log(err, 'catch err')
      }
    },
    /**
     * 请求猜你喜欢数据
     */
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    /**
     * 请求列表数据
     */
    *fetchChannels({callback, payload}, {call, put, select}) {
      // const {channels, pagination} = yield select(
      //   (state: RootState) => state.home,
      // );
      let page = 1;
      // if (payload && payload.loadMore) {
      //   page = pagination.current + 1;
      // }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });
      let newChannels = data.results;
      // if (payload && payload.loadMore) {
      //   newChannels = channels.concat(newChannels);
      // }

      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          // pagination: {
          //   current: data.pagination.current,
          //   total: data.pagination.total,
          //   hasMore: newChannels.length < data.pagination.total,
          // },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  }
}

export default homeModel
