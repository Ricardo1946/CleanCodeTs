(() => {
    // Aplicando el principio de sustitución de Liskov (LSP)
    // Toda subclase debe poder usarse donde se espera su clase base sin sorpresas.
    // Solo las cuentas que REALMENTE permiten retirar exponen withdraw().

    abstract class Account {
        constructor( protected balance: number = 0 ) {}

        deposit( amount: number ) {
            this.balance += amount;
        }

        getBalance(): number {
            return this.balance;
        }
    }

    abstract class WithdrawableAccount extends Account {
        withdraw( amount: number ) {
            if ( amount > this.balance ) throw new Error('Saldo insuficiente');
            this.balance -= amount;
        }
    }

    class SavingsAccount extends WithdrawableAccount {}

    class CheckingAccount extends WithdrawableAccount {}

    class FixedTermDeposit extends Account {
        constructor( balance: number, public maturityDate: Date ) {
            super( balance );
        }
    }

    // El tipo del parámetro garantiza que se puede retirar
    function payRent( account: WithdrawableAccount, rent: number ) {
        account.withdraw( rent );
        console.log(`Alquiler pagado. Saldo: ${ account.getBalance() }`);
    }


    const withdrawableAccounts: WithdrawableAccount[] = [
        new SavingsAccount( 2000 ),
        new CheckingAccount( 1200 ),
    ];

    withdrawableAccounts.forEach( account => payRent( account, 800 ) );

    // Todas siguen siendo Account y aceptan depósitos
    const allAccounts: Account[] = [
        ...withdrawableAccounts,
        new FixedTermDeposit( 5000, new Date('2027-01-01') ),
    ];

    allAccounts.forEach( account => account.deposit( 100 ) );
    console.log( allAccounts.map( account => account.getBalance() ) );

    // payRent( new FixedTermDeposit( 5000, new Date() ), 800 ); // ❌ Error de compilación, no de ejecución

})()
