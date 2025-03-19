const prompt = require('prompt-sync')();

function contarFaixaEtaria(idade) {
    if (idade <= 12) {
        return "crianca"
    } else if (idade >= 13 && idade <= 17) {
        return "adolescente"
    } else if (idade >= 18 && idade <= 59) {
        return "adulto"
    } else {
        return "idoso"
    }
}

    let crianca = 0
    let adolescente = 0
    let adulto = 0
    let idoso = 0

let continuar = true

while(continuar) {
    let entrada = prompt("Digite a idade da pessoa (ou 'sair' para encerrar): ")

    if (entrada.toLowerCase() === "sair") {
        continuar = false
    } else {
        let idade = parseInt(entrada)
        if (isNaN(idade) || idade < 0) {
            console.log("pfvr, insira uma idade válida")
        } else {
            let faixaEtaria = contarFaixaEtaria(idade)

            switch(faixaEtaria) {
                case "crianca":
                    crianca += 1
                    break
                case "adolescente":
                    adolescente += 1
                    break
                case "adulto":
                    adulto += 1
                    break
                case "idoso":
                    idoso += 1
                    break
            }
            console.log(`Faixa etária ${faixaEtaria}`)
        }
    }
}
console.log("\n--- Resultados Finais ---");
console.log(`Crianças (0-12 anos): ${crianca}`);
console.log(`Adolescentes (13-17 anos): ${adolescente}`);
console.log(`Adultos (18-59 anos): ${adulto}`);
console.log(`Idosos (60+ anos): ${idoso}`);

