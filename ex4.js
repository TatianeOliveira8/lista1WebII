const prompt = require("prompt-sync")();

function principal() {
    console.log("Bem-vindo(a)");

    let salarios;
    while (true) {
        salarios = parseFloat(prompt("Digite o valor do salário mnimo: "));
        if (!isNaN(salarios) && salarios > 0) break; 
        console.log("Valor do salário mínimo inválido. Digite um número maior que zero.");
    }

    let funcionarios = []; 
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
        let avaliacao;
        while (true) {
            avaliacao = parseFloat(prompt("Digite a avaliação de desempenho do funcionário (0 a 10): "));
            if (!isNaN(avaliacao) && avaliacao >= 0 && avaliacao <= 10) break;
            console.log("Avaliação inválida. Digite um número entre 0 e 10.");
        }
        let valorHora;
        switch (categoria) {
            case 'F': 
                switch (turno) {
                    case 'M': valorHora = 0.10 * salarios; break;
                    case 'V': valorHora = 0.15 * salarios; break;
                    case 'N': valorHora = 0.20 * salarios; break;
                }
                break;
            case 'G': 
                switch (turno) {
                    case 'M': valorHora = 0.30 * salarios; break;
                    case 'V': valorHora = 0.35 * salarios; break;
                    case 'N': valorHora = 0.40 * salarios; break;
                }
                break;
        }

        let salarioInicial = valorHora * horasTrabalhadas;

        let auxilioAlimentacao;
        if (salarioInicial <= 800) auxilioAlimentacao = 0.25 * salarioInicial;
        else if (salarioInicial <= 1200) auxilioAlimentacao = 0.20 * salarioInicial;
        else auxilioAlimentacao = 0.15 * salarioInicial;

        let bonusDesempenho;
        if (avaliacao >= 9) bonusDesempenho = 0.10 * salarioInicial;
        else if (avaliacao >= 7) bonusDesempenho = 0.05 * salarioInicial;
        else if (avaliacao >= 5) bonusDesempenho = 0.02 * salarioInicial;
        else bonusDesempenho = 0;

        let salarioFinal = salarioInicial + auxilioAlimentacao + bonusDesempenho;

        funcionarios.push({codigo, horasTrabalhadas, turno, categoria, salarioInicial, auxilioAlimentacao, bonusDesempenho, salarioFinal, avaliacao
        });

        console.log("\n--- Resumo do Funcionário ---");
        console.log(`Código: ${codigo}`);
        console.log(`Horas trabalhadas: ${horasTrabalhadas}`);
        console.log(`Turno: ${turno}`);
        console.log(`Categoria: ${categoria}`);
        console.log(`Valor da hora trabalhada: R$ ${valorHora.toFixed(2)}`);
        console.log(`salaario inicial: R$ ${salarioInicial.toFixed(2)}`);
        console.log(`Auxilio alimentacao: R$ ${auxilioAlimentacao.toFixed(2)}`);
        console.log(`bous de desempenho: R$ ${bonusDesempenho.toFixed(2)}`);
        console.log(`Salario final: R$ ${salarioFinal.toFixed(2)}`);

        let resposta = prompt("Deseja cadastrar outro funcionário? (s/n): ").toLowerCase();
        if (resposta !== 's') break;
    }
    let totalFuncionarios = funcionarios.length;
    let somaSalariosFinais = 0;
    for (let f of funcionarios) {
        somaSalariosFinais += f.salarioFinal;
    }
    let mediaSalarialGeral = somaSalariosFinais / totalFuncionarios;

    let mediaSalarialFuncionarios = funcionarios
        .filter(f => f.categoria === 'F')
        .reduce((acc, f) => acc + f.salarioFinal, 0) / funcionarios.filter(f => f.categoria === 'F').length || 0;

    let mediaSalarialGerentes = funcionarios
        .filter(f => f.categoria === 'G')
        .reduce((acc, f) => acc + f.salarioFinal, 0) / funcionarios.filter(f => f.categoria === 'G').length || 0;

    let maiorSalario = funcionarios.reduce((max, f) => f.salarioFinal > max.salarioFinal ? f : max, funcionarios[0]);
    let menorSalario = funcionarios.reduce((min, f) => f.salarioFinal < min.salarioFinal ? f : min, funcionarios[0]);

    let bonusFaixas = { "10%": 0, "5%": 0, "2%": 0, "0%": 0 };
    funcionarios.forEach(f => {
        if (f.bonusDesempenho === 0.10 * f.salarioInicial) bonusFaixas["10%"]++;
        else if (f.bonusDesempenho === 0.05 * f.salarioInicial) bonusFaixas["5%"]++;
        else if (f.bonusDesempenho === 0.02 * f.salarioInicial) bonusFaixas["2%"]++;
        else bonusFaixas["0%"]++;
    });

    console.log("\nRelatório Final ");
    console.log(`quantidade total de funcionários cadastrados: ${totalFuncionarios}`);
    console.log(`media salarial geral: R$ ${mediaSalarialGeral.toFixed(2)}`);
    console.log(`media salarial dos Funcionários: R$ ${mediaSalarialFuncionarios.toFixed(2)}`);
    console.log(`media salarial dos Gerentes: R$ ${mediaSalarialGerentes.toFixed(2)}`);
    console.log(`maior salário final: Código ${maiorSalario.codigo}, Categoria ${maiorSalario.categoria}, turno ${maiorSalario.turno}, Valor R$ ${maiorSalario.salarioFinal.toFixed(2)}`);
    console.log(`menor salário final: Código ${menorSalario.codigo}, Categoria ${menorSalario.categoria}, Turno ${menorSalario.turno}, Valor R$ ${menorSalario.salarioFinal.toFixed(2)}`);
    console.log("Quantidade de funcionários por faixa de bonus:");
    console.log(`10%: ${bonusFaixas["10%"]}`);
    console.log(`5%: ${bonusFaixas["5%"]}`);
    console.log(`2%: ${bonusFaixas["2%"]}`);
    console.log(`nenhum bônus: ${bonusFaixas["0%"]}`);
}
principal();