import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { loadIngredients } from '../../services/slices/ingredientSlice';
import { verifyUserAuth } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(verifyUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute element={<Login />} requiresAuth={false} />
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute element={<Register />} requiresAuth={false} />
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute
                element={<ForgotPassword />}
                requiresAuth={false}
              />
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute
                element={<ResetPassword />}
                requiresAuth={false}
              />
            }
          />
          <Route
            path='/profile'
            element={<ProtectedRoute element={<Profile />} requiresAuth />}
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute element={<ProfileOrders />} requiresAuth />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute element={<ProfileOrders />} requiresAuth />
            }
          />
          <Route path='/feed/:number' element={<Feed />} />
          <Route path='/ingredients/:id' element={<ConstructorPage />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        <Routes>
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
