function sendEmail() {
  var sender= "samadbat2000@gmail.com";
  var pswd= "SamadAnsari123";
  var reciever= "samad06june@gmail.com";
  var name = Form.firstname.value;
  var subject = Form.subject.value;
  var email = Form.email.value;
  var mesg= Form.message.value;
  Email.send({ 
  Host: "smtp.gmail.com", 
  Username: sender, 
  Password: pswd, 
  To: reciever, 
  From: email, 
  Subject: `${name} send you a message`,
  Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${mesg}`,

  }).then(function (message) { 
    document.getElementById("myForm").reset();
  }); 
  }
