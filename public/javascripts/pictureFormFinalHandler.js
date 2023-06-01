const finalForm = document.getElementById("finalForm");
const api_key = "839832329988942";
const cloud_name = "dpqwimjsm";

finalForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const authorization = await fetch("/inventory/get-signature").then(
    (response) => response.json()
  );

  let authorizationData = new FormData();
  authorizationData.append(
    "file",
    event.target.querySelector("[name=picture1]").files[0]
  );
  authorizationData.append("api_key", api_key);
  authorizationData.append("signature", authorization.signature);
  authorizationData.append("timestamp", authorization.timestamp);

  console.log(authorization.signature);

  const cloudinaryResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
    {
      method: "POST",
      body: authorizationData,
    }
  );

  console.log(cloudinaryResponse);

  /*
  const inputsToExclude = [
    "picture1",
    "picture2",
    "picture3",
    "picture4",
    "picture5",
  ];
  const inputsCaught = [];
  inputsToExclude.forEach((input) => {
    let theInput = event.target.querySelector(`[name=${input}]`);
    if (theInput.value) {
      inputsCaught.push(theInput.files[0]);
    }
  });
  if (inputsCaught.length > 0) {
    const promises = [];
    inputsCaught.forEach((input) => {
      //Cloudinary stuff
      const picPromise = new Promise((resolve, reject) => {
        fetch("/inventory/get-signature")
          .then((response) => {
            if (response.ok) {
              response
                .json()
                .then((authorizationData) => {
                  const data = new FormData();
                  data.append("file", input);
                  data.append("api_key", api_key);
                  data.append("signature", authorizationData.signature);
                  data.append("timestamp", authorizationData.timestamp);
                  fetch(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    {
                      method: "POST",
                      body: data,
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  )
                    .then((cloudinaryResponse) => {
                      cloudinaryResponse
                        .json()
                        .then((finalResponse) => resolve(finalResponse))
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => reject(err));
            } else {
              throw new Error("Request for /get-signature failed");
            }
          })
          .catch((error) => reject(error));
      });
      promises.push(picPromise);
    });
    Promise.all(promises)
      .then((results) => {
        results.forEach((result) => console.log(result));
      })
      .catch((err) => console.log(err));
  }
    */
  //event.target.submit();
});
