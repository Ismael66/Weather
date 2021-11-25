const btnSubmit = document.getElementById("submit");
btnSubmit.onclick = function () {
    const nomeCidade = document.getElementById("inputCidade").value;
    if (nomeCidade != "") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=738389ee730a697aefe2e87b95201610&units=metric`;
        request(url, nomeCidade);
    }
    else
        return;
}
const request = function (url, nomeCidade) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            retornaEstatistica(data, nomeCidade);
        })
        .catch(error => {
            console.log(error);
        });
}
const retornaEstatistica = function (campo, nomeCidade) {
    if (typeof campo === "object")
        document.getElementById("tempCidade").innerHTML = `A temperatura de ${nomeCidade} é de ${campo.main.temp}°C`;
}
