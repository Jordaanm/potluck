import * as React from 'react';

type SelectProps = Partial<React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>>;

export const DishTypeSelect = (props: SelectProps) => {
  return (
    <select
      {...props}
    >
      <option value="appetizer">Appetizer</option>
      <option value="entree">Entree</option>
      <option value="main">Main</option>
      <option value="side">Side</option>
      <option value="salad">Salad</option>
      <option value="dessert">Dessert</option>
      <option value="drink">Drink</option>
    </select>
  );
};