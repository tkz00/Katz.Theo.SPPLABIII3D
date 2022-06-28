import {Advertisement}  from "./advertisement.js";

const URL = "http://localhost:3000/anuncios";

export default class Car_Advertisement extends Advertisement{
    // constructor(id, title, transactionType, description, price, numDoors, numKM, numPotencia)
    // {
    //     super(id, title, transactionType, description, price);
    //     this.numDoors = numDoors;
    //     this.numKM = numKM;
    //     this.numPotencia = numPotencia;
    // }

    constructor(title, transactionType, description, price, numDoors, numKM, numPotencia)
    {
        super(title, transactionType, description, price);
        this.numDoors = numDoors;
        this.numKM = numKM;
        this.numPotencia = numPotencia;
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

    // The Save and Modify methods do not have a setTimeout since everytime they are executed the table is reloaded, and this action already has a setTimeout.
    SaveAdvertisement()
    {
        if(this.hasOwnProperty('id'))
        {
            delete this.id;
        }

        var data = JSON.stringify(this);

        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        const response = JSON.parse(xhr.responseText);
                        
                        // console.log(response);

                        res(response);
                    }
                    else
                    {
                        console.error(xhr.status, xhr.statusText);
                        rej("Error");
                    }
                }
            });
            
            xhr.open("POST", URL);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.send(data);
        });
    }

    // The Save and Modify methods do not have a setTimeout since everytime they are executed the table is reloaded, and this action already has a setTimeout.
    ModifyAdvertisement()
    {
        var data = JSON.stringify(this);
        var newURL = URL + '/' + parseInt(this.id, 10);

        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        const response = JSON.parse(xhr.responseText);
                        
                        // console.log(response);

                        res(response);
                    }
                    else
                    {
                        console.error(xhr.status, xhr.statusText);
                        rej("Error");
                    }
                }
            });
            
            xhr.open("PUT", newURL);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        });
    }

    static GetAdvertisements()
    {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
        
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        const data = JSON.parse(xhr.responseText);
                
                        // console.log(data);

                        setTimeout(() => { res(data) }, 3000);
                    }
                    else
                    {
                        console.error(xhr.status, xhr.statusText);
                        rej("Error");
                    }
                }
            });
        
            xhr.open("GET", URL);
            xhr.send();
        });
    }

    static GetAdvertisementById(id)
    {
        return new Promise((res, rej) => {
            var newURL = URL + '/' + parseInt(id, 10);
            const xhr = new XMLHttpRequest();
            
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        const data = JSON.parse(xhr.responseText);
                
                        // console.log(data);

                        res(data);
                    }
                    else
                    {
                        console.error(xhr.status, xhr.statusText);
                        rej("Error");
                    }
                }
            });
        
            xhr.open("GET", newURL);
            xhr.send();
        });
    }

    static RemoveAdvertisementById(id)
    {
        return new Promise((res, rej) => {
            var newURL = URL + '/' + parseInt(id, 10);
            const xhr = new XMLHttpRequest();
            
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status >= 200 && xhr.status < 300)
                    {
                        const data = JSON.parse(xhr.responseText);
                
                        // console.log(data);

                        res(data);
                    }
                    else
                    {
                        console.error(xhr.status, xhr.statusText);
                        rej("Error");
                    }
                }
            });
        
            xhr.open("DELETE", newURL);
            xhr.send();
        });
    }
}