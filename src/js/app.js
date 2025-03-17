window.addEventListener("load", function () {

    const d = document.body;
    const bodyApp = document.createElement("div");
    bodyApp.classList.add("app");

    dom();
    //d.appendChild(bodyApp);

    const ButtonSearchCustomer = document.getElementById("button-search-customer");
   const read = document.getElementById("button-get-info");
    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    read.addEventListener("click", async () => {
        const DebtFirstname = document.querySelector("#i0_txtFirstname");
        const DebtLastName = document.querySelector("#i0_txtLastname");
        const DebtAddress = document.querySelector("#i0_txtAddress");
        const DebtCity = document.querySelector("#i0_txtCity");
        const DebtState = document.querySelector("#i0_StateList");
        const DebtZip = document.querySelector("#i0_txtZip");
        const DebtPhoneNumber = document.querySelector("#i0_txtHomePhone");

        const DebtDateOfBirth = document.querySelector("#i0_txtDOB");
        const DebtCreditorTotalBalance = document.querySelector("#i0_txtAmtOfCCDebt");

        getInfoProfile().then((data) => {
            if (!data || Object.keys(data).length === 0) {
                console.warn("No se recibió información del perfil.");
                return; // Detiene la ejecución si no hay datos
            }
            DebtFirstname.value = data.FirstName;
            DebtLastName.value = data.LastName;
            DebtAddress.value = data.Address;
            DebtCity.value = data.City;
            DebtState.value = data.State;
            DebtZip.value = data.Zip;
            DebtPhoneNumber.value = data.PhoneNumber;
            DebtDateOfBirth.value = data.DateOfBirth;
            DebtCreditorTotalBalance.value = data.CreditorTotalBalance;


            DebtFirstname.dispatchEvent(inputEvent);
            DebtLastName.dispatchEvent(inputEvent);
            DebtAddress.dispatchEvent(inputEvent);
            DebtCity.dispatchEvent(inputEvent);

            DebtState.dispatchEvent(changeEvent);

            DebtZip.dispatchEvent(inputEvent);
            DebtPhoneNumber.dispatchEvent(inputEvent);
            DebtDateOfBirth.dispatchEvent(inputEvent);
            DebtCreditorTotalBalance.dispatchEvent(inputEvent);


            clearInfoProfile();
        });
    })


    ButtonSearchCustomer.addEventListener("click", async () => {
        const authorization =
            "Bearer yvMpAn1X1fwiDMG3m1Av6MpbQPQ6XqyhH9IO282Kg9NYtD4YBRakIIIlGuYvX4AKrOaED2Bo90P79QrMV25FPNZ80gIHjGwl8CrfmzUJQvlS3LmzDLae954dzcOgu3F261438db169984f4bbad0239df25bba67";

        const getInfo = `https://api.globalholdings.app/api/Customer`;
        const getCreditors = `https://api.globalholdings.app/api/Creditor`;
        const InputCustomerId = document.getElementById("CustomerId");

        if (!InputCustomerId || !InputCustomerId.value.trim()) {
            console.error("Debe ingresar un CustomerId válido.");
            return;
        }

        const ids = [InputCustomerId.value.trim()];
        const cleanedIds = ids.map(id => id.replace(/^D/, ''));

        for (const leadId of cleanedIds) {
            try {
                const info = await fetchAndHandle(getInfo, createRequestOptions("getbyid", { Id: leadId }, authorization));
                if (!info?.Data?.CustomerProfile) {
                    console.error("Datos del cliente no encontrados.");
                    continue;
                }

                const profile = info.Data.CustomerProfile;
                const address = profile.Address || {};
                const stateData = States?.Data?.find(state => state.Id === address.StateId) || {};

                const formData = {
                    FirstName: profile.FirstName || "",
                    LastName: profile.LastName || "",
                    Address: address.Line1 || "",
                    City: address.City || "",
                    State: stateData.ShortCode || "",
                    Zip: address.Zip || "",
                    PhoneNumber: profile.CustomerPhones?.[0]?.PhoneNumber || "",
                    DateOfBirth: profile.DateOfBirth || "",
                    CreditorTotalBalance: info?.Data?.CreditorTotalBalance || ""
                };

                // Insertar los datos en la interfaz
                ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "DateOfBirth"].forEach(field => {
                    document.getElementById(field).textContent = formData[field] || "N/A";
                });

                await SaveInfo(formData);

                // Obtener acreedores inmediatamente sin esperar 3s innecesariamente
                const creditors = await fetchAndHandle(getCreditors, createRequestOptions("getall", { CustomerId: leadId }, authorization));
                const creditorsData = creditors.Data;

                const filteredCreditors = creditorsData.filter(creditor => creditor.CreditorStatusId === 1);

                const tbody = document.getElementById("tbCreditors");
                tbody.innerHTML = ""; // Limpiar el tbody antes de agregar nuevas filas

                filteredCreditors.forEach(creditor => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
        <td><input type="checkbox" class="row-checkbox"></td>
        <td scope="row">${creditor.Name}</td>
        <td>${creditor.AccountNumber}</td>
        <td>${creditor.CreditorAccountHolder.Name}</td>
        <td>${creditor.OriginalBalance}</td>
        <td>${creditor.CreditorAccountType.Name}</td>
        <td><button class="save-to-local">Locals</button></td>
    `;

                    // Agregar la fila a la tabla
                    tbody.appendChild(row);

                    // Seleccionar elementos de la fila
                    const checkbox = row.querySelector(".row-checkbox");
                    const button = row.querySelector(".save-to-local");

                    // Evento para guardar en chrome.storage.local (limpiando antes)
                    button.addEventListener("click", () => {
                        // Crear nuevo objeto con solo la fila actual
                        const newData = [{
                            Name: creditor.Name,
                            AccountNumber: creditor.AccountNumber,
                            AccountHolder: creditor.CreditorAccountHolder.Name,
                            Balance: creditor.OriginalBalance,
                            TypeOfDebt: creditor.CreditorAccountType.Name
                        }];


                        SaveCreditors(newData);
                        checkbox.checked = true;
                    });
                });

            } catch (error) {
                console.error(`Error obteniendo datos para el ID ${leadId}`, error);
            }
        }
    });


    const SaveInfo = async (InfoProfile) => {
        await chrome.storage.local.set({ InfoProfile });
        console.log('Datos del formulario guardados:', InfoProfile);
    };
    const getInfoProfile = async () => {
        const result = await chrome.storage.local.get(['InfoProfile']);
        return result.InfoProfile;
    };
    const clearInfoProfile = async () => {
        await chrome.storage.local.remove('InfoProfile');
        console.log("InfoProfile eliminado del almacenamiento local.");
    };

    const SaveCreditors = async (InfoCreditors) => {
        await chrome.storage.local.set({ InfoCreditors });
        console.log('Datos del formulario guardados:', InfoCreditors);
    };
    const clearInfoProfile = async () => {
        await chrome.storage.local.remove('InfoProfile');
        console.log("InfoProfile eliminado del almacenamiento local.");
    };

// Función para generar dinámicamente los requestOptions
    function createRequestOptions(type, data, authorization) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
            },
            body: JSON.stringify({
                "Type": type,
                "Data": data,
            }),
        };
    }

    async function fetchAndHandle(url, requestOptions) {
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                return response.text();
            }
        } catch (error) {
            return response.json();
            throw error;
        }
    }
});

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}







/*
 *
 * States
 */
const States = {
    "Message": "States got successfully.",
    "Data": [
        {
            "Id": 1,
            "Name": "Alabama",
            "ShortCode": "AL"
        },
        {
            "Id": 2,
            "Name": "Alaska",
            "ShortCode": "AK"
        },
        {
            "Id": 3,
            "Name": "Arizona",
            "ShortCode": "AZ"
        },
        {
            "Id": 4,
            "Name": "Arkansas",
            "ShortCode": "AR"
        },
        {
            "Id": 5,
            "Name": "California",
            "ShortCode": "CA"
        },
        {
            "Id": 6,
            "Name": "Colorado",
            "ShortCode": "CO"
        },
        {
            "Id": 7,
            "Name": "Connecticut",
            "ShortCode": "CT"
        },
        {
            "Id": 8,
            "Name": "District of Columbia",
            "ShortCode": "DC"
        },
        {
            "Id": 9,
            "Name": "Delaware",
            "ShortCode": "DE"
        },
        {
            "Id": 10,
            "Name": "Florida",
            "ShortCode": "FL"
        },
        {
            "Id": 11,
            "Name": "Georgia",
            "ShortCode": "GA"
        },
        {
            "Id": 12,
            "Name": "Hawaii",
            "ShortCode": "HI"
        },
        {
            "Id": 13,
            "Name": "Idaho",
            "ShortCode": "ID"
        },
        {
            "Id": 14,
            "Name": "Illinois",
            "ShortCode": "IL"
        },
        {
            "Id": 15,
            "Name": "Indiana",
            "ShortCode": "IN"
        },
        {
            "Id": 16,
            "Name": "Iowa",
            "ShortCode": "IA"
        },
        {
            "Id": 17,
            "Name": "Kansas",
            "ShortCode": "KS"
        },
        {
            "Id": 18,
            "Name": "Kentucky",
            "ShortCode": "KY"
        },
        {
            "Id": 19,
            "Name": "Louisiana",
            "ShortCode": "LA"
        },
        {
            "Id": 20,
            "Name": "Maine",
            "ShortCode": "ME"
        },
        {
            "Id": 21,
            "Name": "Maryland",
            "ShortCode": "MD"
        },
        {
            "Id": 22,
            "Name": "Massachusetts",
            "ShortCode": "MA"
        },
        {
            "Id": 23,
            "Name": "Michigan",
            "ShortCode": "MI"
        },
        {
            "Id": 24,
            "Name": "Minnesota",
            "ShortCode": "MN"
        },
        {
            "Id": 25,
            "Name": "Mississippi",
            "ShortCode": "MS"
        },
        {
            "Id": 26,
            "Name": "Missouri",
            "ShortCode": "MO"
        },
        {
            "Id": 27,
            "Name": "Montana",
            "ShortCode": "MT"
        },
        {
            "Id": 28,
            "Name": "Nebraska",
            "ShortCode": "NE"
        },
        {
            "Id": 29,
            "Name": "Nevada",
            "ShortCode": "NV"
        },
        {
            "Id": 30,
            "Name": "New Hampshire",
            "ShortCode": "NH"
        },
        {
            "Id": 31,
            "Name": "New Jersey",
            "ShortCode": "NJ"
        },
        {
            "Id": 32,
            "Name": "New Mexico",
            "ShortCode": "NM"
        },
        {
            "Id": 33,
            "Name": "New York",
            "ShortCode": "NY"
        },
        {
            "Id": 34,
            "Name": "North Carolina",
            "ShortCode": "NC"
        },
        {
            "Id": 35,
            "Name": "North Dakota",
            "ShortCode": "ND"
        },
        {
            "Id": 36,
            "Name": "Ohio",
            "ShortCode": "OH"
        },
        {
            "Id": 37,
            "Name": "Oklahoma",
            "ShortCode": "OK"
        },
        {
            "Id": 38,
            "Name": "Oregon",
            "ShortCode": "OR"
        },
        {
            "Id": 39,
            "Name": "Pennsylvania",
            "ShortCode": "PA"
        },
        {
            "Id": 40,
            "Name": "Rhode Island",
            "ShortCode": "RI"
        },
        {
            "Id": 41,
            "Name": "South Carolina",
            "ShortCode": "SC"
        },
        {
            "Id": 42,
            "Name": "South Dakota",
            "ShortCode": "SD"
        },
        {
            "Id": 43,
            "Name": "Tennessee",
            "ShortCode": "TN"
        },
        {
            "Id": 44,
            "Name": "Texas",
            "ShortCode": "TX"
        },
        {
            "Id": 45,
            "Name": "Utah",
            "ShortCode": "UT"
        },
        {
            "Id": 46,
            "Name": "Vermont",
            "ShortCode": "VT"
        },
        {
            "Id": 47,
            "Name": "Virginia",
            "ShortCode": "VA"
        },
        {
            "Id": 48,
            "Name": "Washington",
            "ShortCode": "WA"
        },
        {
            "Id": 49,
            "Name": "West Virginia",
            "ShortCode": "WV"
        },
        {
            "Id": 50,
            "Name": "Wisconsin",
            "ShortCode": "WI"
        },
        {
            "Id": 51,
            "Name": "Wyoming",
            "ShortCode": "WY"
        },
        {
            "Id": 52,
            "Name": "TEST STATE",
            "ShortCode": "XX"
        }
    ]
}