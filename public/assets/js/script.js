class Store {
    static getEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        return entries;
    }

    static updateEntries(entries) {
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}

class Main {
    static validateInputs() {
        const name = document.querySelector('#input-name').value;
        const mobile = document.querySelector('#input-mobile').value;
        const car = document.querySelector('#input-vname').value;
        const color = document.querySelector('#input-vcolor').value;
        const licensePlate = document.querySelector('#input-vnumber').value;
        const parkingSlot = document.querySelector('#input-pslot').value;
        const parkingFloor = document.querySelector('#input-floor').value;
        const entryDate = document.querySelector('#input-entry').value;
        const entryTime = document.querySelector('#input-entry-time').value;
        const exitDate = document.querySelector('#input-exit').value;
        const vehicleType = document.querySelector('#input-vehicletype').value;
        const type = document.querySelector('#input-type').value;
        const photo = document.querySelector('#input-photo').files[0];

        const licensePlateRegex = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;

        if (!name || !mobile || !car || !color || !licensePlate || !parkingSlot || !parkingFloor || !entryDate || !entryTime || !exitDate || !vehicleType || !type || !photo) {
            alert('All fields must be filled, including a photo!');
            return false;
        }
        if (exitDate < entryDate) {
            alert('Exit Date cannot be earlier than Entry Date');
            return false;
        }
        if (!licensePlateRegex.test(licensePlate)) {
            alert('License Plate format is incorrect.');
            return false;
        }
        if (!/^\d{10}$/.test(mobile)) {
            alert('Mobile number must be 10 digits.');
            return false;
        }
        return true;
    }

    static handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        if (Main.validateInputs()) {
            const newEntry = {
                name: document.querySelector('#input-name').value,
                mobile: document.querySelector('#input-mobile').value,
                car: document.querySelector('#input-vname').value,
                color: document.querySelector('#input-vcolor').value,
                licensePlate: document.querySelector('#input-vnumber').value,
                parkingSlot: document.querySelector('#input-pslot').value,
                parkingFloor: document.querySelector('#input-floor').value,
                entryDate: document.querySelector('#input-entry').value,
                entryTime: document.querySelector('#input-entry-time').value,
                exitDate: document.querySelector('#input-exit').value,
                vehicleType: document.querySelector('#input-vehicletype').value,
                type: document.querySelector('#input-type').value,
                photo: URL.createObjectURL(document.querySelector('#input-photo').files[0]) // Convert to URL for preview
            };

            // Store the new entry
            const entries = Store.getEntries();
            entries.push(newEntry);
            Store.updateEntries(entries);

            // Clear form fields after submission
            document.getElementById('cf').reset();
            alert('Entry added successfully!'); // Notify user about the successful entry
        }
    }
}

// Event listener for the form submission
document.querySelector('#cf').addEventListener('submit', Main.handleFormSubmit);
