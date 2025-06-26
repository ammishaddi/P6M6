import { useReducer, useRef, useCallback, useState } from "react";
import './App.css'

const initialState = { products: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        products: [
          ...state.products,
          {
            id: Date.now(),
            name: action.name,
            quantity: 1
          }
        ]
      };
    case "increment":
      return {
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      };
    case "decrement":
      return {
        products: state.products.map(p =>
          p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        )
      };
    case "remove":
      return {
        products: state.products.filter(p => p.id !== action.id)
      };
    default:
      return state;
  }
}

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleAddProduct = () => {
    if (inputRef.current.value.trim() !== "") {
      dispatch({ type: "add", name: inputRef.current.value });
      inputRef.current.value = "";
    }
  };

  const handleIncrement = useCallback((id) => {
    dispatch({ type: "increment", id });
  }, []);

  const handleDecrement = useCallback((id) => {
    dispatch({ type: "decrement", id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: "remove", id });
  }, []);

  const filteredProducts = state.products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="main-card">
      <h2>GESTOR DE INVENTARIO</h2>

      <section>
        <input className="inputs" ref={inputRef} type="text" placeholder="Nombre del producto" />
        <button id="botoncito" onClick={handleAddProduct}>Agregar Producto</button>
      </section>

      <section className="buscador-card">
        <input
        className="buscar"
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src="https://img.icons8.com/ios7/600/search.png" ></img>
      </section>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - Cantidad: {product.quantity}
            <button className="botones" id="primero" onClick={() => handleIncrement(product.id)}>+</button>
            <button className="botones" onClick={() => handleDecrement(product.id)}>-</button>
            <button className="botones" onClick={() => handleRemove(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InventoryManager;
