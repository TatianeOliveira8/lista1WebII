const prompt = require("prompt-sync")()

function calcularMedia(nota1, nota2, nota3) {
    const peso1 = 2
    const peso2 = 5
    const peso3 = 3
    const pesoSoma = peso1 + peso2 + peso3
    const media = ((peso1 * nota1) + (peso2 * nota2)+(peso3 * nota3)) / pesoSoma
    return media
}
function classificarMedia(media) {
    if (media > 9 && media <= 10) {return 'A'}
    else if (media > 8 && media <= 9) {return 'B'}
    else if (media > 7 && media <= 8) {return 'C'}
    else if (media > 6 && media <= 7) {return 'D'}
    else if (media > 5 && media <= 6) {return 'E'}
    else if (media >= 0 && media <= 5) {return 'F'}
    else {return 'media invalida'}
}

function principal() {
    let continuar = true

    while (continuar) {
        const nota1 = parseFloat(prompt("nota da atividade pratica em laboratorio: "))
        const nota2 = parseFloat(prompt("nota da prova do semestre: "))
        const nota3 = parseFloat(prompt("nota do trabalho teorico: "))

        const media = calcularMedia(nota1, nota2, nota3)
        const classificacao = classificarMedia(media)

        console.log(`A média do aluno é = ${media.toFixed(2)} e a sua classificação é ${classificacao}`)

        const resposta = prompt("Deseja calcular a média de outro aluno? (s/n): ").toLowerCase();
        if (resposta !== 's') {
            continuar = false
         }
    }
}
principal()