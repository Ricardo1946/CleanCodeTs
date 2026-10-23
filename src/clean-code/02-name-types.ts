(() => {

    // Array of temperatures in Celsius
    const temperaturesCelsius = [33.6, 12.34];

    // Server IP address
    const serverIp = '123.123.123.123';

    // List of users
    const users = [{ id: 1, email: 'ricardog1946@gmail.com' }, { id: 2, email: 'gracia05@gmail.com' }];

    // List of user emails
    const userEmails = users.map( user => user.email );

    // Boolean variables in the video game
    const canJump = false;
    const canRun = true;
    const hasItems = true;
    const isLoading = false;


    // Initial time
    const startTime = new Date().getTime();

    // Elapsed time
    const elapsedTime = new Date().getTime() - startTime;

    // Functions
    // Get books
    function getBooks() {
        throw new Error ('Function not implemented.');
    }

    // Get books from a URL
    function getBooksByUrl( url: string ) {
        throw new Error(`Function not implemented. ${ url }`);
    }

    // Get the area of a square based on its side
    function getSquareArea( side: number ): number {
        return side * side;
    }

    // Print whether the job is active
    function printJobIsActive() {
        throw new Error('Function not implemented.');
    }

})();
