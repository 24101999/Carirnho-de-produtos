import styles from "./modal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Modal({ modal, close, prod, remover, add, removeProd }) {
  const [dados, setDados] = useState();

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

  let sum = prod.reduce((a, b) => +a + +b.price, 0);

  return (
    <div className={modal}>
      <div className={styles.modalItemsContent}>
        <div className={styles.hedModal}>
          <div className={styles.hedModalItems}>
            <h2>Carrinho de compras</h2>
            <button onClick={close}>
              <AiFillCloseCircle />
            </button>
          </div>
          <div className={styles.fieldsetModal}>
            {prod
              ? prod.map((p) => {
                  return (
                    <fieldset key={p.id} className={styles.itemModal}>
                      <legend onClick={() => remover(p.id)}>
                        <AiFillCloseCircle />
                      </legend>
                      <div key={p.id} className={styles.img}>
                        <img src={p ? p.photo : ""} alt="" />
                        <p>{p ? p.name : ""}</p>
                      </div>
                      <div className={styles.qtdProduto}>
                        <button
                          onClick={() => removeProd(p.id)}
                          className={styles.btA}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <p>{p.qtd}</p>
                        <button
                          key={p.id}
                          onClick={() => add(p.id)}
                          className={styles.btB}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <p>
                        <strong>R${p ? p.price : ""}</strong>
                      </p>
                    </fieldset>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <div className={styles.footerModal}>
        <div className={styles.valorTotal}>
          <p>Total:</p>
          <p>R${sum}</p>
        </div>
        <div onClick={close} className={styles.block}>
          <h2>Finalizar Compra</h2>
        </div>
      </div>
    </div>
  );
}

export default Modal;
