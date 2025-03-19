const prompt = require("prompt-sync")();

function principal() {
    console.log("Bem-vindo(a) ao sistema de folha de pagamento!");

    let salarios;
    while (true) {
        salarios = parseFloat(prompt("Digite o valor do salário mínimo: "));
        if (!isNaN(salarios) && salarios > 0) break; 
        console.log("Valor do salário mínimo inválido. Digite um número maior que zero.");
    }

    while (true) {
        let codigo;
        while (true) {
            codigo = parseInt(prompt("Digite seu código de funcionário: "));
            if (!isNaN(codigo) && codigo > 0) break; 
            console.log("Código inválido. O código deve ser um número maior que zero. Tente novamente.");
        }
        let horasTrabalhadas;
        while (true) {
            horasTrabalhadas = parseFloat(prompt("Digite o número de horas trabalhadas no mês: "));
            if (!isNaN(horasTrabalhadas) && horasTrabalhadas > 0) break; 
            console.log("Horas trabalhadas inválidas. O valor deve ser um número maior que zero. Tente novamente.");
        }
        let turno;
        while (true) {
            turno = prompt("Digite o turno de trabalho (M-Matutino, V-Vespertino, N-Noturno): ").toUpperCase();
            if (turno === 'M' || turno === 'V' || turno === 'N') break; 
            console.log("turno invalido. Digite M para Matutino, V para Vespertino ou N para Noturno");
        }
        let categoria;
        while (true) {
            categoria = prompt("Digite a categoria do funcionário (F-Funcionário, G-Gerente): ").toUpperCase();
            if (categoria === 'F' || categoria === 'G') break; 
            console.log("Categoria inválida. Digite F para Funcionário ou G para Gerente. Tente novamente.");
        }

        let valorHora;
        switch (categoria) {
            case 'F': 
                switch (turno) {
                    case 'M': valorHora = 0.10 * salarios / 100; break;
                    case 'V': valorHora = 0.15 * salarios / 100; break;
                    case 'N': valorHora = 0.20 * salarios / 100; break;
                }
                break;
            case 'G': 
                switch (turno) {
                    case 'M': valorHora = 0.30 * salarios / 100; break;
                    case 'V': valorHora = 0.35 * salarios / 100; break;
                    case 'N': valorHora = 0.40 * salarios / 100; break;
                }
                break;
        }

        let salarioInicial = valorHora * horasTrabalhadas;

        let auxilioAlimentacao;
        if (salarioInicial <= 800) auxilioAlimentacao = 0.25 * salarioInicial;
        else if (salarioInicial <= 1200) auxilioAlimentacao = 0.20 * salarioInicial;
        else auxilioAlimentacao = 0.15 * salarioInicial;

        let salarioFinal = salarioInicial + auxilioAlimentacao;

        console.log("\n--- Resumo do Funcionário ---");
        console.log(`Código: ${codigo}`);
        console.log(`Horas trabalhadas: ${horasTrabalhadas}`);
        console.log(`Turno: ${turno}`);
        console.log(`Categoria: ${categoria}`);
        console.log(`Valor da hora trabalhada: R$ ${valorHora.toFixed(2)}`);
        console.log(`Salário inicial: R$ ${salarioInicial.toFixed(2)}`);
        console.log(`Auxílio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}`);
        console.log(`Salário final: R$ ${salarioFinal.toFixed(2)}`);

        let resposta = prompt("Deseja cadastrar outro funcionário? (s/n): ").toLowerCase();
        if (resposta !== 's') break;
    }
}
principal();