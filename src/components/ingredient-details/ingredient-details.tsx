import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, RootState } from '../../services/store';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Modal } from '@components';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.state && location.state.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
