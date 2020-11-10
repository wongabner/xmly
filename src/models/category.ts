import { Model, Effect, SubscriptionsMapObject } from 'dva-core-ts'
import { Reducer } from 'redux'
import storage, { load } from '@/config/storage'
import axios from 'axios'
import { RootState } from '.'

const CATEGORY_URL = '/category'

export interface ICategory {
  id: string
  name: string
  classify?: string
}

interface CategoryModelState {
  isEdit: boolean
  myCategorys: ICategory[]
  categorys: ICategory[]
}

interface CategoryModel extends Model {
  namespace: 'category'
  state: CategoryModelState
  effects: {
    loadData: Effect
    toggle: Effect
  }
  reducers: {
    setState: Reducer<CategoryModelState>
  }
  subscriptions: SubscriptionsMapObject
}

const initialState = {
  isEdit: false,
  myCategorys: [
    {
      id: 'home',
      name: '推荐'
    },
    {
      id: 'vip',
      name: 'Vip'
    }
  ],
  categorys: []
}

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  effects: {
    *loadData(_, { call, put }) {
      // 从storage获取数据
      const myCategorys = yield call(load, { key: 'myCategorys' })
      const categorys = yield call(load, { key: 'categorys' })
      // 发起action，将数据保存到state
      if (myCategorys) {
        yield put({
          type: 'setState',
          payload: {
            myCategorys,
            categorys
          }
        })
      } else {
        yield put({
          type: 'setState',
          payload: {
            categorys
          }
        })
      }
    },
    *toggle({ payload }, { put, select }) {
      const category = yield select(({ category }: RootState) => category)
      yield put({
        type: 'setState',
        payload: {
          isEdit: !category.isEdit,
          myCategorys: payload.myCategorys
        }
      })
      if (category.isEdit) {
        storage.save({
          key: 'myCategorys',
          data: payload.myCategorys
        })
      }
    }
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadData' })
    },
    asyncStorage() {
      storage.sync.categorys = async () => {
        const { data } = await axios.get(CATEGORY_URL)
        return data
      }
      storage.sync.myCategorys = async () => {
        return null
      }
    }
  }
}

export default categoryModel
