(() => {
    // Aplicando el principio de responsabilidad única (SRP)
    // Cada clase tiene una sola razón para cambiar.

    interface OrderItem {
        name     : string;
        price    : number;
        quantity : number;
    }

    // Responsabilidad: guardar los datos del pedido
    class Order {
        public items: OrderItem[] = [];

        constructor( public customerEmail: string ) {}

        addItem( item: OrderItem ) {
            this.items.push( item );
        }
    }

    // Responsabilidad: reglas de cálculo (si cambia el IVA, solo se toca esta clase)
    class OrderCalculator {
        private readonly taxRate = 0.21;

        getTotal( order: Order ): number {
            const subtotal = order.items.reduce( ( total, item ) => total + item.price * item.quantity, 0 );
            return subtotal + subtotal * this.taxRate;
        }
    }

    // Responsabilidad: persistencia
    class OrderRepository {
        save( order: Order ) {
            console.log('INSERT INTO orders ...', order.items);
        }
    }

    // Responsabilidad: notificar al cliente
    class EmailNotifier {
        sendOrderConfirmation( email: string, total: number ) {
            console.log(`Enviando correo a ${ email }: total ${ total }`);
        }
    }

    // Responsabilidad: formato del ticket
    class ReceiptPrinter {
        print( order: Order, total: number ) {
            order.items.forEach( item => console.log(`${ item.quantity } x ${ item.name } .... ${ item.price }`) );
            console.log(`TOTAL: ${ total }`);
        }
    }


    const order = new Order('ricardo@gmail.com');
    order.addItem({ name: 'Café', price: 1.5, quantity: 2 });
    order.addItem({ name: 'Croissant', price: 2, quantity: 1 });

    const total = new OrderCalculator().getTotal( order );

    new OrderRepository().save( order );
    new EmailNotifier().sendOrderConfirmation( order.customerEmail, total );
    new ReceiptPrinter().print( order, total );

})()
