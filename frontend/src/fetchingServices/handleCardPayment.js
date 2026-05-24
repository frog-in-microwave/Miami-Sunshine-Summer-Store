



// this function calls the /checkout endpoint and sends it the cart products, then entering the user into the stripe url
const handleCardPayment = async (cartItems, setLoading) => {

  setLoading(true);

    // validation
    if(!cartItems){
        console.log("the cartItems were not passed to the handleCardPayment function");
        return;
    }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ products: cartItems }),
      },
    );

    if (!response.ok) {
      console.log("error with the response. ", response.message);
      return;
    }
    const data = await response.json();
    console.log("checkout session created successfully. ", data);
    // redirecting to the payment gateway
    window.location.href = data.url;
  } catch (error) {
    console.log("error with the fetch request. ", error.message);
  } finally{
    setLoading(false);
  }
};


export default handleCardPayment;