window.addEventListener("load", function () {
    const d = document.body;
    const bodyApp = document.createElement("div");
    bodyApp.classList.add("app");

    bodyApp.innerHTML = dom();
    d.appendChild(bodyApp);

    const button = document.getElementById("http");
    button.addEventListener("click", async () => {
        const authorization =
            "Bearer fa3LgRQVwVcrgFXFVTKvDTZPnBXqoyA088AOXzPq4qRs5RYpOpiM25dMBoie3kr7VlthFIrgEd1WBqTWnsb8Py7DexNtQvxU9UXTi0kG8CHYEHLVUL1LIsrgopDR48PT49ef9109479445a68c71f243a8a72034";
        const getInfo = `https://api.globalholdings.app/api/Customer`;
        const getCreditors = `https://api.globalholdings.app/api/Creditor`;
        const getDocuments = `https://api.globalholdings.app/api/CustomerDocument`;
        const ids = ['D3738964', 'D3738965'];
        const cleanedIds = ids.map(id => id.replace(/^D/, ''));
        for (const leadId of cleanedIds) {
            try {
                // Primera petición: customerInfo
                const info = await fetchAndHandle(getInfo, createRequestOptions("getbyid", { Id: leadId }, authorization));
                console.log("Customer Info:", info);
                await wait(3000);
                // Segunda petición: customerCreditors
                const creditors = await fetchAndHandle(getCreditors, createRequestOptions("getall", { CustomerId: leadId }, authorization));
                console.log("Customer Creditors:", creditors);
                await wait(3000);
                // Tercera petición: customerCreditors
                const documents = await fetchAndHandle(getDocuments, createRequestOptions("getall", { CustomerId: leadId }, authorization));
                console.log("Customer Creditors:", documents);


                // Esperar antes de procesar el siguiente ID
                await wait(3000);
            } catch (error) {
                console.error(`Error fetching data for leadId ${leadId}`, error);
            }
        }
    });

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