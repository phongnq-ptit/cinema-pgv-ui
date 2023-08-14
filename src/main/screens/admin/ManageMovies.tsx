import React, {useEffect} from 'react';
import useCategoryApi from '../../hooks/apis/useCategoryApi';

const ManageMovies = () => {
  const {getListCategories} = useCategoryApi();

  useEffect(() => {
    getListCategories()
      .then((response) => {
        console.log('category', response);
      })
      .catch((e) => {});
  }, []);
  return <div>ManageMovies</div>;
};

export default ManageMovies;
