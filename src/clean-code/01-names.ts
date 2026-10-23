(() => {
    // Ejemplo 
    // Archivos a evaluar  - files to evaluate 
    const filesToEvaluate = [
         { id: 1, flagged: false },
         { id: 2, flagged: false },
         { id: 3, flagged: true },
         { id: 4, flagged: false},
         { id: 5, flagged: true },
    ];

    const filesToDelete = filesToEvaluate.filter( file => file.flagged );

    //Malos 
    class AbstracUser { };
    class UserMixin { };
    class UserImplementation { };
    interface IUser { };

    //Mejor 
    class User { };
    interface User { };
    class Student { };
    interface Student { };

    //Todo : Tarea

    //dia trascurrido - elapsed timein days
    const elapsedTimeInDays: number = 23;

    // numero de archivos en un directorio - number of file in directory
    const numberOfFilesInDirectory = 33;

    // primer nombre - first name
    const firstName = 'David';

    // primer apellido - last name
    const lastName = 'Gracia';

    //dias desde la ultima modificacion - days since modification
    const daysSinceModification = 12;

    // cantidad maxima de clases por estudiante - max clases per students
    const maxClassesPerStudent = 6; 


  })();  