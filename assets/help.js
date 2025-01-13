https://api.globalholdings.app/api/CustomerDocument

{
    "Type": "list",
    "Data": {
    "CustomerId": 3739081
}
}


{
    "Type": "download",
    "Data": {
    "Name": "Signed_9e262d87-d6c1-4942-b70b-473f9568887c_Combined",
        "Extension": ".pdf",
        "CustomerId": 3739081
}
}

button.addEventListener("click", async () => {
    const authorization =
        "Bearer p1v3sNCM2IWs34lzJmdZ2naKSERUJv3pKpxm8dsV6vePMBNn2zZib1YBbkkn6sCGPqhNH81q4HcGIL8R1nbTWVOTQvLY2EZOsY9fd9g48snTYS2QlTvSRtu3bO6Wwdxz5b4e4ecc501a4f529d5796be124029dd";
    const getInfo = `https://api.globalholdings.app/api/Customer`;
    const getCreditors = `https://api.globalholdings.app/api/Creditor`;
    const getDocuments = `https://api.globalholdings.app/api/CustomerDocument`;

    const customerId = document.getElementById("customerId");
    //'D3738964'
    console.log(customerId)

    const ids = [customerId.value];
    const cleanedIds = ids.map(id => id.replace(/^D/, ''));
    for (const leadId of cleanedIds) {
        try {
            // Primera petición: customerInfo
            const info = await fetchAndHandle(getInfo, createRequestOptions("getbyid", { Id: leadId }, authorization));
            console.log("Customer Info:", info);
            const FirstName = info?.Data?.CustomerProfile?.FirstName || "";
            const LastName = info?.Data?.CustomerProfile?.LastName || "";
            const Address = info.Data.CustomerProfile.Address.Line1 || "";
            const City = info.Data.CustomerProfile.Address.City || "";

            const StateId = info.Data.CustomerProfile.Address.StateId || "";
            const State = States.Data.find(state => state.Id === StateId)?.ShortCode || "";

            const Zip = info.Data.CustomerProfile.Address.Zip || "";
            const PhoneNumber = info?.Data?.CustomerProfile?.CustomerPhones?.[0]?.PhoneNumber;
            const DateOfBirth= info?.Data?.CustomerProfile?.DateOfBirth || "";

            //const SsnEncrypted= info?.Data?.CustomerProfile?.SsnEncrypted || "";



            const formData =
                {
                    FirstName: FirstName,
                    LastName:LastName,
                    Address:Address,
                    City:City,
                    State:State,
                    Zip:Zip,
                    PhoneNumber:PhoneNumber,
                    DateOfBirth:DateOfBirth
                };

            await SaveInfo(formData);






            await wait(3000);
            // Segunda petición: customerCreditors
            const creditors = await fetchAndHandle(getCreditors, createRequestOptions("getall", { CustomerId: leadId }, authorization));
            console.log("Customer Creditors:", creditors);
            await wait(3000);
            // Tercera petición: customerCreditors
            const documents = await fetchAndHandle(getDocuments, createRequestOptions("list", { CustomerId: leadId }, authorization));
            console.log("Customer Documents:", documents);



            // Esperar antes de procesar el siguiente ID
            await wait(3000);
        } catch (error) {
            console.error(`Error fetching data for leadId ${leadId}`, error);
        }
    }
});