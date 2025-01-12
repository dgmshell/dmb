// function createDom() {
//     // Crear un contenedor temporal para construir la plantilla
//     const contenedor = document.createElement('div');
//     const notesElement = document.createElement('div');
//     notesElement.setAttribute("id","notes")
    
//     // Crear los botones con identificadores personalizados
//     const botones = [
//         { texto: 'Obtener Lead', id: 'StartTracker' },
//         { texto: 'Send Note', id: 'SendNote' },
//         { texto: 'Botón 3', id: 'boton3' },
//         { texto: 'Botón 4', id: 'boton4' }
//     ];
    
//     botones.forEach(botonInfo => {
//         const boton = document.createElement('button');
//         boton.textContent = botonInfo.texto;
//         boton.id = botonInfo.id;
        
        

//         // Añadir el botón al contenedor
//         contenedor.appendChild(boton);
//     });
//          contenedor.appendChild(notesElement);
//     // Devolver la plantilla HTML del contenedor
//     return contenedor.innerHTML;
// }

function createDom(){
    return `<div class="n-app">
        <div class="n-content">
            <div class="n-header">
            <div class="n-header-title">
                <h3>CCA - NSF</h3>
                <p>Debt Manager Tracker</p>
                <div class="uploadFiles">
  <input  type="file" id="inputLeads" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
</div>
            </div>
            <div class="n-buttons-header">
                <button id="StartTracker">Add Leads</button>
                <button id="Test" class="test">Start Tracker</button>
            </div>
        </div>
        <div class="n-nav">
            <div class="n-nav-content">
                <div class="n-link-nav">
                    <button>Dasboard</button>    
                </div>
                <div class="n-link-nav">
                    <button id="SendNote">Documents</button>
                </div>
                <div class="n-link-nav">
                    <button>Settings</button>
                </div>
            </div>
        </div>
        <div class="n-dataTable">
            <table id="n-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Program</th>
                    <th>Status</th>
                    <th>Monthly Payment</th>
                    <th>PmtAuth</th>
                    <th>Language</th>
                    <th>Payments</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody id="nBodyTable">
                

                </tbody>
            </table>
        </div>
        <div id="notes"></div>
        </div>
    </div> 
    
   <div id="n-modal" class="n-modal">
    <div class="n-modal-content">
        <span class="n-modal-close">&times;</span>
        <h2>Título del Modal</h2>
        <p>Este es un modal minimalista con Glass Design.</p>

        <div id="nBodyTableNotes">
          
        </div>
        <div id="nTablePayments">
          <table id="n-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Status Date</th>
                    <th>Memo</th>
                </tr>
                </thead>
                <tbody id="nBodyTablePayments">
                  
                </tbody>
            </table>
        </div>
        <div id="nBodySendMessage">
            
        </div>
    </div>
</div>
<div class="n-modal-overlay"></div>
  
     `
}