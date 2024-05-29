var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var localStorageData ='data';
var siteInfo = JSON.parse(localStorage.getItem(localStorageData)) || [];
if(JSON.parse(localStorage.getItem(localStorageData))){
    displaySiteStructure();
}
var addBtn = document.getElementById("addSite");
addBtn.addEventListener('click', getSiteData);
// function to catch the data of the site from the inputs
function getSiteData(){
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }
    siteInfo.push(site);
    // store the data of the site in the localStorage
    localStorage.setItem(localStorageData, JSON.stringify(siteInfo));
    displaySiteStructure();
    clearInput();
    // removing validation from inputs after adding the book mark
    removeValidation();
    // return the disabled attribute to the submit button after adding the book mark
    addBtn.setAttribute('disabled', 'disabled');
}
// function to clear form inputs
function clearInput(){
    siteNameInput.value = '';
    siteUrlInput.value = '';
}
// function to display the book mark data
function displaySiteStructure(){
    var siteStructure = '';
    for(var i = 0; i < siteInfo.length; i++){
        siteStructure += 
        ` 
        <tr>
            <th scope="row">${i+1}</th>
            <td>${siteInfo[i].name}</td>
            <td><button class="btn btn-see"><a class="text-decoration-none text-white" href="${siteInfo[i].url}" target="_blanck"><i class="fa-regular fa-eye"></i> visit</a></button></td>
            <td><button id="deleteBtn" onclick="confirmDelete()" class="delete-site btn btn-danger px-4" data-target="delete" data-index="${i}"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("sitePlace").innerHTML = siteStructure;
    reattachEventListeners();
}
// function to delete the book mark data
function deleteData(index){
    siteInfo.splice(index, 1);
    // deleting the data from the localStorage so it won't be back when refresh
    localStorage.setItem(localStorageData, JSON.stringify(siteInfo));
    displaySiteStructure();
}

// function to reattach the event for the delete button 
function reattachEventListeners() {
    var deleteBtns = Array.from(document.querySelectorAll(".delete-site"));
    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => confirmDelete(index));
    });
}

var inputs = Array.from(document.querySelectorAll('.form-control'));
for(var i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('input', function(){
        validateInputsValue(this)
    })
}

// Function to validate input fields
function validateInputsValue(element){
    var regex ={
        siteName: /^[A-Za-z\u0600-\u06FF\s]{3,50}$/,
        siteUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    // checking whether the input's values is valid or not
    if(regex[element.id].test(element.value)){
        // if it's valid add the class is-valid and remove the is-invalid
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }else{
        // if it's not valid then add the class is-invalid and remove the is-valid
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        return false;
    }
}
// Function to remove validate input fields
function removeValidation(){
    for(var i = 0; i < inputs.length; i++){
        inputs[i].classList.remove('is-valid');
    }
}
// Attach event listener to the input fields for validation
siteNameInput.addEventListener('input', validateInputFields);
siteUrlInput.addEventListener('input', validateInputFields);

// Function to validate input fields and enable/disable the submit button accordingly
function validateInputFields() {
    if (validateInputsValue(siteNameInput) && validateInputsValue(siteUrlInput)) {
        // If both input fields are valid, remove the disabled attribute from the submit button
        addBtn.removeAttribute('disabled');
    } else {
        // If any input field is invalid, add the disabled attribute to the submit button
        addBtn.setAttribute('disabled', 'disabled');
    }
}

addBtn.addEventListener('click', showAlert);
function showAlert() {
    Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
}


function confirmDelete(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteData(index);
            Swal.fire(
                'Deleted!',
                'Your bookmark has been deleted.',
                'success'
            );
        }
    });
}

