//3
$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  //4
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(200);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });

      const result = response.data;

      if (result.data) {
        $(".new-product-status").blur();
      } else {
        alert("Product update failed");
      }
    } catch (err) {
      console.log(("Error product status:", err));
      alert("Product update failed");
    }
  });
});

//1
function validateForm() {
  const productName = $(".product-name").val().trim();
  const productPrice = $(".product-price").val().trim();
  const productLeftCount = $(".product-left-count").val().trim();
  const productCollection = $(".product-collection").val().trim();
  const productDesc = $(".product-desc").val().trim();
  const productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please, fill all input!");
    return false;
  } else return true;
}

//2
function previewFileHandler(input, order) {
  const imgClassName = input.className;
  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(fileType)) {
    alert("Please, insert only jpg, jpeg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
