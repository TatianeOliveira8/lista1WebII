const prompt = require('prompt-sync')(); 

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 16) {
        return "Baixo peso muito grave";
    } else if (imc >= 16 && imc <= 16.99) {
        return "Baixo peso grave";
    } else if (imc >= 17 && imc <= 18.49) {
        return "Baixo peso";
    } else if (imc >= 18.50 && imc <= 24.99) {
        return "Peso normal";
    } else if (imc >= 25 && imc <= 29.99) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc <= 34.99) {
        return "Obesidade grau I";
    } else if (imc >= 35 && imc <= 39.99) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

function iniciar() {
    let continuar = true;

    while (continuar) {
        let peso = parseFloat(prompt("Digite o seu peso em kg: "));
        let altura = parseFloat(prompt("Digite a sua altura em metros: "));

        let imc = calcularIMC(peso, altura);
        let classificacao = classificarIMC(imc);

        console.log(`Seu IMC é ${imc.toFixed(2)} e sua classificação é: ${classificacao}`);

        let resposta = prompt("Deseja calcular outro IMC? (s/n): ").toLowerCase();
        if (resposta !== 's') {
            continuar = false;
        }
    }
}

iniciar();