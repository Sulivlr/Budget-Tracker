import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addCategory, editCategory, deleteCategory } from '../../store/categoriesSlice';
import { Category } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
      const response = await axios.get<Category[] | null>('/categories.json');
      return response.data;
    }
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    dispatch(addCategory({ id: '', name: 'Category', type: 'income' }));
  };

  const handleEditCategory = (id: string, newName: string) => {
    dispatch(editCategory({ id, name: newName }));
  };

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <div>
        <h3>Add New Category</h3>
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div>
        <h3>Categories List</h3>
        <ul>
          {categories.map((category: Category) => (
            <li key={category.id}>
              {category.name} - {category.type}
              <button onClick={() => handleEditCategory(category.id, `${category.name}-edited`)}>
                Edit
              </button>
              <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
