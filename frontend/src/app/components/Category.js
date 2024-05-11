"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import BASE_URL from './BaseUrl';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/?categories`);
        const { data } = response;
        if (Array.isArray(data)) {
          // If the response data is an array, assume it's the list of categories
          setCategories(data);
        } else if (data && data.categories) {
          // If the response data contains a property called "categories", assume it's the list of categories
          setCategories(data.categories);
        } else {
          console.error('Invalid response format:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.slug}>
              {category.cat}
              
              {category.subcategories && (
                <ul>
                  
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.slug}>
                      {subcategory.name}
                      {subcategory.immediate_categories && (
                        <ul>
                          {subcategory.immediate_categories.map((immediateCategory) => (
                            <li key={immediateCategory.slug}>{immediateCategory.name}</li>
                          ))}
                        </ul>,
                        console.log(category.cat)
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
