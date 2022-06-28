import Car_Advertisement from "./carAdvertisement.js";

const filters = document.getElementsByClassName('filter');

const inputChange = function()
{
  ShowAdvertisements();
}

for(var i = 0; i < filters.length; i++)
{
  filters[i].addEventListener('change', inputChange, false);
}

window.addEventListener("load", function(e)
{
  ShowAdvertisements();
});

async function ShowAdvertisements()
{
  EmptyTable();
  ShowLoader();
  ShowSelectedColumns();
  let advertisements = await GetAdvertisements();
  ShowAvg(advertisements);
  PopulateTable(advertisements);
  RemoveLoader();
}

async function GetAdvertisements()
{
    let advertisements = await Car_Advertisement.GetAdvertisements();
    let transactionType = document.getElementById("transactionTypeDropdown").value;
    if(transactionType != 'todos')
    {
      advertisements = advertisements.filter(anuncio => anuncio.transactionType == transactionType);
    }
    return advertisements;
}

function ShowAvg(advertisements)
{
  if(advertisements.length > 0)
  {
    let average = advertisements.reduce((total, advertisement) => parseInt(total) + parseInt(advertisement.price), 0) / advertisements.length;
    document.getElementById("avgPrice").value = average;
  }
  else
  {
    document.getElementById("avgPrice").value = 'N/A';
  }
}

function ShowSelectedColumns()
{
  document.querySelectorAll('input[type=checkbox]').forEach(element => {
    if(element.checked)
    {
      document.getElementById(element.value + '-col').classList.remove('hidden-col');
    }
    else
    {
      document.getElementById(element.value + '-col').classList.add('hidden-col');
    }
  });
}

function ShowLoader()
{
    document.getElementById("loadingSpinner").classList.remove("hidden");
}

function RemoveLoader()
{
    document.getElementById("loadingSpinner").classList.add("hidden");
}

function PopulateTable(advertisementsArray)
{
    const table = document.getElementById("advertisementsTable");

    table.querySelector("tbody").innerHTML = GenerateRowsFromAdvertisements(advertisementsArray);
}

function EmptyTable()
{
    const table = document.getElementById("advertisementsTable");
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(e => e.remove());
}

function GenerateRowsFromAdvertisements(advertisementsArray)
{
    var newRows = '';
    
    advertisementsArray.forEach(element => {
        var row = Car_Advertisement.NewRowFromAdvertisement(element);
        newRows += row.outerHTML;
    });

    return newRows;
}