import { AvTimer, EmojiFlags, Fastfood, HealthAndSafety, NoFood, Search } from '@mui/icons-material';
import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch } from '../hooks';
import { setNextUrl, setQuery } from '../store/features/recipes';

const groupName = (groupId: string) => {
  switch (groupId) {
    case 'dishType':
      return 'Dish Type';
    case 'diet':
      return 'Diet Labels';
    case 'mealType':
      return 'Meal Type';
    case 'health':
      return 'Health Labels';
    case 'cuisineType':
      return 'Cuisine Type';
    default:
      return groupId;
  }
}

type Suggestions = {
  type: string
  label: string
  value?: string
}

const iconMap = (type: string) => {
  switch (type) {
    case 'dishType':
      return <Fastfood />
    case 'diet':
      return <NoFood />
    case 'mealType':
      return <AvTimer />
    case 'health':
      return <HealthAndSafety />
    case 'cuisineType':
      return <EmojiFlags />
    default:
      return <Search />;
  }
}

const countType = (type: string, suggestions: Suggestions[]) => {
  return suggestions.filter(s => s.type === type).length;
}

const removeFirstOfType = (type: string, suggestions: Suggestions[]) => {
  const index = suggestions.findIndex(s => s.type === type);
  if (index > -1) {
    return [...suggestions.slice(0, index), ...suggestions.slice(index + 1)];
  }
  return suggestions;
}

export const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState<Suggestions[]>([]);

  useEffect(() => {
    if (value.some(v => typeof v === 'string')) {
      setValue(value.map(v => typeof v === 'string' ? { type: 'query', label: v } : v))
      return;
    }

    if (countType('query', value) > 1) {
      setValue(removeFirstOfType('query', value));
      return;
    }

    const queryString = value.map(
      v => `${v.type === 'query'
        ? 'q'
        : v.type}=${encodeURIComponent(v.value || v.label)}`
    ).join('&');

    dispatch(setQuery(queryString));
    dispatch(setNextUrl([]));
  }, [dispatch, value])

  return (
    <Box sx={{ paddingBottom: 2 }} >
      <Autocomplete
        multiple
        id="tags-filled"
        options={dishSuggestions}
        groupBy={(option) => groupName(option.type)}
        defaultValue={[]}
        freeSolo
        value={value}
        onChange={(_, value) => setValue(value as Suggestions[])}
        renderTags={(value, getTagProps) =>
          value.map((option, index: number) => (
            <Chip
              variant={option.type === 'query' ? "outlined" : "filled"}
              label={option.label}
              icon={iconMap(option.type)}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Search recipes"
            placeholder=""
          />
        )}
      />
    </Box>
  )
}

