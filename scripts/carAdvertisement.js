import {Advertisement}  from "./advertisement.js";

export default class Car_Advertisement extends Advertisement{
    constructor(id, title, transactionType, description, price, numDoors, numKM, numPotencia)
    {
        super(id, title, transactionType, description, price);
        this.numDoors = numDoors;
        this.numKM = numKM;
        this.numPotencia = numPotencia;
    }

    SaveAdvertisement(storageName)
    {
        var advertisementsArray = Car_Advertisement.GetAdvertisements(storageName);

        Car_Advertisement.AddAdvertisementToArray(advertisementsArray, this);

        Car_Advertisement.SaveAdvertisements(advertisementsArray, storageName);
    }

    static SaveAdvertisements(advertisements, storageName)
    {
        localStorage.setItem(storageName, JSON.stringify(advertisements));
    }

    static GetAdvertisements(storageName)
    {
        return JSON.parse(localStorage.getItem(storageName) || "[]");
    }

    static AddAdvertisementToArray(advertisementsArray, newAdvertisement)
    {
        if(advertisementsArray.length > 0)
        {
            for(var i = 0; i < advertisementsArray.length; i++)
            {
                if(advertisementsArray[i].id == newAdvertisement.id)
                {
                    advertisementsArray[i] = newAdvertisement;
                    return;
                }
            }

            advertisementsArray.push(newAdvertisement);
        }
        else
        {
            advertisementsArray.push(newAdvertisement);
        }
    }

    static GetNewId(storageName)
    {
        var advertisements = this.GetAdvertisements(storageName);
        var newId = 0;
        advertisements.forEach(element => {
            if(newId <= element.id)
            {
                newId = parseInt(element.id) + 1;
            }
        });
    
        return newId;
    }

    static NewRowFromAdvertisement(advertisement)
    {
        var element = document.createElement('tr');
        var html = '<td>' + advertisement.id + '</td>';
        html += '<td>' + advertisement.title + '</td>';
        html += '<td>' + advertisement.transactionType + '</td>';
        html += '<td>' + advertisement.description + '</td>';
        html += '<td>' + advertisement.price + '</td>';
        html += '<td>' + advertisement.numDoors + '</td>';
        html += '<td>' + advertisement.numKM + '</td>';
        html += '<td>' + advertisement.numPotencia + '</td>';
        element.innerHTML = html.trim();
        element.dataset.id = advertisement.id;

        return element;
    }

    static GetAdvertisementById(id, storageName)
    {
        var returnValue;
        var advertisement = Car_Advertisement.GetAdvertisements(storageName);

        advertisement.forEach(element => {
            if(element.id == parseInt(id, 10))
            {
                returnValue = element;
            }
        });

        return returnValue;
    }

    static RemoveAdvertisementById(id, storageName)
    {
        var advertisements = Car_Advertisement.GetAdvertisements(storageName);

        for(var i = 0; i < advertisements.length; i++)
        {
            if(advertisements[i].id == parseInt(id, 10))
            {
                advertisements.splice(i, 1);
            }
        }

        Car_Advertisement.SaveAdvertisements(advertisements, storageName);
    }
}