console.log("Signup frontend javascript file");

$(function () {});

function validateSignUp() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const memberConfirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    memberConfirmPassword === ""
  ) {
    alert("Please, fill all input!");
    return false;
  }

  if (memberPassword !== memberConfirmPassword) {
    alert("Password does not match!");
    return false;
  }

  
}
