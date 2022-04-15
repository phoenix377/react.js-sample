import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '../../../models';
import { fetchRecipesList } from './fetchRecipesList';

type RecipesState = {
  list: Recipe[];
  query: string;
  loading: boolean;
  nextUrl: string[];
}

const initialState: RecipesState = {
  list: [] as Recipe[],
  query: '',
  loading: true,
  nextUrl: [],
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Recipe[]>) => {
      state.list = action.payload
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setNextUrl: (state, action: PayloadAction<string[]>) => {
      state.nextUrl = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesList.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchRecipesList.fulfilled, (state, action) => {
        state.list = action.payload.data
        if (action.payload.append && action.payload.next) {
          state.nextUrl = [...state.nextUrl, action.payload.next]
        } else if (action.payload.prevUrl) {
          state.nextUrl.pop()
        } else {
          state.nextUrl = [action.payload.next]
        }
        state.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { setList, setQuery, setNextUrl } = recipesSlice.actions

export default recipesSlice.reducer