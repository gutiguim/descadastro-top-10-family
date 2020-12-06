$(document).ready(function(){
    getUsersFromFirebase();
});

function getUsersFromFirebase() {
        // Create a root reference
        var ref = firebase.storage();
        var storageRef = ref.ref();
    
        storageRef.child("TopFamilyAtivos/").listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                fillUserList(itemRef);
            });
            console.log(userList)
        }).catch(function(error) {
            console.log(error);
        });
        
        var storageRef2 = ref.ref();
    
        storageRef2.child("TopFamilyInativos/").listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                fillUserListInactives(itemRef);
            });
            console.log(userListInactive);
        }).catch(function(error) {
            console.log(error);
        });
}

var userList = [];
var userListInactive = []
var select = document.getElementById("list");
var select_inactives = document.getElementById("list_inactive");

function fillUserListInactives(data) {
    userListInactive = [];
    // console.log(data);
    userList.push({
        name: data.location.path,
        value: data.location.path
    })

    var option = document.createElement("OPTION"),
    txt = document.createTextNode(data.location.path);
    option.appendChild(txt);
    option.setAttribute("value",data.location.path);
    select_inactives.insertBefore(option,select_inactives.lastChild)

}

function fillUserList(data) {
    userList = [];
    // console.log(data);
    userList.push({
        name: data.location.path,
        value: data.location.path
    })

    var option = document.createElement("OPTION"),
    txt = document.createTextNode(data.location.path);
    option.appendChild(txt);
    option.setAttribute("value",data.location.path);
    select.insertBefore(option,select.lastChild)

}

function showOnScreen(data) {
    var usuario = data;
    var jsonString = JSON.stringify(usuario, undefined, 2);
    alert(jsonString);
}

function showData() {
    var selected = select.options[select.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                showOnScreen(JSON.parse(reader.result));
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function showDataActivate() {
    var selected = select_inactives.options[select_inactives.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                showOnScreen(JSON.parse(reader.result));
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}


function sendData() {
    var selected = select.options[select.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            console.log(blob)
            console.log(xhr.response)

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                deactivate(JSON.parse(reader.result));
                // console.log(JSON.parse(reader.result));
                pathReference.delete().then(function() {
                    console.log("Deletado da lista de TopFamilyAtivos");
                    getUsersFromFirebase();
                }).catch(function(error) {
                    console.log("Erro ao deletar");
                });
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function sendDataActivate() {
    var selected = select_inactives.options[select_inactives.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            console.log(blob)
            console.log(xhr.response)

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                activate(JSON.parse(reader.result));
                // console.log(JSON.parse(reader.result));
                pathReference.delete().then(function() {
                    console.log("Deletado da lista de TopFamilyInativos");
                    getUsersFromFirebase();
                }).catch(function(error) {
                    console.log("Erro ao deletar");
                });
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function deactivate (data) {
    console.log(data);
    var usuario = data;
    usuario.StatusBeneficiario = "I";
    var jsonString = JSON.stringify(usuario, undefined, 2);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
    xhr.send(jsonString);
    // alert("Sucesso");

    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    var marcaDependente = '';
    if (usuario.BeneficiarioTitular == "") {
        marcaDependente = "_TITULAR";
    } else {
        marcaDependente = "_DEPENDENTE_DO_" + usuario.BeneficiarioTitular;
    }

    storageRef.child('TopFamilyInativos/' + usuario.Nome + '_' + usuario.DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
        console.log('Uploaded string');
    }).catch(function(error) {
        console.log(error);
    });

    if(usuario.CodigoContrato == 171 && marcaDependente == "_TITULAR") {
        let count_path = 'TopFamilyAtivosFamilia/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular;
        var pathReference = storage.ref(count_path);
        pathReference.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'
          
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
    
                const reader = new FileReader();
                reader.addEventListener('loadend', () => {
                    pathReference.delete().then(function() {
                        console.log("Deletado da lista de TopFamilyAtivosFamilia");
                    }).catch(function(error) {
                        console.log("Erro ao deletar");
                    });
                })
                reader.readAsText(blob);
            };
            xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
            xhr.send();
          
          }).catch(function(error) {
            // Handle any errors
        });
    } else {
        let count_path = 'TopFamilyAtivosIndividual/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular;
        var pathReference = storage.ref(count_path);
        pathReference.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'
          
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
    
                const reader = new FileReader();
                reader.addEventListener('loadend', () => {
                    pathReference.delete().then(function() {
                        console.log("Deletado da lista de TopFamilyAtivosIndividual");
                    }).catch(function(error) {
                        console.log("Erro ao deletar");
                    });
                })
                reader.readAsText(blob);
            };
            xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
            xhr.send();
          
          }).catch(function(error) {
            // Handle any errors
        });
    }
}

function activate (data) {
    console.log(data);
    var usuario = data;
    usuario.StatusBeneficiario = "I";
    var jsonString = JSON.stringify(usuario, undefined, 2);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
    xhr.send(jsonString);
    // alert("Sucesso");

    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    var marcaDependente = '';
    if (usuario.BeneficiarioTitular == "") {
        marcaDependente = "_TITULAR";
    } else {
        marcaDependente = "_DEPENDENTE_DO_" + usuario.BeneficiarioTitular;
    }

    storageRef.child('TopFamilyAtivos/' + usuario.Nome + '_' + usuario.DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
        console.log('Uploaded string');
    }).catch(function(error) {
        console.log(error);
    });

    if(usuario.CodigoContrato == 171 && marcaDependente == "_TITULAR") {
        storageRef.child('TopFamilyAtivosFamilia/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular).putString(jsonString4, firebase.storage.StringFormat.RAW).then(function(snapshot) {
            console.log('Uploaded string');
        }).catch(function(error) {
            console.log(error);
        });
    } else {
        storageRef.child('TopFamilyAtivosIndividual/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular).putString(jsonString4, firebase.storage.StringFormat.RAW).then(function(snapshot) {
            console.log('Uploaded string');
        }).catch(function(error) {
            console.log(error);
        });
    }
}
