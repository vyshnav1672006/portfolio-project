const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("https://portfolio-backend-c82r.onrender.com/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("status").innerText =
        result.message;

    } catch (error) {

        document.getElementById("status").innerText =
        "Error sending message";
    }
});