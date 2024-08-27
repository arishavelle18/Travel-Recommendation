const submitBtn = document.getElementsByClassName("submit-btn");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

submitBtn[0].addEventListener("click", () => {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name) throw "Name must be required";
    if (!email) throw "Email must be required";
    if (!message) throw "Message must be required";
    if (!validateEmail(email)) throw "Please put your email correctly";
    toastr.success("Thank you for contacting us");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  } catch (error) {
    toastr.error(error);
  }
});
