import Car_Advertisement from "./carAdvertisement.js";

window.addEventListener("load", function(e)
{
    UpdateAdvertisementsTable();
})

document.querySelector("#advertisementForm").addEventListener("submit", async function(e)
{
    e.preventDefault();
    
    const advertisement = ReadFromData();
    
    await advertisement.SaveAdvertisement();
    
    UpdateAdvertisementsTable();
});

document.getElementById("modifyButton").addEventListener("click", async function(e)
{
    const advertisement = ReadFromData();
    
    await advertisement.ModifyAdvertisement();
    
    UpdateAdvertisementsTable();
});

document.getElementById("deleteButton").addEventListener("click", async function(e) {
    if(document.getElementById("advertisementForm").getAttribute("data-id") != null)
    {
        await Car_Advertisement.RemoveAdvertisementById(document.getElementById("advertisementForm").getAttribute("data-id"));

        UpdateAdvertisementsTable();

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
    var newTitle = document.getElementById("title").value;
    var transactionType = document.querySelector('input[name="transactionType"]:checked').value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var numDoors = document.getElementById("numDoors").value;
    var numKM = document.getElementById("numKM").value;
    var numPotencia = document.getElementById("numPotencia").value;

    var advertisement = new Car_Advertisement(newTitle, transactionType, description, price, numDoors, numKM, numPotencia);
    
    if(document.getElementById('advertisementForm').getAttribute('data-id') != null)
    {
        advertisement.id = document.getElementById("advertisementForm").getAttribute("data-id");
    }

    return advertisement;
}

async function UpdateAdvertisementsTable()
{
    ShowLoader();
    let anuncios = await Car_Advertisement.GetAdvertisements();
    PopulateTable(anuncios);
    RemoveLoader();
}

function PopulateTable(advertisementsArray)
{
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

async function SelectRow(row)
{
    DeselectAllRows();
    ShowControls();

    row.classList.add("selectedRow");

    var advertisement = await Car_Advertisement.GetAdvertisementById(row.dataset.id);

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