import { useEffect, useState } from "react";

const apiUrl = "http://localhost:4000";

function App() {
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${apiUrl}/products`);
      const users = await res.json();
      setProducts(users);
    } catch (error) {
      console.log(error);
    }
  };

  const showTotalCost = () => {
    const totalCost = selectedProducts.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    return totalCost;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const submitOrder = async () => {
    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        body: {
          orderItems: selectedProducts,
        },
      });
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {!!products &&
          products.map((product) => (
            <div key={product.id}>
              <button
                className="bg-white rounded-lg text-black p-4 text-center hover:bg-slate-200"
                onClick={() => selectProduct(product)}
              >
                {product.name}
              </button>
            </div>
          ))}
      </div>
      <button onClick={submitOrder} className="p-4 text-md bg-blue-400 w-fit">
        Submit your order
      </button>
      <div>Total cost: {showTotalCost()}</div>
    </div>
  );
}

export default App;
