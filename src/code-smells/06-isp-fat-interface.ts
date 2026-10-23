(() => {
    // No aplicando el principio de segregación de interfaces (ISP)
    // Ejemplo: dispositivos de una casa inteligente

    // Interfaz "gorda":
    // Obliga a cada dispositivo a implementar métodos que no tiene.
    // ¿Una bombilla que regula temperatura? ¿Un termostato que reproduce música?

    interface SmartDevice {
        turnOn()                        : void;
        turnOff()                       : void;
        setBrightness( level: number )  : void;
        setTemperature( degrees: number ): void;
        playMusic( song: string )       : void;
    }

    class SmartBulb implements SmartDevice {
        turnOn()  { console.log('Bombilla encendida'); }
        turnOff() { console.log('Bombilla apagada'); }
        setBrightness( level: number ) { console.log(`Brillo al ${ level }%`); }

        setTemperature( _degrees: number ) { throw new Error('Una bombilla no regula temperatura'); }
        playMusic( _song: string ) { throw new Error('Una bombilla no reproduce música'); }
    }

    class Thermostat implements SmartDevice {
        turnOn()  { console.log('Termostato encendido'); }
        turnOff() { console.log('Termostato apagado'); }
        setTemperature( degrees: number ) { console.log(`Temperatura a ${ degrees }°C`); }

        setBrightness( _level: number ) { throw new Error('Un termostato no tiene brillo'); }
        playMusic( _song: string ) { throw new Error('Un termostato no reproduce música'); }
    }

    class SmartSpeaker implements SmartDevice {
        turnOn()  { console.log('Altavoz encendido'); }
        turnOff() { console.log('Altavoz apagado'); }
        playMusic( song: string ) { console.log(`Reproduciendo: ${ song }`); }

        setBrightness( _level: number ) { throw new Error('Un altavoz no tiene brillo'); }
        setTemperature( _degrees: number ) { throw new Error('Un altavoz no regula temperatura'); }
    }


    const devices: SmartDevice[] = [ new SmartBulb(), new Thermostat(), new SmartSpeaker() ];

    // "Modo noche": el compilador lo permite, pero falla en ejecución
    devices.forEach( device => {
        try {
            device.setBrightness( 10 );
        } catch ( error ) {
            console.log(`💥 ${ ( error as Error ).message }`);
        }
    });

})()
