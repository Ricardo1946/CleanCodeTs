(() => {
    //No aplicando el  principio de responsabilidad unica 
    type Gender = 'M'|'F'; 

    interface PersonProps {
        birthdate: Date; 
        gender: Gender;
        name: string; 
    }

    class Person {
        public birthdate: Date; 
        public gender: Gender; 
        public name: string; 
        
        constructor({ name, birthdate, gender}: PersonProps ){
            this.name = name; 
            this.gender = gender; 
            this.birthdate = birthdate;
        }
    }

    interface UserProps {
        birthdate: Date; 
        email: string;
        gender: Gender;
        name: string; 
        role: string; 
    }

    class User extends Person {
        public email: string; 
        public role: string; 
        public lastAcces: Date; 


        constructor({
            birthdate,
            email,
            gender,
            name,
            role,
        }: UserProps) {
            super({name, gender, birthdate }); 
            this.lastAcces = new Date();
            this.email = email; 
            this.role = role; 
        }
    }

    interface UserSettingsProps {
        birthdate: Date; 
        email: string; 
        gender: Gender; 
        lastOpenFolder: string; 
        name: string; 
        role: string; 
        workingDirectory: string; 
    }

    class UserSettings extends User{
        public workingDirectory: string; 
        public lastOpenFolder: string; 

        constructor({
            workingDirectory,
            lastOpenFolder,
            email,
            role,
            name,
            gender,
            birthdate,

        }: UserSettingsProps) {
            super({ email, role, name, gender, birthdate }); 
            this.workingDirectory = workingDirectory;
            this.lastOpenFolder = lastOpenFolder;
        }
    }

    const userSettings = new UserSettings({
        birthdate: new Date('1992-12-12'),
        email: 'davidR@gmail.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'David',
        role: 'Admin',
        workingDirectory: '/user/home',
    });

    console.log({ userSettings });

})(); 