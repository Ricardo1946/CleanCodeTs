(() => {
    // No aplicando el principio abierto/cerrado (OCP)
    // Ejemplo: pagar una compra con distintos métodos de pago

    // Cerrado a extensión:
    // Cada método nuevo (Bizum, Apple Pay...) obliga a MODIFICAR PaymentProcessor
    // y su switch, con el riesgo de romper lo que ya funcionaba.

    type PaymentType = 'card' | 'paypal' | 'transfer';

    class PaymentProcessor {
        pay( type: PaymentType, amount: number ): string {
            switch ( type ) {
                case 'card':
                    return `Cobrando ${ amount } con tarjeta (comisión 1%: ${ amount * 0.01 })`;
                case 'paypal':
                    return `Redirigiendo a PayPal para cobrar ${ amount }`;
                case 'transfer':
                    return `Mostrando IBAN para transferir ${ amount }`;
                default:
                    throw new Error(`Método de pago no soportado: ${ type }`);
            }
        }
    }


    const paymentProcessor = new PaymentProcessor();
    console.log( paymentProcessor.pay('card', 50) );
    console.log( paymentProcessor.pay('paypal', 20) );

})()
