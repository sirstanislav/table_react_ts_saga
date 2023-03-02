import uuid from 'react-uuid';
import { RootState } from './index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest, put, select } from 'redux-saga/effects';
import {
  SET_COL,
  SET_ROW,
  SET_COL_NAME,
  SET_CELL_NAME,
} from '../constant'

export type IColsType = {
  id: string,
  title: string,
}

export type IRowsType = {
  id: string,
  title: string,
  cells: Array<{
    id: string,
    title: string,
  }>
}


type IDataState = {
  cols: IColsType[]
  rows: IRowsType[]
}

const initialState: IDataState = {
  cols: [
    {
      id: uuid(),
      title: 'Name',
    },
    {
      id: uuid(),
      title: 'Surname',
    },
  ],
  rows: [
    {
      id: uuid(),
      title: 'second row',
      cells: [
        {
          id: uuid(),
          title: 'Orazio',
        },
        {
          id: uuid(),
          title: 'Contorino',
        },
      ],
    },
    {
      id: uuid(),
      title: 'first row',
      cells: [
        {
          id: uuid(),
          title: 'Stanislav',
        },
        {
          id: uuid(),
          title: 'Sorochan',
        },
      ],
    },
    {
      id: uuid(),
      title: 'third row',
      cells: [
        {
          id: uuid(),
          title: 'Nunzio',
        },
        {
          id: uuid(),
          title: 'Mio',
        },
      ],
    },
  ],
}

export const excelSlice = createSlice({
  name: "excelSlice",
  initialState,
  reducers: {
    addCol(state = initialState, action) {
      state.cols.forEach((col, index) => {
        if (state.cols.at(-1) === col) {
          state.cols.push({
            id: uuid(),
            title: ''
          })
          state.rows.map((item) => {
            return item.cells.push(
              {
                id: uuid(),
                title: ''
              }
            )
          })
        } else {
          if (col.id === action.payload.id) {
            return state.cols.splice(index + 1, 0, {
              id: uuid(),
              title: ''
            }) && state.rows.map((row) => {
              return row.cells.splice(index + 1, 0, {
                id: uuid(),
                title: ''
              })
            })
          }
        }
      })
      return state
    },
    addRow(state = initialState, action) {
      const cellsForNewRow: { id: string; title: string; }[] = []
      Array.from(Array(action.payload.cols).keys()).forEach(() => {
        return cellsForNewRow.push({
          id: uuid(),
          title: '',
        })
      })
      state.rows.forEach((row, index) => {
        if (state.rows.at(-1) === row) {
          console.log("this one")
          state.rows.push({
            id: action.payload.id,
            title: '',
            cells: cellsForNewRow
          })
        } else {
          if (row.id === action.payload.id) {
            return state.rows.splice(index + 1, 0, {
              id: uuid(),
              title: '',
              cells: cellsForNewRow
            })
          }
        }
      })
      return state
    },
    setColTitle(state = initialState, action: PayloadAction<IColsType>) {
      const item = state.cols.find(item => item.id === action.payload.id)
      if (item) {
        item.title = action.payload.title
      }
      return state
    },
    setCellTitle(state = initialState, action: PayloadAction<IColsType>) {
      state.rows.forEach((item) => {
        const cell = item.cells.find(item => item.id === action.payload.id)
        if (cell) {
          cell.title = action.payload.title
        }
        return state
      })
    }
  }
})

export const excelSliceAction = {
  addCol: (payload: { id: string }): { type: typeof SET_COL, payload: { id: string } } => {
    return {
      type: SET_COL,
      payload
    }
  },
  addRow: (payload: { id: string }): { type: typeof SET_ROW, payload: { id: string } } => {
    return {
      type: SET_ROW,
      payload
    }
  },
  setColTitle: (payload: { title: string, id: string }): { type: typeof SET_COL_NAME, payload: { title: string, id: string } } => {
    return {
      type: SET_COL_NAME,
      payload
    }
  },
  setCellTitle: (payload: { title: string, id: string }): { type: typeof SET_CELL_NAME, payload: { title: string, id: string } } => {
    return {
      type: SET_CELL_NAME,
      payload
    }
  },
}

export function* excelSaga() {
  yield all([
    takeLatest(SET_COL, setCol),
    takeLatest(SET_ROW, setRow),
    takeLatest(SET_COL_NAME, setColTitle),
    takeLatest(SET_CELL_NAME, setCellTitle),
  ])
}

export function* setCol(action: { type: string, payload: { id: string } }) {
  const rows: number = yield select((state: RootState) => state.excelSlice.rows.length)
  yield put(excelSlice.actions.addCol({ ...action.payload, rows }))
}
export function* setRow(action: { type: string, payload: { id: string } }) {
  const cols: number = yield select((state: RootState) => state.excelSlice.cols.length)
  yield put(excelSlice.actions.addRow({ ...action.payload, cols }))
}
export function* setColTitle(action: { type: string, payload: { title: string, id: string } }) {
  yield put(excelSlice.actions.setColTitle({ title: action.payload.title, id: action.payload.id }))
}

export function* setCellTitle(action: { type: string, payload: { title: string, id: string } }) {
  yield put(excelSlice.actions.setCellTitle({ title: action.payload.title, id: action.payload.id }));
}

export default excelSlice