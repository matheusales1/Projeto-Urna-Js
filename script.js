const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

let seuVotoPara = c('.voto span');
let cargo = c('.cargo span');
let descricao = c('.nome');
let aviso = c('.d-2');
let lateralImg = c('.d-1-right');
let numeros = c('.numero');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    numero = '';

    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="numer pisca"></div>';
        } else{
            numeroHtml += '<div class="numer"></div>';
    }
}
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralImg.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome:${candidato.nome} <br> Candidato:${candidato.partido} <br>`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-img small"><img src="images/${candidato.fotos[i].url}" alt="">   ${candidato.fotos[i].legenda}</div>`

            }else{
            fotosHtml += `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt="">   ${candidato.fotos[i].legenda}</div>`
        }
     }
        lateralImg.innerHTML = fotosHtml;
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO NULO</div>';
    }    
}


function clicou(n){
    let elNumero = c('.numer.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;     
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca"> VOTO EM BRANCO</div>';

    }else{
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
    }

}

function corrige(){
    comecarEtapa();
}
function confirma(){
    etapa = etapas[etapaAtual];
    let votoConfirmado = true;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:"Branco"

        });
        

    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:numero

        });

    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
            
        }else{
            c('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
        }
    }

}

comecarEtapa();