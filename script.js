let seuVotoPara = document.querySelector('.d-1--text span');
let cargo = document.querySelector('.d-1--cargo span');
let descricao = document.querySelector('.d-1--complemento');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1--right');
let numeros = document.querySelector('.d-1--numeros');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let fim = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '<span>Número: </span>';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"> </div>`;
        } else {
            numeroHtml += `<div class="numero"> </div>`;
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br>
                               Partido: ${candidato.partido}`;
        aviso.style.display = 'block';
        let fotosHtml = '';
        for(i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1--image small">
                               <img src="images/${candidato.fotos[i].url}" alt="">
                               <span> ${candidato.fotos[i].legenda}</span>
                             </div>`
            } else {
                fotosHtml += `<div class="d-1--image">
                                  <img src="images/${candidato.fotos[i].url} " alt="">
                                  <span> ${candidato.fotos[i].legenda}</span>
                              </div>`
            } 
        }

        lateral.innerHTML = fotosHtml;
    } else {
        //quando é voto nulo
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}
function clicou(n) {
    let elNum = document.querySelector('.numero.pisca');
    if (elNum != null) {
        elNum.innerHTML = n;
        numero = `${numero}${n}`;
        elNum.classList.remove('pisca'); //remove a class atual
        if (elNum.nextElementSibling != null) {
            elNum.nextElementSibling.classList.add('pisca'); //insere no proximo item ao lado dele
        } else {
            atualizaInterface();
        }

    }
}
function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'

    } else if(fim) {
        alert('Voce ja finalizou sua votação');
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!');
    }
}
function corrige() {
    if(fim) {
        alert('Voce ja finalizou sua votação');
    } else {
        comecarEtapa();
    }
    
}
function confirma() {
    if(fim) {
        alert('Voce ja finalizou sua votação');
    } else {
        let etapa = etapas[etapaAtual];
        let votoConf = false;
    
        if(votoBranco === true) {
            votoConf = true;
        } else if(numero.length === etapa.numeros) {
            votoConf = true;
        } else {
            alert('Não pode confirmar');
        }
    
        if(votoConf) {
            etapaAtual++;
            if(etapas[etapaAtual] != undefined) {
                comecarEtapa();
            } else {
                // etapaAtual = 0;
                // comecarEtapa();
                document.querySelector('.tela').innerHTML = `<div class="aviso--grande pisca">FIM</div>`;
                fim = true;
            }
        }
    }
    
}
comecarEtapa();