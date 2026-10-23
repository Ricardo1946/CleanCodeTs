(() => {
    // Aplicando el principio de segregación de interfaces (ISP)
    // Ningún cliente debe depender de métodos que no usa: interfaces pequeñas y combinables.

    interface Switchable {
        turnOn() : void;
        turnOff(): void;
    }

    interface Dimmable {
        setBrightness( level: number ): void;
    }

    interface TemperatureControl {
        setTemperature( degrees: number ): void;
    }

    interface MusicPlayer {
        playMusic( song: string ): void;
    }

    class SmartBulb implements Switchable, Dimmable {
        turnOn()  { console.log('Bombilla encendida'); }
        turnOff() { console.log('Bombilla apagada'); }
        setBrightness( level: number ) { console.log(`Brillo al ${ level }%`); }
    }

    class Thermostat implements Switchable, TemperatureControl {
        turnOn()  { console.log('Termostato encendido'); }
        turnOff() { console.log('Termostato apagado'); }
        setTemperature( degrees: number ) { console.log(`Temperatura a ${ degrees }°C`); }
    }

    // Un altavoz con luz LED combina varias interfaces
    class SmartSpeakerWithLight implements Switchable, MusicPlayer, Dimmable {
        turnOn()  { console.log('Altavoz encendido'); }
        turnOff() { console.log('Altavoz apagado'); }
        playMusic( song: string ) { console.log(`Reproduciendo: ${ song }`); }
        setBrightness( level: number ) { console.log(`Luz del altavoz al ${ level }%`); }
    }

    // "Modo noche": solo recibe lo que se puede atenuar, sin try/catch
    function nightMode( lights: Dimmable[] ) {
        lights.forEach( light => light.setBrightness( 10 ) );
    }

    function leaveHome( devices: Switchable[] ) {
        devices.forEach( device => device.turnOff() );
    }


    const bulb       = new SmartBulb();
    const thermostat = new Thermostat();
    const speaker    = new SmartSpeakerWithLight();

    nightMode([ bulb, speaker ]);
    thermostat.setTemperature( 19 );
    speaker.playMusic('Lo-fi para dormir');
    leaveHome([ bulb, thermostat, speaker ]);

})()
