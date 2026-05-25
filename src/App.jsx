import { useState, useEffect } from "react";
import bAzul from "./assets/bananaAzul.png";
import bVermelha from "./assets/bananaVermelha.png";
import bMaca from "./assets/bananaMaca.png";
import bBuracoNegro from "./assets/bananaBN.png";
import carrinho from "./assets/carrinho.png";
import botaoVoltar from "./assets/botaoVoltar.png";
import "./App.css";
import { sendFrontendLog } from "./observability";
import fotoFundador from "./assets/fundador.png";

const bananas = [
  {
    nome: "Banana Azul",
    imagem: bAzul,
  },
  {
    nome: "Banana Vermelha",
    imagem: bVermelha,
  },
  {
    nome: "Banana Maçã",
    imagem: bMaca,
  },
  {
    nome: "Banana Buraco Negro",
    imagem: bBuracoNegro,
  },
];

function pegarData() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

function escolherBananaDoDia() {
  const data = pegarData();

  let soma = 0;

  for (let i = 0; i < data.length; i++) {
    soma += data.charCodeAt(i);
  }

  const indice = soma % bananas.length;

  return bananas[indice];
}

function App() {
  const bananaDoDia = escolherBananaDoDia();

  const [bAzuis, setBAzuis] = useState(0);
  const [bVermelhas, setBVermelhas] = useState(0);
  const [bMacas, setBMacas] = useState(0);
  const [bBuracoNegros, setBBuracoNegro] = useState(0);
  const [bananaDoDia, setBananaDoDia] = useState(null);
  const [totBananas, setTotBananas] = useState(0);
  const [pagina, setPagina] = useState(1);

  const trocarPagina = (novaPagina) => {
    setPagina(novaPagina);
    sendFrontendLog("Usuário trocou de página", { pagina: novaPagina });
  };

  const addBanana = (tipoBanana) => {
    switch (tipoBanana) {
      case 1:
        setBAzuis(bAzuis + 1);
        sendFrontendLog("Banana comprada", { tipo: "Banana Azul" });
        break;
      case 2:
        setBVermelhas(bVermelhas + 1);
        sendFrontendLog("Banana comprada", { tipo: "Banana Vermelha" });
        break;
      case 3:
        setBMacas(bMacas + 1);
        sendFrontendLog("Banana comprada", { tipo: "Banana Maçã" });
        break;
      case 4:
        setBBuracoNegro(bBuracoNegros + 1);
        sendFrontendLog("Banana comprada", { tipo: "Banana Buraco Negro" });
        break;
    }
    setTotBananas(totBananas + 1);
    // console.log("Bananas azuis:", bAzuis);
    // console.log("Bananas vermelhas:", bVermelhas);
    // console.log("Bananas maçãs:", bMacas);
    // console.log("Bananas buraco negro:", bBuracoNegro);
    // console.log("Bananas totais:", totBananas);
  };

  /*   const controlePaginas = (tipoPagina) => {
    switch (tipoPagina) {
      case 1:
        setPagina(false);
        break;
      case 2:
        setPagina(true);
        break;
    }
  }; */

  const textoBotao = "Adicionar e Comprar";

  const bananas = [
    {
      nome: "Banana Azul",
      imagem: bAzul,
    },
    {
      nome: "Banana Vermelha",
      imagem: bVermelha,
    },
    {
      nome: "Banana Maça",
      imagem: bMaca,
    },
    {
      nome: "Banana Buraco Negro",
      imagem: bBuracoNegro,
    },
  ];

  function pegarData() {
    return new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Sao_Paulo",
    });
  }

  function escolherBananaDoDia() {
    const data = pegarData();

    let soma = 0;

    for (let i = 0; i < data.length; i++) {
      soma += data.charCodeAt(i);
    }

    const indice = soma % bananas.length;

    return bananas[indice];
  }

  useEffect(() => {
    sendFrontendLog("Banana do dia escolhida", {
      page: 1,
      banana: bananaDoDia.nome,
    });
  }, []);

  return (
    <>
      <header>Mercado de bananas</header>
      <body>
        <div className="menu">
          <h1 onClick={() => trocarPagina(0)}>Home</h1>
          <h1 onClick={() => trocarPagina(1)}>Bananas</h1>
          <h1 onClick={() => trocarPagina(2)}>Sobre nós</h1>
          <h1 onClick={() => trocarPagina(3)}>Banana do dia</h1>
        </div>
        {pagina == 0 && (
          <div className="conjuntoBananas">
            <div className="setorBeneficios">
              <h1>Benefícios da banana:</h1>
              <div className="beneficios">
                <ul>
                  <li>Ajuda músculos e coração</li>
                  <li>Fonte rápida de energia</li>
                  <li>Auxilia no funcionamento do intestino</li>
                  <li>Ajuda a evitar cãibras</li>
                  <li>Dá sensação de saciedade</li>
                  <li>Possui vitaminas B6 e C</li>
                  <li>Pode ajudar no humor e no sono</li>
                  <li>Boa para pré e pós-treino</li>
                  <li>Ajuda no controle da pressão arterial</li>
                  <li>Contém antioxidantes</li>
                </ul>
              </div>
            </div>
            <div className="maisVendida">
              <h1>Banana mais vendida:</h1>
              <div className="destaque">
                <h1>Banana Maçã</h1>
                <img src={bMaca} />
              </div>
            </div>
          </div>
        )}
        {pagina == 1 && (
          <div className="conjuntoBananas">
            <div className="subTituloEIcone">
              <h1>Bananas diponíveis:</h1>
              <div className="carrinhoEQtdeTotal" onClick={() => setPagina(5)}>
                <img src={carrinho} />
                <h1>{totBananas}</h1>
              </div>
            </div>
            <div className="banana">
              <div>
                <img src={bAzul} />
                <h2>Banana Azul</h2>
              </div>
              <button onClick={() => addBanana(1)}>{textoBotao}</button>
            </div>
            <div className="banana">
              <div>
                <img src={bVermelha} />
                <h2>Banana Vermelha</h2>
              </div>
              <button onClick={() => addBanana(2)}>{textoBotao}</button>
            </div>
            <div className="banana">
              <div>
                <img src={bMaca} />
                <h2>Banana Maçã</h2>
              </div>
              <button onClick={() => addBanana(3)}>{textoBotao}</button>
            </div>
            <div className="banana">
              <div>
                <img src={bBuracoNegro} />
                <h2>Banana Buraco Negro</h2>
              </div>
              <button onClick={() => addBanana(4)}>{textoBotao}</button>
            </div>
          </div>
        )}
        {pagina == 2 && (
          <main className="paginaSobreNos">
            <section className="sobreNos">
              <h1>Sobre Nós</h1>

              <p>
                A Banana Market nasceu com o objetivo de aproximar produtores,
                comerciantes e consumidores, oferecendo bananas selecionadas com
                qualidade, agilidade e confiança.
              </p>
            </section>

            <section className="sobreNosHitoria">
              <div className="sobreNosHitoriaTexto">
                <h2>Nossa História</h2>

                <p>
                  Tudo começou em uma pequena feira do interior, onde nosso
                  fundador percebeu que muitos produtores tinham frutas de
                  excelente qualidade, mas enfrentavam dificuldade para vender
                  seus produtos de forma organizada.
                </p>

                <p>
                  Com uma Kombi antiga, algumas caixas de banana e muita vontade
                  de crescer, a primeira entrega foi feita para mercados locais.
                  O cuidado com a seleção das frutas e o compromisso com os
                  prazos fizeram a Mercado de Bananas ganhar confiança
                  rapidamente.
                </p>

                <p>
                  Hoje, seguimos com o mesmo propósito: valorizar o produtor,
                  facilitar a distribuição e garantir que a banana chegue fresca
                  até o consumidor final.
                </p>
              </div>

              <div className="fundador">
                <div className="fotoFundador">
                  <img src={fotoFundador} />
                </div>

                <h3>João Banana</h3>

                <p>
                  Fundador da Mercado de Bananas, conhecido por sua visão
                  simples e eficiente: transformar uma fruta comum em uma
                  operação organizada, confiável e acessível.
                </p>
              </div>
            </section>
          </main>
        )}
        {pagina == 3 && (
          <>
            <div className="conjuntoBananas">
              <section className="bananaDoDia">
                <h1>Banana do Dia</h1>

                <p>A banana escolhida para hoje é:</p>

                <img src={bananaDoDia.imagem} alt={bananaDoDia.nome} />

                <strong>{bananaDoDia.nome}</strong>
              </section>
            </div>
          </>
        )}
        {pagina == 5 && (
          <>
            <div>
              <div className="subTitCarEIcone">
                <img
                  className="iconeVoltar"
                  src={botaoVoltar}
                  onClick={() => setPagina(1)}
                />
                <h1>Estatísticas de compra:</h1>
              </div>
              <div className="bananasCompradas">
                <div className="bananaComprada">
                  <div>
                    <div>
                      <img src={bAzul} />
                      <h2 className="nomeBanana">Banana Azul</h2>
                    </div>
                    <h2 className="totalBanana">{bAzuis}</h2>
                  </div>
                </div>
                <div className="bananaComprada">
                  <div>
                    <div>
                      <img src={bVermelha} />
                      <h2 className="nomeBanana">Banana Vermelha</h2>
                    </div>
                    <h2 className="totalBanana">{bVermelhas}</h2>
                  </div>
                </div>
                <div className="bananaComprada">
                  <div>
                    <div>
                      <img src={bMaca} />
                      <h2 className="nomeBanana">Banana Maçã</h2>
                    </div>
                    <h2 className="totalBanana">{bMacas}</h2>
                  </div>
                </div>
                <div className="bananaComprada">
                  <div>
                    <div>
                      <img src={bBuracoNegro} />
                      <h2 className="nomeBanana">Banana Buraco Negro</h2>
                    </div>
                    <h2 className="totalBanana">{bBuracoNegros}</h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </body>

      <footer>Made by JOAOPUG © 2026</footer>
    </>
  );
}

export default App;
