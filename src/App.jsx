import { useState } from "react";
import bAzul from "./assets/bananaAzul.png";
import bVermelha from "./assets/bananaVermelha.png";
import bMaca from "./assets/bananaMaca.png";
import bBuracoNegro from "./assets/bananaBN.png";
import carrinho from "./assets/carrinho.png";
import botaoVoltar from "./assets/botaoVoltar.png";
import "./App.css";

function App() {
  const [bAzuis, setBAzuis] = useState(0);
  const [bVermelhas, setBVermelhas] = useState(0);
  const [bMacas, setBMacas] = useState(0);
  const [bBuracoNegros, setBBuracoNegro] = useState(0);
  const [totBananas, setTotBananas] = useState(0);
  const [paginaCarrinho, setPaginaCarrinho] = useState(false);
  const [paginaMercado, setPaginaMercado] = useState(true);

  const addBanana = (tipoBanana) => {
    switch (tipoBanana) {
      case 1:
        setBAzuis(bAzuis + 1);
        break;
      case 2:
        setBVermelhas(bVermelhas + 1);
        break;
      case 3:
        setBMacas(bMacas + 1);
        break;
      case 4:
        setBBuracoNegro(bBuracoNegros + 1);
        break;
    }
    setTotBananas(totBananas + 1);
    // console.log("Bananas azuis:", bAzuis);
    // console.log("Bananas vermelhas:", bVermelhas);
    // console.log("Bananas maçãs:", bMacas);
    // console.log("Bananas buraco negro:", bBuracoNegro);
    // console.log("Bananas totais:", totBananas);
  };

  const controlePaginas = (tipoPagina) => {
    switch (tipoPagina) {
      case 1:
        setPaginaMercado(false);
        setPaginaCarrinho(true);
        break;
      case 2:
        setPaginaMercado(true);
        setPaginaCarrinho(false);
        break;
    }
  };

  const textoBotao = "Adicionar e Comprar";

  return (
    <>
      <header>Mercado de bananas</header>
      <body>
        {paginaMercado && (
          <div className="conjuntoBananas">
            <div className="subTituloEIcone">
              <h1>Bananas diponíveis:</h1>
              <div
                className="carrinhoEQtdeTotal"
                onClick={() => controlePaginas(1)}
              >
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
        {paginaCarrinho && (
          <>
            <div>
              <div className="subTitCarEIcone">
                <img
                  className="iconeVoltar"
                  src={botaoVoltar}
                  onClick={() => controlePaginas(2)}
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
