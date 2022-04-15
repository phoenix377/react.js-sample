import { CssBaseline, Paper } from '@mui/material';

import RecipeList from './recipe-list/recipe-list';
import { SearchBox } from './search-box/search-box';

export function App() {
  return (
    <>
      <CssBaseline />
      <Paper elevation={5} sx={{ m: 5, p: 5 }}>
        <SearchBox />
        <RecipeList />
      </Paper>
    </>
  )
}

export default App
