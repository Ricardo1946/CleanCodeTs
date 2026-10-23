# Clean Code y Principios SOLID

Proyecto de práctica en **TypeScript + Vite** con ejercicios de Clean Code, code smells y principios SOLID.

Cada ejercicio es un archivo independiente envuelto en una IIFE `(() => { ... })()`, así los tipos y clases de un archivo no chocan con los de otro. El resultado se ve en la **consola del navegador**.

## Instalación y ejecución

```
yarn install

npm install
```

```
yarn dev
ó
npm run dev
```

Abrir la URL que muestra Vite y revisar la consola de JavaScript (F12).

### Elegir qué ejercicio ejecutar

En [`src/main.ts`](src/main.ts) están todos los ejercicios importados y comentados. Descomenta el que quieras ver y comenta el resto:

```ts
// import './clean-code/03-fuctions';
import './clean-code/04-homework';      // 👈 activo
// import './code-smells/03-srp-multiple-responsibilities';
```

## Estructura

```
src/
├── main.ts          # Punto de entrada: elige qué ejercicio se ejecuta
├── clean-code/      # Nombres, funciones, DRY y clases
└── code-smells/     # STUPID (singleton, acoplamiento) y principios SOLID
```

## 1. Clean Code — `src/clean-code/`

| Archivo | Tema | Qué se practica |
|---|---|---|
| `01-names.ts` | Nombres significativos | Nombres pronunciables y que expresan intención; evitar prefijos como `I`, `Abstract`, `Impl` |
| `02-name-types.ts` | Nombres según el tipo | Arrays en plural, booleanos con `is/has/can`, funciones con verbo |
| `03-fuctions.ts` | Funciones | Pocos parámetros (objeto como argumento), retornos tempranos, una sola tarea |
| `04-homework.ts` | Tarea | Simplificar condicionales con `includes`, `Record` y *guard clauses* |
| `05-dry.ts` | DRY | *Don't Repeat Yourself*: validación genérica en lugar de código repetido |
| `06-classes-a.ts` | Clases (❌) | Herencia en cadena y constructores con muchos parámetros posicionales |
| `06-classes-b.ts` | Clases (⚠️) | Constructores con objetos de props, pero aún con herencia |
| `06-classes-c.ts` | Clases (✅) | Responsabilidad única y **composición sobre herencia** |
| `07-tarea.ts` | Tarea | Aplicar composición a un `InputElement` |

## 2. Code Smells y SOLID — `src/code-smells/`

Los ejercicios vienen en **pares con el mismo número**. El nombre del archivo describe el estado del código:
el primero muestra el problema ❌ y el segundo la solución ✅.

### STUPID

| # | ❌ Problema | ✅ Solución | Concepto |
|---|---|---|---|
| 01 | `01-singleton.js` | — | Singleton: una única instancia global, difícil de probar y de reemplazar |
| 02 | `02-high-coupling.ts` | `02-low-coupling.ts` | Alto acoplamiento por herencia → bajo acoplamiento por composición |

### SOLID

| # | Principio | ❌ Problema | ✅ Solución | Ejemplo |
|---|---|---|---|---|
| 03 | **S** – Responsabilidad única | `03-srp-multiple-responsibilities.ts` | `03-srp-single-responsibility.ts` | Pedido de cafetería: calcular, guardar, notificar e imprimir separados en clases |
| 04 | **O** – Abierto/Cerrado | `04-ocp-closed-to-extension.ts` | `04-ocp-open-to-extension.ts` | Métodos de pago: agregar Bizum sin tocar el `PaymentProcessor` |
| 05 | **L** – Sustitución de Liskov | `05-lsp-broken-substitution.ts` | `05-lsp-valid-substitution.ts` | Cuentas bancarias: un plazo fijo no puede comportarse como cuenta con retiros |
| 06 | **I** – Segregación de interfaces | `06-isp-fat-interface.ts` | `06-isp-segregated-interfaces.ts` | Casa inteligente: una bombilla no debe implementar `playMusic()` |
| 07 | **D** – Inversión de dependencias | `07-dip-concrete-dependency.ts` | `07-dip-abstract-dependency.ts` | Registro de gastos: depender de `ExpenseRepository`, no de `localStorage` |

### Resumen de los principios

- **S — Single Responsibility:** una clase debe tener una sola razón para cambiar.
- **O — Open/Closed:** abierto a extensión, cerrado a modificación. Se agregan clases nuevas en lugar de editar `switch`/`if`.
- **L — Liskov Substitution:** una subclase debe poder usarse donde se espera su clase base sin romper el programa.
- **I — Interface Segregation:** muchas interfaces pequeñas y específicas son mejores que una grande.
- **D — Dependency Inversion:** depender de abstracciones (interfaces) y recibir las dependencias por constructor.

## Cómo estudiar cada par

1. Ejecuta el archivo ❌ y observa el problema (errores en consola, `switch` que crece, clases que hacen de todo).
2. Intenta refactorizarlo por tu cuenta.
3. Compara con el archivo ✅.

## Comprobar tipos

```
npx tsc --noEmit
```
