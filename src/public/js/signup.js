console.log("Signup frontend javascript file");

// validateSignUp() global funksiya, memberNick va memberPassword esa uning o’z ichidagi local o’zgaruvchilari bo’lib,
// har chaqirilganda $(".class").val() bilan DOM’dan qayta o’qiladi.
// Ular $(function(){}) ning local’lari emas. onsubmit faqat global funksiyani chaqiradi,
//  funksiya ichidagi local’lar esa tashqariga ko’rinmaydi.

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please, insert only jpg, jpeg and png!");
      } else {
        if (uploadFile) {
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
    }
  });
});

function validateSignUp() {
  const memberNick = $(".member-nick").val().trim(),
    memberPhone = $(".member-phone").val().trim(),
    memberPassword = $(".member-password").val(),
    memberConfirmPassword = $(".confirm-password").val();

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

  const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Please, insert image!");
    return false;
  }
}
