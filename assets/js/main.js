window.addEventListener("load", function () {
    const d = document.body;
    const bodyApp = document.createElement("div");
    bodyApp.classList.add("app");

    bodyApp.innerHTML = dom();
    d.appendChild(bodyApp);

    const button = document.getElementById("http");
    button.addEventListener("click", async () => {
        const authorization =
            "Bearer LQfwC2gzoA63hMpOW2komxXxozTQoLD2Xn9aXl08KKlYNHlUqbGLELYX3sINiQKd7Df4MO0vBldbM9jhN8jMF2xMPlhodnZ4AHaJlrHckUJcr6L3Il9jq7YEPTolrMRY6c9d11b34c2647779b85173025fe6586";

        const ids = [3368525, 365343345];


        for (const leadId of ids) {
            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization,
                },
                body: JSON.stringify(
            {
                "Type": "getbyid",
                "Data": {
                "Id": leadId
            }
            })
            };

            try {
                // Realizar ambas peticiones en paralelo y esperar a que ambas se completen
                const [leadData] = await Promise.all([
                    fetchAndHandle(`https://api.globalholdings.app/api/Customer`, requestOptions)
                ]);

                console.log(leadData)

                await wait(5000);

            } catch (error) {
                console.error('Error fetching data for leadId', leadId.id, error);
            }
        }

    });
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