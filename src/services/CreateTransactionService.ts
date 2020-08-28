import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// DTO
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    const balance = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && balance.total - transaction.value < 0)
      throw Error('Negative Balance');

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
