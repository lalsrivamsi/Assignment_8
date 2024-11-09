// Fetch data based on ID from the search input field
document.getElementById('searchInput').addEventListener('input', function () {
    const id = this.value;
    const noMatchMessage = document.getElementById('noMatchMessage');
    const datagohere = document.getElementById('datagohere');
    
    if (id) {
        fetch(`/data/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    noMatchMessage.style.display = 'block';
                    datagohere.innerHTML = ''; // Clear the table body
                } else {
                    noMatchMessage.style.display = 'none';
                    // Assuming you want to display data in the table
                    datagohere.innerHTML = `
                        <tr>
                            <td><img src="${data.photo}" alt="Photo" width="50" height="50"></td>
                            <td>${data.name}</td>
                            <td>${data.mobile}</td>
                            <td>${data.vehicleCompanyAndModel}</td>
                            <td>${data.vehicleColor}</td>
                            <td>${data.vehicleNumber}</td>
                            <td>${data.parkingSlot}</td>
                            <td>${data.floor}</td>
                            <td>${new Date(data.entryDate).toLocaleDateString()}</td>
                            <td>${data.entryTime}</td>
                            <td>${new Date(data.exitDate).toLocaleDateString()}</td>
                            <td>${data.exitTime}</td>
                            <td>${data.duration}</td>
                            <td>${data.vehicleType}</td>
                            <td>${data.userType}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    `;
                }
            })
            .catch(() => {
                noMatchMessage.style.display = 'block';
                datagohere.innerHTML = ''; // Clear the table body
            });
    } else {
        noMatchMessage.style.display = 'none';
        datagohere.innerHTML = ''; // Clear the table body
    }
});
