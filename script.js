/* ==========================================================
   Portal de Cálculos Elétricos — lógica
   ========================================================== */

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);
const num = (id) => parseFloat($(id).value);

/* ---------- Navegação ---------- */
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    $(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

/* ---------- Condutores ---------- */
function calcCondutores() {
    const corrente = num('cond-corrente');
    const tensao = num('cond-tensao');
    const dist = num('cond-dist');
    const queda = num('cond-queda');

    if (!corrente || !dist || !tensao || !queda) return alert('Preencha todos os campos');

    const s = (0.0172 * 2 * dist * corrente) / (tensao * (queda / 100));
    $('val-cond').innerText = s.toFixed(2);
    $('res-condutores').classList.remove('hidden');
}

/* ---------- Luminotécnico (método dos lúmens) ---------- */
function calcLuminotecnico() {
    const comprimento = num('comprimento');
    const largura = num('largura');
    const peDireito = num('pe-direito');
    const lm = num('lumens');
    const lx = num('luminancia');
    const fm = num('fator-manun');
    const fu = num('fator-utili');

    if (!comprimento || !largura || !peDireito || !lm || !lx || !fm ) {
        return alert('Preencha todos os campos');
    }

    // Índice do recinto
    const k = (comprimento * largura) / (peDireito * (comprimento + largura));
    $('val-k').innerText = k.toFixed(2);

    // Nº de luminárias = (E × A) / (Φ × fu × fd)
    const area = comprimento * largura;
    const n = Math.ceil((lx * area) / (lm * fu * fm));

    $('val-n').innerText = n;
    $('res-luminotecnico').classList.remove('hidden');
}

/* ---------- Consumo do mês ---------- */
const listaAparelhos = $('lista-aparelhos');
const mensagem = $('mensagem');
const resultado = $('res-custo');

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
}

function adicionarAparelho() {
    const aparelho = document.createElement('div');
    aparelho.className = 'aparelho';

    aparelho.innerHTML = `
        <div class="campo nome-aparelho">
            <label>Nome do aparelho (opcional)</label>
            <input type="text" class="nome" placeholder="Ex.: Geladeira">
        </div>

        <div class="campo">
            <label>Potência elétrica do aparelho (W)</label>
            <input type="number" class="potencia-consumida" min="0" step="any" placeholder="Ex.: 150">
        </div>

        <div class="campo">
            <label>Número de dias de uso no mês</label>
            <input type="number" class="dias-consumo" min="0" max="31" step="1" value="30">
        </div>

        <div class="campo">
            <label>Horas de uso por dia</label>
            <input type="number" class="horas-uso" min="0" max="24" step="any" placeholder="Ex.: 8">
        </div>

        <button type="button" class="remover">Remover aparelho</button>
    `;

    aparelho.querySelector('.remover').addEventListener('click', () => {
        aparelho.remove();

        // Mantém pelo menos uma linha de aparelho na tela.
        if (listaAparelhos.children.length === 0) {
            adicionarAparelho();
        }

        resultado.hidden = true;
        mensagem.hidden = true;
    });

    listaAparelhos.appendChild(aparelho);
    resultado.hidden = true;
    mensagem.hidden = true;
}

function calcConsumo() {
    mensagem.hidden = true;
    resultado.hidden = true;

    const aparelhos = [...listaAparelhos.querySelectorAll('.aparelho')];
    const custoInput = $('custo-kwh');

    if (custoInput.value === '' || Number(custoInput.value) < 0) {
        mostrarMensagem('Informe um custo do kWh válido.');
        custoInput.focus();
        return;
    }

    let consumoTotal = 0;

    for (let i = 0; i < aparelhos.length; i++) {
        const aparelho = aparelhos[i];

        const potenciaInput = aparelho.querySelector('.potencia-consumida');
        const horasInput = aparelho.querySelector('.horas-uso');
        const diasInput = aparelho.querySelector('.dias-consumo');

        if (potenciaInput.value === '' || horasInput.value === '' || diasInput.value === '') {
            mostrarMensagem(`Preencha potência, horas e dias do aparelho ${i + 1}.`);
            return;
        }

        const potencia = Number(potenciaInput.value);
        const horas = Number(horasInput.value);
        const dias = Number(diasInput.value);

        if (potencia < 0 || horas < 0 || horas > 24 || dias < 0 || dias > 31) {
            mostrarMensagem(`Confira os valores informados para o aparelho ${i + 1}.`);
            return;
        }

        // Consumo do aparelho = potência (W) × horas × dias ÷ 1000
        consumoTotal += (potencia * horas * dias) / 1000;
    }

    const custoMes = consumoTotal * Number(custoInput.value);
    const formato = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    $('val-potencia-total').textContent = consumoTotal.toLocaleString('pt-BR', formato);
    $('val-custo').textContent = custoMes.toLocaleString('pt-BR', formato);

    resultado.hidden = false;
}

$('btn-adicionar').addEventListener('click', adicionarAparelho);

// Cria a primeira linha ao abrir a página.
adicionarAparelho();

/* ---------- Motores ---------- */
function calcMotores() {
    const cv = num('mot-cv');
    const ipin = num('ipin');
    const tipo = $('mot-tipo').value;
    const tensao = num('mot-tensao');

    if (!cv || !ipin || !tensao) return alert('Preencha potência, relação Ip/In e tensão');

    const corrente = tipo === 'trifasico'
        ? (cv * 736) / (1.732 * tensao * 0.85)
        : (cv * 736) / (tensao * 0.8 * 0.85);

    $('val-mot-in').innerText = corrente.toFixed(2);
    $('val-ipin').innerText = (corrente * ipin).toFixed(2);
    $('val-mot-disj').innerText = (corrente * 1.15).toFixed(2);
    $('val-mot-cont').innerText = (corrente * 1.15).toFixed(2);
    $('val-mot-fusi').innerText = (corrente * 1.2).toFixed(2);
    $('val-mot-rele').innerText = corrente.toFixed(2);
    $('res-motores').classList.remove('hidden');
}

/* ---------- Residenciais ---------- */
function calcResidenciais() {
    const area = num('res-area');
    const perim = num('res-perim');

    if (!area || !perim) return alert('Preencha área e perímetro');

    const tomadas = Math.ceil(perim / 5);
    const luz = Math.ceil(area / 6);

    $('val-res-luz').innerText = luz;
    $('val-res-tom').innerText = tomadas;
    $('res-residenciais').classList.remove('hidden');
}

/* ---------- Placas solares ---------- */
function calcPlacas() {
    const energiaMes = num('potencia-eletrica');
    const potenciaPlaca = num('potencia-placa');
    const horasSol = num('horas-sol');
    const dias = num('dias');
    const desempenho = num('desempenho-placa');

    if (!energiaMes || !potenciaPlaca || !horasSol || !dias || !desempenho) {
        return alert('Preencha todos os campos');
    }

    const n = Math.ceil(energiaMes / (horasSol * dias * desempenho * potenciaPlaca));
    $('val-unid').innerText = n;
    $('res-solar').classList.remove('hidden');
}

/* ---------- Ícones Lucide ---------- */
lucide.createIcons();
