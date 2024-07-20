import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch, RootState } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);
  const isLoading = useSelector((state: RootState) => state.feed.isLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
