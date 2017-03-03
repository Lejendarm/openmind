
function bulleStore(e){
    var infobulles;
    var id = parseInt(this.id.replace("check-alert", ""));
    var checked = this.checked;
    chrome.storage.local.get('infobulles', function(results){
        infobulles = results.infobulles;
        if(checked) {
            infobulles[id] = true;
        }
        else {
            infobulles[id] = false;
        }
        chrome.storage.local.set({
            'infobulles': infobulles,
            }
        );
    });
}


function main() {

    var messages = [
        "Ce site n'est pas traité par l'outil.",
        "Un site parodique/satyrique selon LeMonde. Peut être le seul cas utile ou légitime de l'outil, et encore, c'est tellement arbitraire.",
        "Ce site a la chance d'être qualifié de complotiste dans le code de l'application de LeMonde ! Une démarquation qui mérite le détour.",
        "Ce site est mal perçu par l'équipe du journal LeMonde. C'est probablement intéréssant, allez y !",
        "Ce site a reçu la bénédiction de LeMonde. Soyez prudent, prenez en à petite dose."
    ]
    var colors = [
        "#A2A9AE", "#F5A725", "#468847", "#129AF0", "#D50303"
    ];

    var background = chrome.extension.getBackgroundPage();
    console.log(background);
    if(background.debunker == true) {
        document.querySelector(".content #site-name").innerHTML = background.site_actif;
        document.querySelector("#notule").innerHTML = background.notule;
        document.querySelector("#our-opinion").style["color"] = colors[background.note];
        document.querySelector("#our-opinion").innerHTML = messages[background.note];
        document.querySelector("#notule").innerHTML = background.notule;
        document.querySelector("#decodex-window").style.display = "block";
        document.querySelector("#verif").classList.remove("active");
        document.querySelector("#decodex-window").classList.add('active');
        document.querySelector("#more-info").href = "http://www.les-crises.fr/quand-le-monde-ressuscite-l-index-de-l-eglise-catholique/";
    }
    else {
        document.querySelector("#verif").style.display = "block";
        document.querySelector("#decodex-window").classList.remove('active');
        document.querySelector("#verif").classList.add("active");
        document.querySelector("#decodex-window").style.display = "none";

    }

    var params = document.querySelector("#params");
    params.addEventListener("click", function(){
        var parameters = document.querySelector("#parameters");
        if(params.classList.contains("active-p")){
            params.classList.remove("active-p");
            parameters.style.display = "none";
            document.querySelector(".active").style.display = "block";
        }
        else {
            params.classList.add("active-p");
            document.querySelector(".active").style.display = "none";
            parameters.style.display = "block";
        }
    });
    chrome.storage.local.get('infobulles', function(results){
        for(var i=0;i<5;i++){
                if(results.infobulles[i] == true){
                    document.getElementById("check-alert" + i).checked = true;
                }
                else {
                    document.getElementById("check-alert" + i).checked = false;
                }
            }
    });
    document.querySelector('#more-info').addEventListener('click', function(e){
        if(e.target.href!==undefined){
            chrome.tabs.create({url:e.target.href});
        }
        e.preventDefault();
        window.close();
    });
    for(var i=0;i<5;i++){
        document.querySelector("#alert"+i).style.color = colors[i];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    main();
    for(var i=0;i<5;i++){
        document.querySelector('#check-alert'+i).addEventListener('click', bulleStore);
    }
});

