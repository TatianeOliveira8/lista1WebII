const prompt = require("prompt-sync")()

function calculoFrete(distancia, quantidade, regiao,rastreamento) {
    let precoPorPeca
    switch(regiao) {
        case 1:
            precoPorPeca = 1.2
            break
        case 2:
            precoPorPeca = 1.3
            break
        case 3:
            precoPorPeca = 1.5
            break
        default:
            console.log("região inválida")
            return
    }
    let fretePecas
    if (quantidade <= 1000) {
        fretePecas = quantidade * precoPorPeca
    } else {
        let pecasExcedentes = quantidade - 1000
        fretePecas = (1000 * precoPorPeca) + (pecasExcedentes * precoPorPeca * 0.88)
    }
    let freteKm = distancia
    let taxaRastreamento = rastreamento ? 200 : 0
    let totalFrete = fretePecas + freteKm + taxaRastreamento

    console.log("\n--- Detalhes do Frete ---");
    console.log(`Taxa de rastreamento: R$ ${taxaRastreamento.toFixed(2)}`);
    console.log(`Frete pelas peças transportadas: R$ ${fretePecas.toFixed(2)}`);
    console.log(`Frete por quilômetro percorrido: R$ ${freteKm.toFixed(2)}`);
    console.log(`Total do frete: R$ ${totalFrete.toFixed(2)}`);
    console.log("--------------------------------------");
}
function principal() {
    console.log("bem-vindo(a)")

    let numeroPedidos
    do {
        numeroPedidos = parseInt(prompt("quantos pedidos deseja processar?: "))
    } while (isNaN(numeroPedidos) || numeroPedidos <= 0)
    
    for (let i = 1; i <= numeroPedidos; i += 1) {
        console.log(`\n-- Pedido ${i} ---`)

        let distancia
        do {
            distancia = parseFloat(prompt("digite a distancia em km: "))
        } while (isNaN(distancia) || distancia <= 0)

        let quantidade
        do {
            quantidade = parseInt(prompt("digite a quantidade de pecas "))
        } while (isNaN(quantidade) || quantidade <= 0)

        let regiao
        while (true) {
            regiao = parseInt(prompt("digite a região de destino (1-Sudeste, 2-Sul, 3-Centro-Oeste): "))
            if (regiao >= 1 && regiao <= 3) {
                break
            } else {
                console.log("regiao inválida. digite 1, 2 ou 3")
            }
        }
        let rastreamento = prompt("deseja rastreamento? (s/n): ").toLowerCase() === 's'

        calculoFrete(distancia, quantidade, regiao, rastreamento)
    }
}
principal()