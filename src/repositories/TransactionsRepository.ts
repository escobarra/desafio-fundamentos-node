import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((_total, transaction) => {
      if (transaction.type === 'income') return _total + transaction.value;
      return _total;
    }, 0);

    const outcome = this.transactions.reduce((_total, transaction) => {
      if (transaction.type === 'outcome') return _total + transaction.value;
      return _total;
    }, 0);

    const total: number = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
