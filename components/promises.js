const askPermission = () => {
    const newPromise = new Promise((resolve, reject) => {       // custom creating a Promise
        settimeout(() => {
            resolve (
                {
                    status: 'granted',
                    type: 'special permission',
                    id: 'aa1398h3'
                }
            );
        }, 3000);
    });
    return newPromise;
}

const presentLocalNotification = async () => {
    try {
        const permission = await askPermission();   // waits for promise to wait/reject, call askPermission (which is returning a promise)
        console.log(permission);                    // don't run until line 7 finished
        if (permission.status === 'granted') {
            console.log('We have permission!')
        }
    } catch (error) {   // if there's an error
        console.log(error);
        throw error;
    }
}

// Run
console.log('App starts');
console.log('Asking for permission, may take a while');

presentLocalNotification(); // promises don't block the code so next line will execute first

console.log('Sit tight');