function sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "samadbat2000@gmail.com",
      Password: "Samad*123#",
      To: 'samadbat2000@gmail.com',
      From: "samadbat2000@gmail.com",
      Subject: "Sending Email using javascript",
      Body: "Well that was easy!!",
    })
      .then(function (message) {
        alert("mail sent successfully")
      });
  }