import styles from "./Home.module.css";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

import Modal from "../components/modal";
function Home() {
  const [dados, setDados] = useState();
  const [prod, setProd] = useState([]);
  const [mditem, setMditem] = useState("");
  const addProd = (id, name, price, photo) => {
    const copyProd = [...prod];

    const item = copyProd.find((prod) => prod.id === id);

    if (!item) {
      copyProd.push({ id: id, qtd: 1, name: name, price: price, photo: photo });
    } else {
      item.qtd = item.qtd + 1;
    }

    setProd(copyProd);
    console.log(prod);
  };

  const addProdQtd = (id) => {
    const copyProd = [...prod];

    const item = copyProd.find((prod) => prod.id === id);

    if (!item) {
      copyProd.push({ id: id, qtd: 1 });
    } else {
      item.qtd = item.qtd + 1;
    }

    console.log(mditem);

    setProd(copyProd);
  };

  const removeProd = (id) => {
    const copyProd = [...prod];

    const item = copyProd.find((prod) => prod.id === id);

    console.log(item);

    const arr = copyProd.filter((prod) => prod.id !== id);

    if (item.qtd < 0) {
      copyProd.filter((prod) => prod.id !== id);
    }

    setProd(arr);
  };
  const removeProdQtd = (id) => {
    const copyProd = [...prod];

    const item = copyProd.find((prod) => prod.id === id);

    if (!item) {
      copyProd.push({ id: id, qtd: 1 });
    } else {
      item.qtd = item.qtd - 1;
    }

    if (item.qtd < 0) {
      item.qtd = 0;
    }

    setProd(copyProd);
    console.log(prod);
  };

  useEffect(() => {
    axios
      .get(
        "https://mks-challenge-api-frontend.herokuapp.com/api/v1/products?page=1&rows=20&sortBy=id&orderBy=DESC"
      )
      .then((res) => {
        const val = res.data;
        setDados(val.products);
      });
  }, []);

  const [modal, setModal] = useState(styles.modalClose);

  const close = () => {
    setModal(styles.modalClose);
  };

  const open = () => {
    setModal(styles.modal);
  };

  return (
    <div className={styles.home}>
      <Modal
        modal={modal}
        close={close}
        prod={prod}
        remover={removeProd}
        add={addProdQtd}
        removeProd={removeProdQtd}
      />
      <nav className={styles.nav}>
        <div className={styles.lognav}>
          <h2>MSK</h2>
          <p>Sistemas</p>
        </div>
        <button onClick={open} className={styles.btShop}>
          <div className={styles.shop}>
            <BsCart4 />
            <p>{prod.length}</p>
          </div>
        </button>
      </nav>
      <div className={styles.items}>
        {dados
          ? dados.map((d, i) => {
              return (
                <div key={d.id} className={styles.item}>
                  <img src={d.photo} alt="" />
                  <div className={styles.infoitem}>
                    <p>{d.name}</p>
                    <p className={styles.price}>R${d.price}</p>
                  </div>
                  <p className={styles.pinfo}>
                    Redesigned from scratch and completely revised.
                  </p>
                  <button
                    onClick={() =>
                      addProd(d.id, d.name, d.price, d.photo) + open
                    }
                  >
                    <FiShoppingBag /> COMPRAR
                  </button>
                </div>
              );
            })
          : ""}
      </div>
      <footer>
        <p>MKS sistemas © Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Home;
