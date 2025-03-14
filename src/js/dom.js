function dom() {
    // Verificar si estamos en el dominio correcto
    if (window.location.href === "https://globalholdings.app/login") {
        return `
            <div class="crm-app">
                <div class="crm-app-content-full">
                    <div class="crm-navbar">
                        <nav>
                            <div class="crm-button-navbar">
                                <button class="crm-button">DMB</button>
                            </div>
                        </nav>
                    </div>
                    <div class="crm-section-search">
                        <div class="crm-navigation">
                            <div class="crm-button-navbar">
                                <button class="crm-button">Debt Update</button>
                                <button class="crm-button">Debt Review</button>
                            </div>
                        </div>
                        <div class="crm-search">
                            <div class="crm-input">
                                <input type="search" id="CustomerId" placeholder="Customer Id">
                            </div>
                            <button class="crm-button" id="button-search-customer">Search</button>
                            <div class="treb-icons">
                                <span icon-data="folder">ee</span>
                            </div>
                        </div>
                    </div>
                    <div class="crm-app-content">
                    </div>
                </div>
            </div>

            <div id="CustomerInformation" class="customer-info">
                <div class="info-section">
                    <h3>Personal Information</h3>
                    <div class="info-item">
                        <label>First Name:</label>
                        <span id="FirstName"></span>
                    </div>
                    <div class="info-item">
                        <label>Last Name:</label>
                        <span id="LastName"></span>
                    </div>
                    <div class="info-item">
                        <label>Address:</label>
                        <span id="Address"></span>
                    </div>
                    <div class="info-item">
                        <label>City:</label>
                        <span id="City"></span>
                    </div>
                    <div class="info-item">
                        <label>State:</label>
                        <span id="State"></span>
                    </div>
                    <div class="info-item">
                        <label>Zip:</label>
                        <span id="Zip"></span>
                    </div>
                </div>

                <div class="info-section phone-birth">
                    <div class="info-item">
                        <label>Phone Number:</label>
                        <span id="PhoneNumber"></span>
                    </div>
                    <div class="info-item">
                        <label>Date of Birth:</label>
                        <span id="DateOfBirth"></span>
                    </div>
                </div>
            </div>
        `;
    } else {
        console.log("This script only runs on https://globalholdings.app/login");
    }
}

// Llamar a la función dom() para ver si el código se ejecuta en el dominio correcto
console.log(dom());