const dishSuggestions: Suggestions[] = [
  { type: 'mealType', label: 'Breakfast', value: 'Breakfast' },
  { type: 'mealType', label: 'Lunch', value: 'Lunch' },
  { type: 'mealType', label: 'Dinner', value: 'Dinner' },
  { type: 'mealType', label: 'Snack', value: 'Snack' },
  { type: 'mealType', label: 'Teatime', value: 'Teatime' },
  { type: 'dishType', label: 'Alcohol-cocktail', value: 'Alcohol-cocktail' },
  { type: 'dishType', label: 'Biscuits and cookies', value: 'Biscuits and cookies' },
  { type: 'dishType', label: 'Bread', value: 'Bread' },
  { type: 'dishType', label: 'Cereals', value: 'Cereals' },
  { type: 'dishType', label: 'Condiments and sauces', value: 'Condiments and sauces' },
  { type: 'dishType', label: 'Drinks', value: 'Drinks' },
  { type: 'dishType', label: 'Desserts', value: 'Desserts' },
  { type: 'dishType', label: 'Egg', value: 'Egg' },
  { type: 'dishType', label: 'Main course', value: 'Main course' },
  { type: 'dishType', label: 'Omelet', value: 'Omelet' },
  { type: 'dishType', label: 'Pancake', value: 'Pancake' },
  { type: 'dishType', label: 'Preps', value: 'Preps' },
  { type: 'dishType', label: 'Preserve', value: 'Preserve' },
  { type: 'dishType', label: 'Salad', value: 'Salad' },
  { type: 'dishType', label: 'Sandwiches', value: 'Sandwiches' },
  { type: 'dishType', label: 'Soup', value: 'Soup' },
  { type: 'dishType', label: 'Starter', value: 'Starter' },
  { type: 'diet', label: 'Balanced', value: 'balanced' },
  { type: 'diet', label: 'High-Fiber', value: 'high-fiber' },
  { type: 'diet', label: 'High-Protein', value: 'high-protein' },
  { type: 'diet', label: 'Low-Carb', value: 'low-carb' },
  { type: 'diet', label: 'Low-Fat', value: 'low-fat' },
  { type: 'diet', label: 'Low-Sodium', value: 'low-sodium' },
  { type: 'health', label: 'Alcohol Cocktail', value: 'alcohol-cocktail' },
  { type: 'health', label: 'Alcohol Free', value: 'alcohol-free' },
  { type: 'health', label: 'Celery Free', value: 'celery-free' },
  { type: 'health', label: 'Crustacean Free', value: 'crustacean-free' },
  { type: 'health', label: 'Dairy Free', value: 'dairy-free' },
  { type: 'health', label: 'Dash', value: 'DASH' },
  { type: 'health', label: 'Egg Free', value: 'egg-free' },
  { type: 'health', label: 'Fish Free', value: 'fish-free' },
  { type: 'health', label: 'Fodmap Free', value: 'fodmap-free' },
  { type: 'health', label: 'Gluten Free', value: 'gluten-free' },
  { type: 'health', label: 'Immuno Supportive', value: 'immuno-supportive' },
  { type: 'health', label: 'Keto Friendly', value: 'keto-friendly' },
  { type: 'health', label: 'Kidney Friendly', value: 'kidney-friendly' },
  { type: 'health', label: 'Kosher', value: 'kosher' },
  { type: 'health', label: 'Low Fat Abs', value: 'low-fat-abs' },
  { type: 'health', label: 'Low Potassium', value: 'low-potassium' },
  { type: 'health', label: 'Low Sugar', value: 'low-sugar' },
  { type: 'health', label: 'Lupine Free', value: 'lupine-free' },
  { type: 'health', label: 'Mediterranean', value: 'Mediterranean' },
  { type: 'health', label: 'Mollusk Free', value: 'mollusk-free' },
  { type: 'health', label: 'Mustard Free', value: 'mustard-free' },
  { type: 'health', label: 'No Oil Added', value: 'no-oil-added' },
  { type: 'health', label: 'Paleo', value: 'paleo' },
  { type: 'health', label: 'Peanut Free', value: 'peanut-free' },
  { type: 'health', label: 'Pescatarian', value: 'pescatarian' },
  { type: 'health', label: 'Pork Free', value: 'pork-free' },
  { type: 'health', label: 'Red Meat Free', value: 'red-meat-free' },
  { type: 'health', label: 'Sesame Free', value: 'sesame-free' },
  { type: 'health', label: 'Shellfish Free', value: 'shellfish-free' },
  { type: 'health', label: 'Soy Free', value: 'soy-free' },
  { type: 'health', label: 'Sugar Conscious', value: 'sugar-conscious' },
  { type: 'health', label: 'Sulfite Free', value: 'sulfite-free' },
  { type: 'health', label: 'Tree Nut Free', value: 'tree-nut-free' },
  { type: 'health', label: 'Vegan', value: 'vegan' },
  { type: 'health', label: 'Vegetarian', value: 'vegetarian' },
  { type: 'health', label: 'Wheat Free', value: 'wheat-free' },
  { type: 'cuisineType', label: 'American', value: 'American' },
  { type: 'cuisineType', label: 'Asian', value: 'Asian' },
  { type: 'cuisineType', label: 'British', value: 'British' },
  { type: 'cuisineType', label: 'Caribbean', value: 'Caribbean' },
  { type: 'cuisineType', label: 'Central Europe', value: 'Central Europe' },
  { type: 'cuisineType', label: 'Chinese', value: 'Chinese' },
  { type: 'cuisineType', label: 'Eastern Europe', value: 'Eastern Europe' },
  { type: 'cuisineType', label: 'French', value: 'French' },
  { type: 'cuisineType', label: 'Indian', value: 'Indian' },
  { type: 'cuisineType', label: 'Italian', value: 'Italian' },
  { type: 'cuisineType', label: 'Japanese', value: 'Japanese' },
  { type: 'cuisineType', label: 'Kosher', value: 'Kosher' },
  { type: 'cuisineType', label: 'Mediterranean', value: 'Mediterranean' },
  { type: 'cuisineType', label: 'Mexican', value: 'Mexican' },
  { type: 'cuisineType', label: 'Middle Eastern', value: 'Middle Eastern' },
  { type: 'cuisineType', label: 'Nordic', value: 'Nordic' },
  { type: 'cuisineType', label: 'South American', value: 'South American' },
  { type: 'cuisineType', label: 'South East Asian', value: 'South East Asian' },
]
