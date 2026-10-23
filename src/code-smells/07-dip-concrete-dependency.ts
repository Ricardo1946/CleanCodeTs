(() => {
    // No aplicando el principio de inversión de dependencias (DIP)
    // Ejemplo: una app para registrar gastos personales

    // Dependencia concreta:
    // ExpenseTracker (lógica de negocio) crea y depende de LocalStorageDatabase.
    // Cambiar a una API, o usar memoria para pruebas, obliga a modificar ExpenseTracker.

    interface Expense {
        concept : string;
        amount  : number;
    }

    class LocalStorageDatabase {
        private readonly key = 'expenses';

        getAll(): Expense[] {
            return JSON.parse( localStorage.getItem( this.key ) ?? '[]' );
        }

        save( expenses: Expense[] ) {
            localStorage.setItem( this.key, JSON.stringify( expenses ) );
        }
    }

    class ExpenseTracker {
        private database = new LocalStorageDatabase(); // 👈 alto acoplamiento

        addExpense( expense: Expense ) {
            const expenses = this.database.getAll();
            this.database.save([ ...expenses, expense ]);
        }

        getMonthlyTotal(): number {
            return this.database.getAll().reduce( ( total, expense ) => total + expense.amount, 0 );
        }
    }


    const expenseTracker = new ExpenseTracker();
    expenseTracker.addExpense({ concept: 'Supermercado', amount: 65.4 });
    expenseTracker.addExpense({ concept: 'Gasolina', amount: 50 });

    console.log({ monthlyTotal: expenseTracker.getMonthlyTotal() });

})()
