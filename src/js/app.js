window.addEventListener("load", function () {
    const d = document.body;
    const bodyApp = document.createElement("div");
    bodyApp.classList.add("app");

    bodyApp.innerHTML = dom();
    d.appendChild(bodyApp);

    const ButtonSearchCustomer = document.getElementById("button-search-customer");
   // const read = document.getElementById("read");
    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    // read.addEventListener("click", async () => {
    //     getInfoProfile().then((data) => {
    //         return console.log(data)
    //         const DebtFirstname = document.querySelector("#i0_txtFirstname")
    //         DebtFirstname.value = data.FirstName +"update";
    //
    //         DebtFirstname.dispatchEvent(inputEvent);
    //
    //     });
    // })


    ButtonSearchCustomer.addEventListener("click", async () => {
        const authorization =
            "Bearer p1v3sNCM2IWs34lzJmdZ2naKSERUJv3pKpxm8dsV6vePMBNn2zZib1YBbkkn6sCGPqhNH81q4HcGIL8R1nbTWVOTQvLY2EZOsY9fd9g48snTYS2QlTvSRtu3bO6Wwdxz5b4e4ecc501a4f529d5796be124029dd";
        const getInfo = `https://api.globalholdings.app/api/Customer`;

        const InputCustomerId = document.getElementById("CustomerId");
        console.log(InputCustomerId)
        const ids = [InputCustomerId.value];
        const cleanedIds = ids.map(id => id.replace(/^D/, ''));

        for (const leadId of cleanedIds) {
            try {
                const info = await fetchAndHandle(getInfo, createRequestOptions("getbyid", { Id: leadId }, authorization));
                const FirstName = info?.Data?.CustomerProfile?.FirstName || "";
                const LastName = info?.Data?.CustomerProfile?.LastName || "";
                const Address = info.Data.CustomerProfile.Address.Line1 || "";
                const City = info.Data.CustomerProfile.Address.City || "";
                const StateId = info.Data.CustomerProfile.Address.StateId || "";
                const State = States.Data.find(state => state.Id === StateId)?.ShortCode || "";
                const Zip = info.Data.CustomerProfile.Address.Zip || "";
                const PhoneNumber = info?.Data?.CustomerProfile?.CustomerPhones?.[0]?.PhoneNumber || "";
                const DateOfBirth = info?.Data?.CustomerProfile?.DateOfBirth || "";

                const formData = {
                    FirstName: FirstName,
                    LastName: LastName,
                    Address: Address,
                    City: City,
                    State: State,
                    Zip: Zip,
                    PhoneNumber: PhoneNumber,
                    DateOfBirth: DateOfBirth
                };

                // Insert the data into the HTML
                document.getElementById("FirstName").textContent = formData.FirstName;
                document.getElementById("LastName").textContent = formData.LastName;
                document.getElementById("Address").textContent = formData.Address;
                document.getElementById("City").textContent = formData.City;
                document.getElementById("State").textContent = formData.State;
                document.getElementById("Zip").textContent = formData.Zip;
                document.getElementById("PhoneNumber").textContent = formData.PhoneNumber;
                document.getElementById("DateOfBirth").textContent = formData.DateOfBirth;

            } catch (error) {
                console.error(`Error fetching data for leadId ${leadId}`, error);
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