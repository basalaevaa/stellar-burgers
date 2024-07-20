import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { getOrders } from '../../services/slices/userSlice';
import { getFeeds } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.user.userOrderHistory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFeeds());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
