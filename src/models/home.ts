import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import axios from 'axios'

// 轮播图
const CAROUSEL_URL = '/bear/carousel'

export interface ICarousel {
  id: string
  image: string
  colors: [string, string]
}

export interface HomeState {
  carousels: ICarousel[]
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
  }
}

const initialState = {
  carousels: []
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
    }
  }
}

export default homeModel
