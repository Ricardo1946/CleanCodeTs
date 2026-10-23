(() => {
    // Aplicando el principio abierto/cerrado (OCP)
    // Abierto a extensión (nuevas clases), cerrado a modificación (PaymentProcessor no se toca).

    interface PaymentMethod {
        pay( amount: number ): string;
    }

    class CardPayment implements PaymentMethod {
        private readonly feeRate = 0.01;

        pay( amount: number ): string {
            return `Cobrando ${ amount } con tarjeta (comisión 1%: ${ amount * this.feeRate })`;
        }
    }

    class PaypalPayment implements PaymentMethod {
        pay( amount: number ): string {
            return `Redirigiendo a PayPal para cobrar ${ amount }`;
        }
    }

    class TransferPayment implements PaymentMethod {
        pay( amount: number ): string {
            return `Mostrando IBAN para transferir ${ amount }`;
        }
    }

    // Nuevo método de pago: solo se AGREGA una clase
    class BizumPayment implements PaymentMethod {
        constructor( private phoneNumber: string ) {}

        pay( amount: number ): string {
            return `Enviando solicitud Bizum de ${ amount } al ${ this.phoneNumber }`;
        }
    }

    class PaymentProcessor {
        pay( method: PaymentMethod, amount: number ): string {
            return method.pay( amount );
        }
    }


    const paymentProcessor = new PaymentProcessor();
    console.log( paymentProcessor.pay( new CardPayment(), 50 ) );
    console.log( paymentProcessor.pay( new PaypalPayment(), 20 ) );
    console.log( paymentProcessor.pay( new TransferPayment(), 100 ) );
    console.log( paymentProcessor.pay( new BizumPayment('600123123'), 15 ) );

})()
