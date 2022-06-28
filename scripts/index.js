import Car_Advertisement from "./carAdvertisement.js";

window.addEventListener("load", function(e)
{
    LoadAdvertisements();
});

async function LoadAdvertisements()
{
    ShowLoader();
    var advertisementsArray = await Car_Advertisement.GetAdvertisements();

    var html = '';
    
    advertisementsArray.forEach(element => {
        var row = NewDivFromAdvertisement(element);
        html += row.outerHTML;
    });

    document.getElementsByClassName("anunciosCarousel")[0].innerHTML = html;

    RemoveLoader();
}

function NewDivFromAdvertisement(advertisement)
{
    var element = document.createElement('div');
    element.classList.add("anuncio");
    var html = '<h2>' + advertisement.title + '</h2>';
    html += '<h4>' + advertisement.description + '</h4>';
    html += '<p class="price">' + advertisement.price + '</p>';

    html += '<div class="info">';
    html += '<div><img src="/assets/car-door.png">' + advertisement.numDoors + '</div>';
    html += '<div><img src="/assets/km.png">' + advertisement.numKM + '</div>';
    html += '<div><img src="/assets/engine.png">' + advertisement.numPotencia + '</div>';
    html += '</div>';

    html += '<button type="button">Ver Vehiculo</button>';

    element.innerHTML = html.trim();

    return element;
}

function ShowLoader()
{
    document.getElementById("loadingSpinner").classList.remove("hidden");
}

function RemoveLoader()
{
    document.getElementById("loadingSpinner").classList.add("hidden");
}