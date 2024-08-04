import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, ...rest }) => {
    const dispatch = useDispatch();

    const handleMove = (direction: 'up' | 'down') => {
      dispatch(moveIngredient({ index, direction }));
    };

    const handleClose = () => {
      dispatch(removeIngredient({ id: ingredient.id }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMove('up')}
        handleMoveDown={() => handleMove('down')}
        handleClose={handleClose}
        {...rest}
      />
    );
  }
);
