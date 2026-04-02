import { useState } from "react";
import bAzul from "./assets/bananaAzul.png";
import bVermelha from "./assets/bananaVermelha.png";
import bMaca from "./assets/bananaMaca.png";
import bBuracoNegro from "./assets/bananaBN.png";
import './App.css'

function App() {
const [count, setCount] = useState(0);

  const textoBotao = "Adicionar e Comprar"

  return (
    <>
      <header>Mercado de bananas</header>
      <body>
        <div className="conjuntoBananas">
          <h1>Bananas diponíveis:</h1>
          <div className="banana">
            <div>
              <img src={bAzul} />
              <h2>Banana Azul</h2>
            </div>
            <button>{textoBotao}</button>
          </div>
          <div className="banana">
            <div>
              <img src={bVermelha} />
              <h2>Banana Vermelha</h2>
            </div>
            <button>{textoBotao}</button>
          </div>
          <div className="banana">
            <div>
              <img src={bMaca} />
              <h2>Banana Maçã</h2>
            </div>
            <button>{textoBotao}</button>
          </div>
          <div className="banana">
            <div>
              <img src={bBuracoNegro} />
              <h2>Banana Buraco Negro</h2>
            </div>
            <button>{textoBotao}</button>
          </div>
        </div>
      </body>
      <footer>Made by JOAOPUG © 2026</footer>
    </>
  );
}

export default App
