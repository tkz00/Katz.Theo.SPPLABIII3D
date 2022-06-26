import Car_Advertisement from "./carAdvertisement.js";

const storageName = "advertisements";

window.addEventListener("load", function(e)
{
    UpdateAdvertisementsTable(storageName);
})

document.querySelector("#advertisementForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const newAdvertisement = ReadFromData();
    
    newAdvertisement.SaveAdvertisement(storageName);
    
    UpdateAdvertisementsTable(storageName);
});

document.getElementById("modifyButton").addEventListener("click", function(e) {

    const newAdvertisement = ReadFromData();
    
    newAdvertisement.SaveAdvertisement(storageName);
    
    UpdateAdvertisementsTable(storageName);
});

document.getElementById("deleteButton").addEventListener("click", function(e) {
    if(document.getElementById("advertisementForm").getAttribute("data-id") != null)
    {
        Car_Advertisement.RemoveAdvertisementById(document.getElementById("advertisementForm").getAttribute("data-id"), storageName);

        UpdateAdvertisementsTable(storageName);

        EmptyForm();
    }
});

document.getElementById("cancelButton").addEventListener("click", function(e) {

    EmptyForm();

    DeselectAllRows();
});

function SetOnTrOnClickBehaviour()
{
    var elements = GetAllRows();

    elements.forEach(element => {
        element.addEventListener("click", function() {
            SelectRow(element);
        });
    });
}

function ReadFromData()
{
    var newId = document.getElementById("advertisementForm").getAttribute("data-id") != null ? document.getElementById("advertisementForm").getAttribute("data-id") : Car_Advertisement.GetNewId(storageName);
    var newTitle = document.getElementById("title").value;
    var transactionType = document.querySelector('input[name="transactionType"]:checked').value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var numDoors = document.getElementById("numDoors").value;
    var numKM = document.getElementById("numKM").value;
    var numPotencia = document.getElementById("numPotencia").value;

    return new Car_Advertisement(newId, newTitle, transactionType, description, price, numDoors, numKM, numPotencia);
}

function UpdateAdvertisementsTable(storageName)
{
    ShowLoader();

    setTimeout(RemoveLoader, 3000);

    var advertisementsArray = Car_Advertisement.GetAdvertisements(storageName);

    const table = document.getElementById("advertisementsTable");

    table.querySelector("tbody tr")?.remove();

    table.querySelector("tbody").innerHTML = GenerateRowsFromAdvertisements(advertisementsArray);

    SetOnTrOnClickBehaviour();

    DeselectAllRows();

    EmptyForm();
}

function GenerateRowsFromAdvertisements(advertisementsArray)
{
    var newRows = '';
    
    advertisementsArray.forEach(element => {
        var row = Car_Advertisement.NewRowFromAdvertisement(element);
        if(document.getElementById("advertisementForm").getAttribute("data-id") == element.id)
        {
            row.classList.add("selectedRow");
        }
        newRows += row.outerHTML;
    });

    return newRows;
}

function SelectRow(row)
{
    DeselectAllRows();

    row.classList.add("selectedRow");

    var advertisement = Car_Advertisement.GetAdvertisementById(row.dataset.id, storageName);

    document.getElementById("advertisementForm").dataset.id = advertisement.id;
    document.getElementById("title").value = advertisement.title;
    if(advertisement.transactionType == "venta")
    {
        document.getElementById("venta").checked = true;
    }
    else
    {
        document.getElementById("alquiler").checked = true;
    }
    document.getElementById("description").value = advertisement.description;
    document.getElementById("price").value = advertisement.price;
    document.getElementById("numDoors").value = advertisement.numDoors;
    document.getElementById("numKM").value = advertisement.numKM;
    document.getElementById("numPotencia").value = advertisement.numPotencia;

    ShowControls();
}

function DeselectAllRows()
{
    [].forEach.call(GetAllRows(), function(element) {
        element.classList.remove("selectedRow");
    });

    RemoveControls();
}

function GetAllRows()
{
    var rows = document.querySelectorAll("#advertisementsTable tbody tr");
    return rows;
}

function EmptyForm()
{
    // document.getElementById("advertisementForm").dataset.id = null;
    delete(document.getElementById("advertisementForm").dataset.id);
    document.getElementById("title").value = null;
    document.getElementById("venta").checked = false;
    document.getElementById("alquiler").checked = false;
    document.getElementById("description").value = null;
    document.getElementById("price").value = null;
    document.getElementById("numDoors").value = null;
    document.getElementById("numKM").value = null;
    document.getElementById("numPotencia").value = null;
}

function ShowLoader()
{
    document.getElementById("loadingSpinner").classList.remove("hidden");
    document.getElementsByClassName("anuncios")[0].classList.add("hidden");
}

function RemoveLoader()
{
    document.getElementById("loadingSpinner").classList.add("hidden");
    document.getElementsByClassName("anuncios")[0].classList.remove("hidden");
}

function ShowControls()
{
    document.getElementsByClassName("controls")[0].classList.remove("hidden");
}

function RemoveControls()
{
    document.getElementsByClassName("controls")[0].classList.add("hidden");
}