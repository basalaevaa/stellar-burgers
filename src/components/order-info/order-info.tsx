import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { Modal } from '@components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/orderSlice';
import style from '../ui/order-info/order-info.module.css';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ordersNumber = Number(number);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = useSelector((state: RootState) => state.orders.order);
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    dispatch(getOrderByNumber(ordersNumber));
  }, [dispatch, ordersNumber]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  const handleClose = () => {
    if (location.state && location.state.background) {
      navigate(-1);
    } else {
      navigate('/feed');
    }
  };

  const isModal = location.state && location.state.background;

  return isModal ? (
    <Modal title={`Заказ № ${orderInfo.number}`} onClose={handleClose}>
      <OrderInfoUI orderInfo={orderInfo} />
    </Modal>
  ) : (
    <div className={style.centerContent}>
      <h1 className={style.centerHeading}>Заказ № {orderInfo.number}</h1>
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};
