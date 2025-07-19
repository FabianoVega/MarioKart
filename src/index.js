const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function RollDice(){
   return Math.floor(Math.random()*6)+1;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function getRandomBlock(){

    let random =Math.random()
    let result

    switch (true) {
        case random <0.33:
            result = "RETA"
            break;
        
        case random <0.66:
            result = "CURVA"
            break;
    
        default:
            result ="CONFRONTO"
    }

    return result
    
}



async function PlayRace(character1,character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁Rodada ${round}`)


         let block = await getRandomBlock()
            console.log(block)


        let diceResul1 = await RollDice()
        let diceResul2 = await RollDice()
        
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0


        if (block === "RETA") {
            totalTestSkill1 = diceResul1 + character1.VELOCIDADE
            totalTestSkill2 = diceResul2 + character1.VELOCIDADE

            await logRollResult(character1.NOME, "velocidade", diceResul1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "velocidade", diceResul2, character1.VELOCIDADE)
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResul1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResul2 + character1.MANOBRABILIDADE

            await logRollResult(character1.NOME, "manobrabilidade", diceResul1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "manobrabilidade", diceResul2, character1.MANOBRABILIDADE)
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResul1 + character1.PODER
            let powerResult2 = diceResul2 + character2.PODER

            console.log(`🥊${character1.NOME} confrontou com ${character2.NOME}!`)

            await logRollResult(character1.NOME, "poder", diceResul1, character1.PODER)
            await logRollResult(character2.NOME, "poder", diceResul2, character1.PODER)

            character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 :0;

            character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 :0;


            console.log(powerResult1 > powerResult2 ? `${character2.NOME} perdeu um ponto!`: `${character1.NOME} perdeu um ponto!`)
            console.log(powerResult1 === powerResult2 ? 'O confornto resultou em EMPATE!': "")

                        // if (powerResult1 === powerResult2) {
            //     console.log('O confornto resultou em EMPATE!')
            // }
     
        }
        
        if (totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++
        }
        else if (totalTestSkill2 > totalTestSkill1)
            {
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++
        }
   
        console.log('-----------------------------')
   
    }

    console.log(`A pontuação de ${character1.NOME} foi de ${character1.PONTOS} e a pontuação de ${character2.NOME} foi de ${character2.PONTOS}!`)
    console.log(character1.PONTOS === character2.PONTOS ?'EMPATE!' : character1.PONTOS > character2.PONTOS ? `${character1.NOME} GANHOU O JOGO!` : `${character2.NOME} GANHOU O JOGO!` )

}

(async function main(){
    console.log(`🏎️🏁Iniciando corrida entre ${player1.NOME} e ${player2.NOME}...`)

    await PlayRace(player1,player2);

   

})()/*auto invoke */

