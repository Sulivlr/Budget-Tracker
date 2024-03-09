import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Tracker: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.categories.transactions);

  const totalAmount = transactions.reduce((total: number, transaction: { type: string; amount: number; }) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);

  return (
    <div>
      <h2>Main Page</h2>
      <h3>Total: {totalAmount} KGS</h3>
    </div>
  );
};

export default Tracker;
