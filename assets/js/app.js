
window.addEventListener("load", function() {
    const Language = "Spanish"
 	const d = document.body;
    const body = document.createElement("div")
    body.classList.add("n-app")

    body.innerHTML = createDom();
    d.appendChild(body)
    const nBodyTable = document.getElementById("nBodyTable");
    
    const BtnStartTracker = document.getElementById("StartTracker")
    const BtnTest = document.getElementById("Test")
    const BtnSendNote = document.getElementById("SendNote")
    const notes = document.getElementById("Notes")
    
    BtnStartTracker.addEventListener('click', async () => {
    let leads = [];

    // Obtener leads con promesa
    leads = await new Promise((resolve) => {
        chrome.storage.local.get(['leads'], function (result) {
            resolve(result.leads || []); // Usar un array vacío si no hay leads
        });
    });

   
let requestOptions = {
        method: 'GET',
        headers: {},
    };
    for (const leadId of leads) {
        try {
            // Realizar ambas peticiones en paralelo y esperar a que ambas se completen
            const [leadData, leadNoteDataResponse] = await Promise.all([
                fetchAndHandle(`https://hosted2.debtmanagersoft.com/cca01m/system/client_main.php?clientid=${leadId.id}`, requestOptions)
            ]);

            // Procesar leadData para extraer la información necesaria
            const tempElement = document.createElement('div');
            tempElement.innerHTML = leadData;

            const LeadName = tempElement.querySelector('input[name="firstname"]').value;
            const LeadLastName = tempElement.querySelector('input[name="lastname"]').value;
            const LeadPhone = tempElement.querySelector('input[name="phone"]').value;

            const selectElementStatus = tempElement.querySelector("#div_lient_status > select");
            const selectedOptionStatus = selectElementStatus.selectedOptions[0];
            const selectedTextStatus = selectedOptionStatus.textContent;

            const selectElementProgram = tempElement.querySelector('select[name="programid"]');
            const selectedOptionProgram = selectElementProgram.selectedOptions[0];
            const selectedTextProgram = selectedOptionProgram.textContent;


            // Acceder a los elementos dentro del HTML para obtener información específica
            const firstNameElement = tempElement.querySelector(".dynMenuBodyTd");
            const cheaderElement = firstNameElement.querySelector(".cheader");
            const tbodyElement = cheaderElement.querySelector("tbody");
            const trElements = tbodyElement.querySelectorAll("tr");

            // Account
            const AccountTr = trElements[0]; 
            const AccountTd = AccountTr.querySelectorAll("td")[1];
           
            const AccountTextTd = AccountTd.textContent.trim();
            const AccountId = AccountTextTd.replace("Account:", "").trim();

            // Debt Total
            const DebtTr = trElements[1]; 
            const DebtTd = DebtTr.querySelectorAll("td")[1];
           
            
            const DebtTextTd = DebtTd.textContent.trim();
            const DebtTotal = DebtTextTd.replace("Debt Load:", "").trim();
            
            // Payments
            const PaymentMonthlyTr = trElements[2];
            const PaymentMonthlyTd = PaymentMonthlyTr.querySelectorAll("td")[3];
           
            const PaymentMonthlyTextTd = PaymentMonthlyTd.textContent.trim();
            const PaymentMonthly = PaymentMonthlyTextTd.replace("Monthly Payment:", "").trim();

            // PmtAuth
            const PmtAuthTr = trElements[3];
            const PmtAuthTd = PmtAuthTr.querySelectorAll("td")[0];

            // Obtener todos los elementos <font> dentro del primer <td>
            const PmtAuthFonts = PmtAuthTd.querySelectorAll("font");
            // Recorrer los elementos <font> para encontrar el texto
            let PmtAuth = '';
            PmtAuthFonts.forEach(font => {
            if (font.textContent.trim() === 'ON' || font.textContent.trim() === 'OFF') {
                PmtAuth = font.textContent.trim();
                return;
             }
            });

            // Insertar una nueva fila en la tabla nBodyTable con los datos obtenidos
            const newRow = document.createElement('tr');
            newRow.className = 'n-tr';

            newRow.innerHTML = `
                <td><a target="_blank" href="https://hosted2.debtmanagersoft.com/cca01m/system/client_main.php?clientid=${AccountId}">${AccountId}</a></td>
                <td>${LeadName} ${LeadLastName}</td>
                <td>${LeadPhone}</td>
                <td>${selectedTextProgram}</td>
                <td>${selectedTextStatus}</td>
                <td>${PaymentMonthly}</td>
                <td>${PmtAuth}</td>
                <td>${DebtTotal}</td>
                <td>${Language}</td>
                <td><button class="buttons-icons button-pay" id="${leadId.id}"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="32" y="80" width="448" height="256" rx="16" ry="16" transform="rotate(180 256 208)" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M64 384h384M96 432h320"/><circle cx="256" cy="208" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 160a80 80 0 01-80-80M32 160a80 80 0 0080-80M480 256a80 80 0 00-80 80M32 256a80 80 0 0180 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg></button></td>
                <td><button class="buttons-icons button-note" id="${leadId.id}"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"/><path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z"/></svg></button></td>
                <td><button class="buttons-icons button-send-note" id="${leadId.id}"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><circle cx="160" cy="216" r="32"/><circle cx="256" cy="216" r="32"/><circle cx="352" cy="216" r="32"/></svg>
                </button></td>
            `;

            nBodyTable.appendChild(newRow);
            // Espera de 5 segundos entre cada lead
            await wait(5000);

        } catch (error) {
            console.error('Error fetching data for leadId', leadId.id, error);
        }
    }

});

 BtnTest.addEventListener('click', async () => {
const modal = document.getElementById('n-modal');
                const overlay = document.querySelector('.n-modal-overlay');

                modal.classList.add('show');
                overlay.classList.add('show');
    });
const bodyTableNotes = document.getElementById("nBodyTableNotes")
const nBodyTablePayments = document.getElementById("nBodyTablePayments");
const nBodyTableSendMessage = document.getElementById("nBodySendMessage");
  document.addEventListener('click', async function (event) {

        let target = event.target;

        if (target.classList.contains('button-note')) {



            

            const leadId = target.id;
            const [leadNoteDataResponse] = await Promise.all([
                fetchAndHandle(`https://hosted2.debtmanagersoft.com/cca01m/system/notes_ops.php?clientid=${leadId}&op=R&callback=jQuery191008352347299397866_1718910792308&_=1718910792309`)
            ]);
            console.log(leadNoteDataResponse)


            // Convertir leadNoteDataResponse a JSON
            const leadNoteData = JSON.parse(leadNoteDataResponse.replace(/^.*?\(|\)$/g, ''));

            // Obtener solo el array de resultados
            const results = leadNoteData.results;
            let notesHTML = '';

            // Iterar sobre cada objeto en el array results y acceder a note_text
            results.forEach(result => {
                const noteUser = result.row_insert_oprid;
                const noteDate = result.row_insert_dt;
                let noteDescription = result.note_text;  // Cambiar const a let

                // Verificar si noteDescription no es null ni undefined
                if (noteDescription) {
                    // Usar DOMParser para eliminar las etiquetas HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(noteDescription, 'text/html');
                    noteDescription = doc.body.textContent || "";
                } else {
                    // Si es null o undefined, asignar una cadena vacía
                    noteDescription = "";
                }
            
                // Añadir cada nota al HTML
                notesHTML +=
                 `
                 <div id="nNoteUser">${noteUser}</div>
                 <div id="nNoteDate">${noteDate}</div>
                 <div id="nNoteDescription">${noteDescription}</div>
                
                 `;
            });

            
            bodyTableNotes.innerHTML = notesHTML;
            const modal = document.getElementById('n-modal');
                const overlay = document.querySelector('.n-modal-overlay');

                modal.classList.add('show');
                overlay.classList.add('show');

                //funciona podrei hacer pequealas funcione spero si e simportante al cerra rle modal elimar losd atos de las notas 




        }else if(target.classList.contains('button-pay')) {
           const leadId = target.id;
            
            const [leadPaymentDataResponse] = await Promise.all([
                fetchAndHandle(`https://hosted2.debtmanagersoft.com/cca01m/system/payments_new_ops.php?clientid=${leadId}&op=R&gr=draft&callback=jQuery19101514093494589599_1719251657561&_=1719251657562`)
            ]);
         
        const leadPaymentData = JSON.parse(leadPaymentDataResponse.replace(/^.*?\(|\)$/g, ''));

        
        const results = leadPaymentData.results;
        
        

        results.forEach(result => {
        nBodyTablePayments.innerHTML += `
                <tr>
                <td>${result.effdt}</td>
                <td>${result.amount}</td>
                <td>ACH - By ${result.payment_type}</td>
                <td>${result.gcs_transaction_status}</td>
                <td>${result.status_dt}</td>
                <td>${result.memo}</td>
                </tr>
            `;
        });







        const modal = document.getElementById('n-modal');
                const overlay = document.querySelector('.n-modal-overlay');

                modal.classList.add('show');
                overlay.classList.add('show');

        }else if (target.classList.contains('button-send-note')) {
            const leadId = target.id;
                const modal = document.getElementById('n-modal');
                const overlay = document.querySelector('.n-modal-overlay');


                modal.classList.add('show');
                overlay.classList.add('show');
                 // Encuentra la fila correspondiente
                const row = target.closest('tr');
                // Captura el nombre del cliente (segundo <td> en la fila)
                const clientName = row.querySelector('td:nth-child(2)').textContent;

                nBodyTableSendMessage.innerHTML = `
                <div class="n-name-user">
                <h4>${clientName}</h4>
                </div>
                <div class="n-message">
                  <textarea id="messageNote" placeholder="Escriba su nota..."></textarea>
                  <div class="button-save-messages">
                  <button class="button-save-message" id="${leadId}">Agregar nota</button>
                  </div>
                </div>
            `;

                
            } else if (target.classList.contains('button-save-message')) {
    const leadId = target.id;

    const messageNote = document.getElementById("messageNote").value;

    const formData = new URLSearchParams();
    formData.append("models", JSON.stringify([{
        noteid: "",
        cred_name: "",
        row_insert_dt: "",
        row_insert_oprid: "",
        note_text: messageNote
    }]));

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        body: formData.toString()
    };

    try {
        const postNote = fetch(`https://hosted2.debtmanagersoft.com/cca01m/system/notes_ops.php?clientid=${leadId}&op=I`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("insertada");
                } else {
                    alert("Error al insertar");
                }
                
            })
            .then(data => console.log(data))
            .catch(error => {
                console.error('Error:', error);
                alert("Error en la solicitud");
            });
    } catch (error) {
        console.error('Error en el try-catch:', error);
        alert("Excepción capturada");
    }
}


    });


