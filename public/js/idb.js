let db;

const request = indexedDB.open('budget_tracker', 1);


request.onupgradeneeded = function(event) {
   
    const db = event.target.result;
   
    db.createObjectStore('new_moneymove', { autoIncrement: true })

}


request.onsuccess = function(event) {

    db.event.target.result;
    if (navigator.onLine) {
        uploadTransaction();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

function saveRecord(record) {
    const transaction = db.transaction(['new_moneymove'], 'readwrite');
    
    const budgetObjectStore = transaction.objectStore('new_moneymove');

    budgetObjectStore.add(record)
}


function uploadTransaction() {
    const transaction = db.transaction(['new_moneymove'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_moneymove');
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'applicaion/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }

                const transaction = db.transaction(['new_moneymove'], 'readwrite');
                const budgetObjectStore = transaction.objectStore('new_moneymove');
                budgetObjectStore.clear();
            })
            .catch(err => {
                console.log(err)
            });
        }
    };
}

window.addEventListener('online', uploadTransaction);