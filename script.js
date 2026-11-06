// 1. Lógica do Cronômetro Regressivo de 15 Dias
function startCountdown() {
    let targetDate = localStorage.getItem('manto2026_countdown_target');
    if (!targetDate) {
        const now = new Date();
        targetDate = new Date(now.getTime() + (15 * 24 * 60 * 60 * 1000)).getTime();
        localStorage.setItem('manto2026_countdown_target', targetDate);
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const distance = targetDate - currentTime;

        if (distance < 0) {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 2. Banco de Dados dos 20 Times (Integrado ao template dinâmico)
const timesBrasileirao = [
    // Página 1 (1 a 10)
    { nome: "Flamengo", arquivo: "produto.html?time=flamengo", img: "flamengo.png", pagina: 1 },
    { nome: "Palmeiras", arquivo: "produto.html?time=palmeiras", img: "palmeiras.png", pagina: 1 },
    { nome: "São Paulo", arquivo: "produto.html?time=sao-paulo", img: "sao-paulo.png", pagina: 1 },
    { nome: "Corinthians", arquivo: "produto.html?time=corinthians", img: "corinthians.png", pagina: 1 },
    { nome: "Fluminense", arquivo: "produto.html?time=fluminense", img: "fluminense.png", pagina: 1 },
    { nome: "Botafogo", arquivo: "produto.html?time=botafogo", img: "botafogo.png", pagina: 1 },
    { nome: "Vasco", arquivo: "produto.html?time=vasco", img: "vasco.png", pagina: 1 },
    { nome: "Grêmio", arquivo: "produto.html?time=gremio", img: "gremio.png", pagina: 1 },
    { nome: "Internacional", arquivo: "produto.html?time=internacional", img: "internacional.png", pagina: 1 },
    { nome: "Atlético-MG", arquivo: "produto.html?time=atletico-mg", img: "atletico-mg.png", pagina: 1 },

    // Página 2 (11 a 20)
    { nome: "Cruzeiro", arquivo: "produto.html?time=cruzeiro", img: "cruzeiro.png", pagina: 2 },
    { nome: "Santos", arquivo: "produto.html?time=santos", img: "santos.png", pagina: 2 },
    { nome: "Athletico-PR", arquivo: "produto.html?time=athletico-pr", img: "athletico-pr.png", pagina: 2 },
    { nome: "Bahia", arquivo: "produto.html?time=bahia", img: "bahia.png", pagina: 2 },
    { nome: "Fortaleza", arquivo: "produto.html?time=fortaleza", img: "fortaleza.png", pagina: 2 },
    { nome: "Bragantino", arquivo: "produto.html?time=bragantino", img: "bragantino.png", pagina: 2 },
    { nome: "Ceará", arquivo: "produto.html?time=ceara", img: "ceara.png", pagina: 2 },
    { nome: "Sport", arquivo: "produto.html?time=sport", img: "sport.png", pagina: 2 },
    { nome: "Vitória", arquivo: "produto.html?time=vitoria", img: "vitoria.png", pagina: 2 },
    { nome: "Juventude", arquivo: "produto.html?time=juventude", img: "juventude.png", pagina: 2 }
];

let paginaAtual = 1;
const totalPaginas = 2;

// Função para renderizar os cards dinamicamente na tela
function renderizarTimes() {
    const container = document.getElementById('container-times');
    if (!container) return; // Segurança caso o script corra noutra página
    container.innerHTML = ''; // Limpa o container antes de renderizar

    // Filtra apenas os times da página atual
    const timesDaPagina = timesBrasileirao.filter(time => time.pagina === paginaAtual);

    timesDaPagina.forEach(time => {
        // CORREÇÃO: Utilizando ./img/ para garantir o caminho relativo correto no navegador
        const cardHTML = `
            <a href="${time.arquivo}" class="time-card bg-brandCard border border-white/10 hover:border-gold rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 group">
                <div class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-3 p-2 bg-slate-900/50 rounded-xl">
                    <img src="./img/${time.img}" alt="${time.nome}" class="max-h-full max-w-full object-contain">
                </div>
                <h3 class="font-extrabold text-sm sm:text-base text-white group-hover:text-gold">${time.nome}</h3>
                <span class="text-xs text-brandGreen font-bold mt-1">Ver Mantos →</span>
            </a>
        `;
        container.innerHTML += cardHTML;
    });

    // Atualiza o texto do indicador
    const indicador = document.getElementById('indicador-pagina');
    if (indicador) {
        indicador.innerText = `Página ${paginaAtual} de ${totalPaginas}`;
    }

    // Habilita/Desabilita os botões de seta
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnPrev) btnPrev.disabled = (paginaAtual === 1);
    if (btnNext) btnNext.disabled = (paginaAtual === totalPaginas);
}

// Função chamada ao clicar nas setas
function mudarPagina(direcao) {
    paginaAtual += direcao;
    if (paginaAtual < 1) paginaAtual = 1;
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    
    renderizarTimes();
}

// Inicializações ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    renderizarTimes(); // Desenha os primeiros 10 times na tela
});
