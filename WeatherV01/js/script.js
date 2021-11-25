const btnSubmit = document.getElementById("submit");
btnSubmit.onclick = function () {
    const nomeCidade = document.getElementById("inputCidade").value;
    const keyApi = "738389ee730a697aefe2e87b95201610";
    if (nomeCidade != "") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${keyApi}&units=metric`;
        requisicao("GET", url, null).then(
            function (response) {
                retornaEstatistica(response, nomeCidade)
            },
            function (response) {
                alert(response.message)
            })
    }
    else
        return;
}
const requisicao = function (operation, url, data) {
    return new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.open(operation, decodeURIComponent(url), true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    request.onreadystatechange = null;
                    const response = JSON.parse(this.responseText);
                    switch (this.status) {
                        case 200:
                        case 204:
                            resolve(response);
                            break;
                        default:
                            reject(response);
                            break;
                    }
                }
            };
            if (typeof (data) === "object" &&
                data !== null)
                request.send(JSON.stringify(data));
            else
                request.send(data);
        }
    );
}
const retornaEstatistica = function (campo, nomeCidade) {
    if (typeof campo === "object")
        document.getElementById("tempCidade").innerHTML = `A temperatura de ${nomeCidade} é de ${campo.main.temp}°C`;
}