document.querySelector('.n-modal-close').addEventListener('click', () => {
    const modal = document.getElementById('n-modal');
    const overlay = document.querySelector('.n-modal-overlay');

    modal.classList.remove('show');
    overlay.classList.remove('show');
    bodyTableNotes.innerHTML="";
    nBodyTablePayments.innerHTML="";
    nBodyTableSendMessage.innerHTML="";
});

document.querySelector('.n-modal-overlay').addEventListener('click', () => {
    const modal = document.getElementById('n-modal');
    const overlay = document.querySelector('.n-modal-overlay');

    modal.classList.remove('show');
    overlay.classList.remove('show');
    bodyTableNotes.innerHTML="";
    nBodyTablePayments.innerHTML="";
    nBodyTableSendMessage.innerHTML="";
}); 





    // Función para simular una espera
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        console.error(error.message);
        throw error;
    }
}


const fileInput = document.getElementById('inputLeads');

fileInput.addEventListener("change", () => {
            uploadFile(fileInput);
        });



});



function uploadFile(fileInput) {
    const file = fileInput.files[0];
   
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = e.target.result;
            console.log(data)
            processData(data, fileInput);
        };

        reader.readAsText(file);

        showToast('Espera', 'Cargando...', { timeout: 3000, type: 'info' });
    } else {
        showToast('Ops', 'Selecciona un archivo', { timeout: 3000, type: 'warning' });
    }
}

function processData(data, fileInput) {
    
    const jsonArray = data.split('\n').map(line => line.trim()).filter(line => line !== "");

    // Convertir cada línea en un objeto con las propiedades "id" y "nombre"
    const convertedArray = jsonArray.map(line => {
        const [id, nombre] = line.split(',').map(item => item.trim());
        return { "id": id, "nombre": nombre };
    });

    showToast('Exito', 'Leads obtenidos', { timeout: 3000, type: 'success' });
    // Guardar en el localStorage
    saveToLocalStorage(convertedArray);
}


function saveToLocalStorage(data) {
    chrome.storage.local.set({ 'leads': data }, function () {

        showToast('Exito', 'Se ha guardado los datos localmente', { timeout: 3000, type: 'success' });
    });

}

