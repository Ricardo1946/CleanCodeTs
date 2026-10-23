(() => {
    // No aplicando el principio de responsabilidad única (SRP)
    // Ejemplo: un pedido en una cafetería

    // Múltiples responsabilidades:
    // OrderManager calcula, guarda, envía correos e imprime el ticket.
    // Tiene 4 razones para cambiar (impuestos, base de datos, proveedor de correo, formato del ticket).

    interface OrderItem {
        name     : string;
        price    : number;
        quantity : number;
    }

    class OrderManager {
        private items: OrderItem[] = [];

        constructor( private customerEmail: string ) {}

        addItem( item: OrderItem ) {
            this.items.push( item );
        }

        calculateTotal(): number {
            const subtotal = this.items.reduce( ( total, item ) => total + item.price * item.quantity, 0 );
            const taxes = subtotal * 0.21;
            return subtotal + taxes;
        }

        saveToDatabase() {
            console.log('INSERT INTO orders ...', this.items);
        }

        sendConfirmationEmail() {
            console.log(`Enviando correo a ${ this.customerEmail }: total ${ this.calculateTotal() }`);
        }

        printReceipt() {
            this.items.forEach( item => console.log(`${ item.quantity } x ${ item.name } .... ${ item.price }`) );
            console.log(`TOTAL: ${ this.calculateTotal() }`);
        }
    }


    const orderManager = new OrderManager('ricardo@gmail.com');
    orderManager.addItem({ name: 'Café', price: 1.5, quantity: 2 });
    orderManager.addItem({ name: 'Croissant', price: 2, quantity: 1 });

    orderManager.saveToDatabase();
    orderManager.sendConfirmationEmail();
    orderManager.printReceipt();

})()
