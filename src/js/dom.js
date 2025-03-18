function dom() {
    // if (window.location.href === "https://globalholdings.app/login") {
        const crmAppDiv = document.createElement("div");
        crmAppDiv.className = "crm-app";

        crmAppDiv.innerHTML = `
            <div class="pos-f-t">
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="crm-p-4 crm-main">
                        <h4 class="text-white">Trebol DMB</h4>
                       
                       
                       <nav class="navbar bg-body-tertiary">
                      <div class="container-fluid">
                          <input id="CustomerId" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                          <button id="button-search-customer" class="btn btn-outline-success" type="submit">Search</button>
                       
                      </div>
                    </nav>
                        <div class="crm-profile">
                            <table class="table table-bordered">
                                <h3>Personal Information</h3>
                                <thead>
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Zip</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Date Of Birth</th>
                                        <th scope="col">Debt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row"><span id="FirstName"></span></td>
                                        <td><span id="LastName"></span></td>
                                        <td><span id="Address"></span></td>
                                        <td><span id="City"></span></td>
                                        <td><span id="State"></span></td>
                                        <td><span id="Zip"></span></td>
                                        <td><span id="PhoneNumber"></span></td>
                                        <td><span id="DateOfBirth"></span></td>
                                        <td><span id="Debt"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="crm-creditors">
                            <table class="table table-bordered">
                                <h3>Creditors</h3>
                                <thead>
                                    <tr>
                                        <th scope="col">Creditor Name</th>
                                        <th scope="col">Account Number</th>
                                        <th scope="col">Account Holder</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Type Of Debt</th>
                                    </tr>
                                </thead>
                                <tbody id="tbCreditors">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <button id="button-get-info" type="button" class="btn btn-primary">Info</button>
                    <button id="button-get-creditor" type="button" class="btn btn-primary">creditors</button>

                </nav>
            </div>
        `;

        // Ahora agregamos el nuevo elemento al body
        document.body.appendChild(crmAppDiv);

        // Añadir evento al botón del navbar
        const toggleButton = document.querySelector(".navbar-toggler");
        const collapsibleDiv = document.getElementById("navbarToggleExternalContent");

        toggleButton.addEventListener("click", function () {
            if (collapsibleDiv.classList.contains("show")) {
                collapsibleDiv.classList.remove("show");
                collapsibleDiv.style.display = "none";
            } else {
                collapsibleDiv.classList.add("show");
                collapsibleDiv.style.display = "block";
            }
        });
    // }
    // else {
    //     console.log("Este script solo se ejecuta en https://globalholdings.app/login");
    // }
}
