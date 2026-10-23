(() => {
    // Aplicando el principio de inversión de dependencias (DIP)
    // Alto nivel (ExpenseTracker) y bajo nivel (almacenamiento) dependen de una abstracción
    // (ExpenseRepository). La dependencia se inyecta por constructor.

    interface Expense {
        concept : string;
        amount  : number;
    }

    interface ExpenseRepository {
        getAll()                    : Expense[];
        save( expenses: Expense[] ) : void;
    }

    class LocalStorageExpenseRepository implements ExpenseRepository {
        private readonly key = 'expenses';

        getAll(): Expense[] {
            return JSON.parse( localStorage.getItem( this.key ) ?? '[]' );
        }

        save( expenses: Expense[] ) {
            localStorage.setItem( this.key, JSON.stringify( expenses ) );
        }
    }

    // Ideal para pruebas: no toca el navegador
    class InMemoryExpenseRepository implements ExpenseRepository {
        private expenses: Expense[] = [];

        getAll(): Expense[] {
            return [ ...this.expenses ];
        }

        save( expenses: Expense[] ) {
            this.expenses = expenses;
        }
    }

    class ExpenseTracker {
        constructor( private repository: ExpenseRepository ) {}

        addExpense( expense: Expense ) {
            const expenses = this.repository.getAll();
            this.repository.save([ ...expenses, expense ]);
        }

        getMonthlyTotal(): number {
            return this.repository.getAll().reduce( ( total, expense ) => total + expense.amount, 0 );
        }
    }


    // Misma lógica de negocio, distinto almacenamiento, sin modificar ExpenseTracker
    const browserTracker = new ExpenseTracker( new LocalStorageExpenseRepository() );
    const testTracker    = new ExpenseTracker( new InMemoryExpenseRepository() );

    [ browserTracker, testTracker ].forEach( tracker => {
        tracker.addExpense({ concept: 'Supermercado', amount: 65.4 });
        tracker.addExpense({ concept: 'Gasolina', amount: 50 });
    });

    console.log({
        browserTotal : browserTracker.getMonthlyTotal(),
        testTotal    : testTracker.getMonthlyTotal(),
    });

})()
