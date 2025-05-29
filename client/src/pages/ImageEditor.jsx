import React, { useEffect } from "react";

const ImageEditor = () => {
  useEffect(() => {
    const fileInput = document.querySelector(".file-input"),
      filterOptions = document.querySelectorAll(".filter button"),
      filterName = document.querySelector(".filter-info .name"),
      filterValue = document.querySelector(".filter-info .value"),
      filterSlider = document.querySelector(".slider input"),
      rotateOptions = document.querySelectorAll(".rotate button"),
      previewImg = document.querySelector(".preview-img img"),
      resetFilterBtn = document.querySelector(".reset-filter"),
      chooseImgBtn = document.querySelector(".choose-img"),
      saveImgBtn = document.querySelector(".save-img");

    let brightness = "100", saturation = "100", inversion = "0", grayscale = "0",
      contrast = "100", sepia = "0", blur = "0", hue = "0", opacity = "100";
    let rotate = 0, flipHorizontal = 1, flipVertical = 1;

    const applyFilter = () => {
      previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
      previewImg.style.filter = `
        brightness(${brightness}%)
        saturate(${saturation}%)
        invert(${inversion}%)
        grayscale(${grayscale}%)
        contrast(${contrast}%)
        sepia(${sepia}%)
        blur(${blur}px)
        hue-rotate(${hue}deg)
        opacity(${opacity}%)
      `;
    };

    const updateFilter = () => {
      const selectedFilter = document.querySelector(".filter .active");
      const id = selectedFilter.id;
      const value = filterSlider.value;

      if (id === "brightness") brightness = value;
      else if (id === "saturation") saturation = value;
      else if (id === "inversion") inversion = value;
      else if (id === "grayscale") grayscale = value;
      else if (id === "contrast") contrast = value;
      else if (id === "sepia") sepia = value;
      else if (id === "blur") blur = value;
      else if (id === "hue") hue = value;
      else if (id === "opacity") opacity = value;

      const unit = id === "blur" ? "px" : id === "hue" ? "deg" : "%";
      filterValue.innerText = `${value}${unit}`;
      applyFilter();
    };

    filterOptions.forEach(option => {
      option.addEventListener("click", () => {
        document.querySelector(".filter .active")?.classList.remove("active");
        option.classList.add("active");
        filterSlider.disabled = false;
        filterName.innerText = option.innerText;

        const id = option.id;
        if (["brightness", "saturation", "contrast", "opacity"].includes(id)) {
          filterSlider.max = "200";
          filterSlider.value = eval(id);
          filterValue.innerText = `${eval(id)}%`;
        } else if (["inversion", "grayscale", "sepia"].includes(id)) {
          filterSlider.max = "100";
          filterSlider.value = eval(id);
          filterValue.innerText = `${eval(id)}%`;
        } else if (id === "blur") {
          filterSlider.max = "20";
          filterSlider.value = blur;
          filterValue.innerText = `${blur}px`;
        } else if (id === "hue") {
          filterSlider.max = "360";
          filterSlider.value = hue;
          filterValue.innerText = `${hue}deg`;
        } else {
          // Presets
          const presets = {
            pop: { brightness: "120", contrast: "130", saturation: "140" },
            washed: { brightness: "110", contrast: "80", saturation: "70", sepia: "20", grayscale: "10" },
            cool: { brightness: "105", contrast: "95", saturation: "110", hue: "200" },
            warm: { brightness: "110", contrast: "105", saturation: "130", hue: "30", sepia: "10" },
            mono: { brightness: "100", contrast: "100", saturation: "0", grayscale: "100" },
          };
          const preset = presets[id];
          if (preset) {
            brightness = preset.brightness || "100";
            contrast = preset.contrast || "100";
            saturation = preset.saturation || "100";
            hue = preset.hue || "0";
            sepia = preset.sepia || "0";
            grayscale = preset.grayscale || "0";
            inversion = blur = "0";
            opacity = "100";
            rotate = 0; flipHorizontal = 1; flipVertical = 1;
            applyFilter();
            filterSlider.disabled = true;
          }
        }
      });
    });

    rotateOptions.forEach(option => {
      option.addEventListener("click", () => {
        if (option.id === "left") rotate -= 90;
        else if (option.id === "right") rotate += 90;
        else if (option.id === "horizontal") flipHorizontal *= -1;
        else flipVertical *= -1;
        applyFilter();
      });
    });

    resetFilterBtn.addEventListener("click", () => {
      brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
      contrast = "100"; sepia = "0"; blur = "0"; hue = "0"; opacity = "100";
      rotate = 0; flipHorizontal = 1; flipVertical = 1;
      filterSlider.disabled = false;
      filterOptions[0].click();
      applyFilter();
    });

    saveImgBtn.addEventListener("click", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = previewImg.naturalWidth;
      canvas.height = previewImg.naturalHeight;

      ctx.filter = `
        brightness(${brightness}%)
        saturate(${saturation}%)
        invert(${inversion}%)
        grayscale(${grayscale}%)
        contrast(${contrast}%)
        sepia(${sepia}%)
        blur(${blur}px)
        hue-rotate(${hue}deg)
        opacity(${opacity}%)
      `;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2);

      const link = document.createElement("a");
      link.download = "edited-image.jpg";
      link.href = canvas.toDataURL();
      link.click();
    });

    filterSlider.addEventListener("input", updateFilter);
    chooseImgBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      previewImg.src = URL.createObjectURL(file);
      previewImg.onload = () => resetFilterBtn.click();
    });

    const savedImage = localStorage.getItem('aiImage');
    if (savedImage) {
      previewImg.src = savedImage;
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screenp-6 mt-10"
     style={{
        background: 'radial-gradient(circle at center, #f8e1ff 0%, #ffffff 60%)',
      }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl space-y-6">
        <div className="preview-img flex justify-center bg-gray-100 p-4 rounded-xl">
          <img alt="Preview" className="max-h-[400px] max-w-full object-contain rounded-lg shadow-md" />
        </div>

        <input type="file" className="file-input hidden" accept="image/*" />

        <div className="filter grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "brightness", "saturation", "inversion", "grayscale",
            "contrast", "sepia", "blur", "hue",
            "opacity", "pop", "washed", "cool", "warm", "mono"
          ].map((id, i) => (
            <button
              key={id}
              id={id}
              className={`filter-btn px-4 py-2 text-sm rounded-lg font-semibold 
                ${i === 0 ? "active" : ""} 
                bg-purple-100 hover:bg-purple-200 text-purple-800`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <div className="filter-info text-center text-sm font-medium text-gray-700">
          <span className="name">Brightness</span>: <span className="value">100%</span>
        </div>

        <div className="slider">
          <input type="range" min="0" max="200" defaultValue="100" className="w-full accent-purple-600" />
        </div>

        <div className="rotate grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button id="left" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 rounded-lg">Rotate Left</button>
          <button id="right" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 rounded-lg">Rotate Right</button>
          <button id="horizontal" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 rounded-lg">Flip Horizontal</button>
          <button id="vertical" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 rounded-lg">Flip Vertical</button>
        </div>

        <div className="actions flex flex-wrap justify-center gap-4 pt-4">
          <button className="reset-filter bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow">Reset</button>
          <button className="choose-img bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow">Choose Image</button>
          <button className="save-img bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow">Save Image</button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
