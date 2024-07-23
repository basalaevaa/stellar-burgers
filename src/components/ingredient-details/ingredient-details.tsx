import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, RootState } from '../../services/store';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Modal } from '@components';
import modalStyles from '../ui/modal/modal.module.css';
import style from '../ui/ingredient-details/ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredientsLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
  );

  if (ingredientsLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div>
        <p>Ингредиент не найден</p>
        <button onClick={() => navigate('/')}>Вернуться на главную</button>
      </div>
    );
  }

  const handleClose = () => {
    if (location.state && location.state.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const isModal = location.state && location.state.background;

  return isModal ? (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  ) : (
    <div className={style.centerContent}>
      <h1 className={style.centerHeading}>Детали ингредиента</h1>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
