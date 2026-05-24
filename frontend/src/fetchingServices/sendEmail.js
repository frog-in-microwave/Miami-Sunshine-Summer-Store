


// this function is passed the name, email and message with the honeyPot value and does its sends a post request to the backend to send the email
const sendEmail = async (name, email, message, honeyPot) => {
    try {


        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({name, email, message, honeyPot}),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("email sent successfully");
        } else {
            console.log("error in sending email : ", data.message);
        }
    } catch (err) {
      console.log("error in submitting contact form : ", err);
    }
}

export default sendEmail;