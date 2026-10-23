(() => {
    // No aplicando el principio de sustitución de Liskov (LSP)
    // Ejemplo: cuentas bancarias

    // Sustitución rota:
    // Un plazo fijo "es una" cuenta, pero NO permite retirar antes del vencimiento.
    // Si se usa donde se espera una BankAccount, el programa explota.

    class BankAccount {
        constructor( protected balance: number = 0 ) {}

        deposit( amount: number ) {
            this.balance += amount;
        }

        withdraw( amount: number ) {
            if ( amount > this.balance ) throw new Error('Saldo insuficiente');
            this.balance -= amount;
        }

        getBalance(): number {
            return this.balance;
        }
    }

    class SavingsAccount extends BankAccount {}

    class FixedTermDeposit extends BankAccount {
        withdraw( _amount: number ) {
            throw new Error('No se puede retirar de un plazo fijo antes del vencimiento');
        }
    }

    // Esta función confía en que cualquier BankAccount permite retirar
    function payRent( account: BankAccount, rent: number ) {
        account.withdraw( rent );
        console.log(`Alquiler pagado. Saldo: ${ account.getBalance() }`);
    }


    const accounts: BankAccount[] = [
        new SavingsAccount( 2000 ),
        new FixedTermDeposit( 5000 ),
    ];

    accounts.forEach( account => {
        try {
            payRent( account, 800 );
        } catch ( error ) {
            console.log(`💥 ${ account.constructor.name }: ${ ( error as Error ).message }`);
        }
    });

})()
