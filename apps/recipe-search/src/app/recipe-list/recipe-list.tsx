import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import RecipeItem from '../recipe-item/recipe-item';
import { RecipeSkeleton } from '../recipe-skeleton/recipe-skeleton';
import { setNextUrl } from '../store/features/recipes';
import { fetchRecipesList } from '../store/features/recipes/fetchRecipesList';

/* eslint-disable-next-line */
export interface RecipeListProps { }

export function RecipeList(props: RecipeListProps) {
  const dispatch = useAppDispatch()

  const query = useAppSelector(state => state.recipes.query)
  const recipes = useAppSelector(state => state.recipes.list)
  const loading = useAppSelector(state => state.recipes.loading)
  const nextUrl = useAppSelector(state => state.recipes.nextUrl)

  const loadNextPage = useCallback(() => {
    dispatch(fetchRecipesList({ nextUrl: nextUrl[nextUrl.length - 1] }))
  }, [dispatch, nextUrl])

  const loadPrevPage = useCallback(() => {
    if (nextUrl.length === 2) {
      dispatch(fetchRecipesList({ query }))
      dispatch(setNextUrl([]));
    } else {
      dispatch(fetchRecipesList({ prevUrl: nextUrl[nextUrl.length - 3] }))
    }
  }, [dispatch, nextUrl, query])

  useEffect(() => {
    dispatch(fetchRecipesList({ query }))
  }, [dispatch, query])

  if (!query) {
    return (
      <Typography variant="subtitle1">
        Search for your favorite food!
      </Typography>
    )
  }

  if (loading) {
    return (
      <Grid container spacing={4}>
        {new Array(16).fill(0).map((_, i) => (
          <Grid item sm={3} key={i}>
            <RecipeSkeleton />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (!recipes?.length) {
    return (
      <Typography variant="subtitle1">
        Your search terms did not match any recipes.
      </Typography>
    )
  }

  return (
    <Grid container spacing={4}>
      {recipes?.map((r) => (
        <Grid item sm={3} key={r.uri}>
          <RecipeItem recipe={r} />
        </Grid>
      ))}
      <Grid item sm={12} alignItems='center' justifyContent='center'>
      </Grid>
      {nextUrl?.length > 0 ? (
        <Grid item sm={12} alignItems='center' justifyContent='center'>
          {nextUrl?.length > 1 ? (
            <Button onClick={loadPrevPage}>Prev Page</Button>
          ) : null}
          <Button onClick={loadNextPage}>Next Page</Button>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default RecipeList
