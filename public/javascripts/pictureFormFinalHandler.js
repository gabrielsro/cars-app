const finalForm = document.getElementById("finalForm");
const api_key = "839832329988942";
const cloud_name = "dpqwimjsm";

finalForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(finalForm);

  //Detect pic inputs to modify
  const picInputs = Array.from(document.querySelectorAll("input[type=file]"));
  const loadedPicInputs = [];
  picInputs.forEach((input) => {
    if (input.value) {
      loadedPicInputs.push({
        element: input,
        position: input.getAttribute("name").match(/\d/)[0],
      });
    }
  });

  //Detect if there are pics to work with and, if so, start working
  if (loadedPicInputs.length > 0) {
    //Get authorization (signature):
    const authorization = await fetch("/inventory/get-signature").then(
      (response) => response.json()
    );

    //Create an array of promises of each pic:
    const promises = loadedPicInputs.map((pic) => {
      const promise = new Promise((resolve, reject) => {
        //Create form to be sent to cloudinary:
        const petition = new FormData();
        petition.append("file", pic.element.files[0]); //Pic
        petition.append("api_key", api_key); //API key
        petition.append("signature", authorization.signature); //Signature
        petition.append("timestamp", authorization.timestamp); //Timestamp

        //Send form to cloudinary:
        fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, {
          method: "POST",
          body: petition,
        })
          .then((cloudinaryResponse) => cloudinaryResponse.json())
          .then((response) => {
            //Pack cloudinary response along with input position and return it:
            resolve({
              public_id: response.public_id,
              version: response.version,
              signature: response.signature,
              position: pic.position,
            });
          })
          .catch((err) => reject(console.log(err)));
      });

      //Promise is ready to go to the array:
      return promise;
    });

    //Once the array is ready, it'll be run in parallel:
    Promise.all(promises)
      .then((result) => {
        return result;
      }) //Security check:
      .then((processedPics) => {
        const formCheck = new FormData();
        processedPics.forEach((p) => {
          formCheck.append("pic", JSON.stringify(p));
        });
        fetch("/inventory/check-pics", {
          method: "POST",
          body: formCheck,
        })
          .then((response) => response.text())
          .then((txt) => {
            const whitelist = txt.split(",");
            processedPics.forEach((p) => {
              if (whitelist.some((w) => w == p.position)) {
                formData.append(`pic${p.position}`, p.public_id);
              }
            });
          });
      }) //Send processed form to backend:
      .then(() => {
        fetch("/inventory/add-car/form-submission", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            window.location.href = response.url;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});
