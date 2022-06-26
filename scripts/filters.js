import Car_Advertisement from "./carAdvertisement.js";

const URL = "http://localhost:3000/anuncios";

const filters = document.getElementsByClassName('filter');

const inputChange = function() {
    getAnunciosAjax(URL);
}

for(var i = 0; i < filters.length; i++)
{
    filters[i].addEventListener('change', inputChange, false);
}

window.addEventListener("load", function(e)
{
    getAnunciosAjax(URL);
});

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

const getAnunciosAjax = (url) => {
    EmptyTable();

    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
  
          console.log(data);

          setTimeout(PopulateTable.bind(null, data), 1500);
        } else {
          console.error(xhr.status, xhr.statusText);
        }
        setTimeout(RemoveLoader, 1500);
      } else {
        ShowLoader();
      }
    });
  
    xhr.open("GET", url);
  
    xhr.send();
};

function GenerateRowsFromAdvertisements(advertisementsArray)
{
    var newRows = '';
    
    advertisementsArray.forEach(element => {
        var row = Car_Advertisement.NewRowFromAdvertisement(element);
        // if(document.getElementById("advertisementForm").getAttribute("data-id") == element.id)
        // {
        //     row.classList.add("selectedRow");
        // }
        newRows += row.outerHTML;
    });

    return newRows;
}