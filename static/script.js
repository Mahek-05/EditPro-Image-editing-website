
const previewImg = document.querySelector(".image-box img")
const saveImgBtn = document.querySelector(".save-img");
// const downloadForm = document.querySelector("#downloadForm");
// const imageDataInput = document.querySelector("#imageData");
// const downloadBtn = document.querySelector("#downloadBtn");
// const buttonContainer = document.querySelector("#option-box");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

$(document).ready(function() {
    $('#optionAdjust').click(function() {
      $.ajax({
        url: '/adjust',
        type: 'GET',
        success: function(response) {
            $('#dynamic-text-container').html(response);
                const adjustOptions = document.querySelectorAll(".adjust button")
                const adjustName = document.querySelector(".adjust-info .name")
                const adjustValue = document.querySelector(".adjust-info .value")
                const adjustSlider = document.querySelector(".slider input")
                const resetBtn = document.querySelector(".reset-adjust")


                const applyAdjust = () => {
                    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
                }


                const updateAdjust = () => {
                    adjustValue.innerText = `${adjustSlider.value}%`;
                    const selectedFilter = document.querySelector(".adjust .active");
                    if (selectedFilter.id === "brightness") {
                        brightness = adjustSlider.value;
                    } else if (selectedFilter.id === "saturation") {
                        saturation = adjustSlider.value;
                    } else if (selectedFilter.id === "inversion") {
                        inversion = adjustSlider.value;
                    } else {
                        grayscale = adjustSlider.value;
                    }
                    applyAdjust();
                }


                adjustOptions.forEach(option => {
                    option.addEventListener("click", () => {
                        document.querySelector(".active").classList.remove("active");
                        option.classList.add("active");
                        adjustName.innerText = option.innerText;
                        if (option.id === "brightness") {
                            adjustSlider.max = "200";
                            adjustSlider.value = brightness;
                            adjustValue.innerText = `${brightness}%`;
                        } else if (option.id === "saturation") {
                            adjustSlider.max = "200";
                            adjustSlider.value = saturation;
                            adjustValue.innerText = `${saturation}%`
                        } else if (option.id === "inversion") {
                            adjustSlider.max = "100";
                            adjustSlider.value = inversion;
                            adjustValue.innerText = `${inversion}%`;
                        } else {
                            adjustSlider.max = "100";
                            adjustSlider.value = grayscale;
                            adjustValue.innerText = `${grayscale}%`;
                        }
                    });
                });


                const resetAdjust = () => {
                    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
                    adjustOptions[0].click();
                    applyAdjust();
                }

                adjustSlider.addEventListener("input", updateAdjust);
                resetBtn.addEventListener("click", resetAdjust);
        },


          error: function(xhr, status, error) {
                console.log('Error:', error);
          }


      });
    });

    $('#optionRotate').click(function() {
      $.ajax({
        url: '/rotate',
        type: 'GET',
        success: function(response) {
            $('#dynamic-text-container').html(response);
            const rotateOptions = document.querySelectorAll(".rotate button")
            const resetBtn = document.querySelector(".reset-rotate")
            const applyRotate = () => {
                previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
            }
            rotateOptions.forEach(option => {
                option.addEventListener("click", () => {
                    if(option.id === "left") {
                        rotate -= 90;
                    } else if(option.id === "right") {
                        rotate += 90;
                    } else if(option.id === "horizontal") {
                        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
                    } else {
                        flipVertical = flipVertical === 1 ? -1 : 1;
                    }
                    applyRotate();
                });
            });
            const resetRotate = () => {
                rotate = 0; flipHorizontal = 1; flipVertical = 1;
                applyRotate();
            }

            resetBtn.addEventListener("click", resetRotate);

        },

          error: function(xhr, status, error) {
                console.log('Error:', error);
          }


      });
    });

    $('#optionFilter').click(function() {
      $.ajax({
        url: '/filters',
        type: 'GET',
        success: function(response) {
            $('#dynamic-text-container').html(response);
            const applyFilter = (filterName) => {
                Caman("#myImage", function () {
                    this.revert(true); // Revert to the original image before applying filters
                    this[filterName]();
                    this.render(); // Apply the filter and render the modified image
                });
            };
            const updateFilterOptions = () => {
                const filterButtons = document.querySelectorAll(".filter-option");
                filterButtons.forEach((button) => {
                    button.addEventListener("click", () => {
                        const filterName = button.dataset.filter;
                        applyFilter(filterName);
                    });
                });
            };

            updateFilterOptions();

            },

          error: function(xhr, status, error) {
                console.log('Error:', error);
          }


      });
    });
});

// const saveImage = () => {
//       const imageElement = document.querySelector(".image");
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//
//       // Get the current rotation angle
//       const rotationAngle = rotate % 360;
//
//       // Set the canvas dimensions based on rotation
//       if (rotationAngle === 90 || rotationAngle === 270) {
//         canvas.width = imageElement.naturalHeight;
//         canvas.height = imageElement.naturalWidth;
//       } else {
//         canvas.width = imageElement.naturalWidth;
//         canvas.height = imageElement.naturalHeight;
//       }
//
//       // Apply adjustments using CamanJS
//       Caman(imageElement, function() {
//         this.brightness(parseInt(brightness, 10))
//           .saturation(parseInt(saturation, 10))
//           .invert(parseInt(inversion, 10))
//           .greyscale(parseInt(grayscale, 10))
//           .render(function() {
//             // Rotate the canvas if necessary
//             if (rotationAngle !== 0) {
//               ctx.translate(canvas.width / 2, canvas.height / 2);
//               ctx.rotate((rotationAngle * Math.PI) / 180);
//               ctx.drawImage(
//                 imageElement,
//                 -canvas.height / 2,
//                 -canvas.width / 2,
//                 canvas.height,
//                 canvas.width
//               );
//             } else {
//               ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
//             }
//
//             // Create a link element to download the image
//             const link = document.createElement("a");
//
//             // Set the download attributes
//             link.download = "image.jpg";
//             link.href = canvas.toDataURL();
//
//             // Trigger the download
//             link.click();
//           });
//       });
// };

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

saveImgBtn.addEventListener("click", saveImage);
