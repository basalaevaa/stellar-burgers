import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  orderBurger,
  resetOrderState,
  setOrderLoading
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: useSelector((state: RootState) => state.burgerConstructor.bun),
    ingredients: useSelector(
      (state: RootState) => state.burgerConstructor.ingredients
    )
  };

  const orderRequest = useSelector(
    (state: RootState) => state.orders.orderLoading
  );

  const orderModalData = useSelector(
    (state: RootState) => state.orders.userOrder
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthVerified
  );

  const fullIngredientList = useMemo(() => {
    const ingredientIds = constructorItems.ingredients.map((i) => i._id);
    if (constructorItems.bun) {
      return [
        constructorItems.bun._id,
        ...ingredientIds,
        constructorItems.bun._id
      ];
    }
    return ingredientIds;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun) {
      alert('Пожалуйста, добавьте булочки в заказ');
      return;
    }
    if (orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(orderBurger(fullIngredientList));
    dispatch(setOrderLoading(true));
  };

  const closeOrderModal = () => dispatch(resetOrderState());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
