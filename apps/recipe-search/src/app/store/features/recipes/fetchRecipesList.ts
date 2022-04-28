import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hits } from '../../../models';

type FetchRecipesPayload = {
  query?: string
  nextUrl?: string
  prevUrl?: string
}

export const fetchRecipesList = createAsyncThunk('recipes/fetchList', async (payload: FetchRecipesPayload) => {
  const getApiResponse = async <T,>(): Promise<T> => {
    const appId = '60247ce5'
    const appKey = 'f4921915a1c5068a745190413e8f07dd'
    const q = payload.query

    const api_url = payload.prevUrl || payload.nextUrl || `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&${q}`

    const response = await fetch(api_url)
    const data = (await response.json()) as Promise<T>

    return data
  }
  const fetchRecipes = async () => {
    const response = await getApiResponse<Hits>()

    return {
      data: response.hits.map((h) => h.recipe),
      next: response._links?.next?.href || '',
      append: !!payload.nextUrl,
      prevUrl: !!payload.prevUrl,
    }
  }

  const response = await fetchRecipes()
  return response
})
