const prompt = require("prompt-sync")()

function calculoFrete(distancia, quantidade, regiao, rastreamento, precoCombustivel) {
    let precoPorPeca
    switch (regiao) {
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
    let freteKm = distancia * precoCombustivel
    let taxaRastreamento = rastreamento ? 200 : 0
    let totalFrete = fretePecas + freteKm + taxaRastreamento

    console.log("\n--- Detalhes do Frete ---");
    console.log(`Taxa de rastreamento: R$ ${taxaRastreamento.toFixed(2)}`);
    console.log(`Frete pelas peças transportadas: R$ ${fretePecas.toFixed(2)}`);
    console.log(`Frete por quilômetro percorrido: R$ ${freteKm.toFixed(2)}`);
    console.log(`Total do frete: R$ ${totalFrete.toFixed(2)}`);
    console.log("--------------------------------------");

    return totalFrete; 
}

function principal() {
    console.log("bem-vindo(a)")

    let precoCombustivel
    do {
        precoCombustivel = parseFloat(prompt("Digite o preço do litro de combustível: "))
    } while (isNaN(precoCombustivel) || precoCombustivel <= 0)

    let pedidos = []; 

    while (true) {
        console.log("\n--- Novo Pedido ---");

        let codigo
        while (true) {
            codigo = parseInt(prompt("digite o codigo do pedido: "));
            if (!isNaN(codigo) && codigo > 0 && !pedidos.some(p => p.codigo === codigo)) break;
            console.log("Código inválido ou já utilizado. Tente novamente.");
        }

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

        let rastreamento = prompt("Deseja rastreamento? (s/n): ").toLowerCase() === 's';

        let totalFrete = calculoFrete(distancia, quantidade, regiao, rastreamento, precoCombustivel);

        pedidos.push({ codigo, totalFrete, regiao });
        totalPorRegiao[regiao] += totalFrete;

        let continuar = prompt("Deseja adicionar outro pedido? (s/n): ").toLowerCase();
        if (continuar !== 's') break;
    }

    let totalPedidos = pedidos.length;
    let valorTotal = pedidos.reduce((acc, pedido) => acc + pedido.totalFrete, 0);
    let valorMedio = valorTotal / totalPedidos;

    let pedidoCaro = pedidos.reduce((max, pedido) => pedido.totalFrete > max.totalFrete ? pedido : max, pedidos[0]);
    let pedidoBarato = pedidos.reduce((min, pedido) => pedido.totalFrete < min.totalFrete ? pedido : min, pedidos[0]);

    console.log("\n--- Relatório Final ---");
    console.log(`Número total de pedidos: ${totalPedidos}`);
    console.log(`Valor médio pago por pedido: R$ ${valorMedio.toFixed(2)}`);
    console.log(`Valor total acumulado por região:`);
    console.log(`  Sudeste: R$ ${totalPorRegiao[1].toFixed(2)}`);
    console.log(`  Sul: R$ ${totalPorRegiao[2].toFixed(2)}`);
    console.log(`  Centro-Oeste: R$ ${totalPorRegiao[3].toFixed(2)}`);
    console.log(`Pedido mais caro: Código ${pedidoCaro.codigo}, Valor R$ ${pedidoCaro.totalFrete.toFixed(2)}`);
    console.log(`Pedido mais barato: Código ${pedidoBarato.codigo}, Valor R$ ${pedidoBarato.totalFrete.toFixed(2)}`);
}

principal();