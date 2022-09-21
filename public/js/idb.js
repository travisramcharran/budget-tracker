let db;

const request = indexedDB.open('budget_tracker', 1);


request.onupgradeneeded = function(event) {

    const db = event.target.result;

    db.createObjectStore('new_moneymove', { autoIncrement: true })

}


request.onsuccess = function(event) {

    db.event.target.result;
    if (navigator.onLine) {

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