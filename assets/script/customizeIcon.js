$(window).on("load", function () {
  resetCustomization();
  fetchData();
    data = localStorage.getItem("history");
    data.push({"id" : 0 ,"iconName":"activity","iconSize":"100","iconRotation":"0","iconStroke":"2","iconColor":"#000000","iconOpacity":"100"})
    localStorage.setItem('history', JSON.stringify(data));
});
$("#iconSection").on("click", 'input[type="radio"]', function () {
  selectIcon($(this));
});
$('#resetCustomizationBtn').click(function () {
  resetCustomization();
});
$("#svg_size").on("change mousemove click", function () {
  changeSizeWithSlider($(this));
  $(this).css("background-size", (($(this).val() - $(this).attr("min")) * 100) / ($(this).attr("max") - $(this).attr("min")) + "% 100%");
});
$("#svg_sizeInput").on("keyup keypress", function () {
  changeSizeWithInput($(this));
});
$("#svg_rotation").on("change mousemove click", function () {
  changeRotationWithSlider($(this));
  $(this).css("background-size", (($(this).val() - $(this).attr("min")) * 100) / ($(this).attr("max") - $(this).attr("min")) + "% 100%");
});
$("#svg_rotationInput").on("keyup keypress", function () {
  changeRotationWithInput($(this));
});
$("#svg_stroke_width").on("change mousemove click", function () {
  changeStrokeWithSlider($(this));
  $(this).css("background-size", (($(this).val() - $(this).attr("min")) * 100) / ($(this).attr("max") - $(this).attr("min")) + "% 100%");
});
$("#svg_stroke_widthInput").on("keyup change", function () {
  changeStrokeWithInput($(this))
});
$("#svg_color").on("change", function () {
  changeColor($(this));
});
$("#svg_opacity").on("keyup", function () {
  changeOpacity($(this));
});
$("#downloadBtn").click(function () {
  var html = $("<div />").append($("#svgContainerBig .icon").children().clone()).html();
  var now = html;
  this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(now);
});


function selectIcon(selector) {
  let selectorVal = selector.val();
  resetCustomization();
  $("#svgContainerBig .iconName").text(selectorVal);
  $("#svgContainerBig .iconSize").text("100 x 100");
  $("#svgContainerBig .icon").html("<i data-feather=" + '"' + selectorVal + '"' + "></i>");
  $("#downloadBtn").attr("download", selectorVal + ".svg");
  $("#svg_color").val("#000000")
  $("#svg_color").prev().html("#000000");
  $("#svgContainerBig svg").children().attr("stroke", "#000000");
  $("#svg_opacity").val("100");
  $("#svgContainerBig svg").children().css("stroke-opacity", "100%");
  feather.replace();

  setTimeout(function(){
    let dataSize = changeSizeWithSlider($("#svg_size"))[1];
    let dataRotation = changeRotationWithSlider($("#svg_rotation"))[1];
    let dataStroke = changeStrokeWithSlider($("#svg_stroke_width"))[1];
    let dataColor = changeColor($("#svg_color"))[1];
    let dataOpacity = changeOpacity($("#svg_opacity"))[1];
    let dataName = $("#svgContainerBig .iconName").text();
    startRecording(dataName,dataSize,dataRotation,dataStroke,dataColor,dataOpacity);
  },5000)

  console.log(selectorVal);
  return true;
}

function resetCustomization(){
  let sizeValInput = $("#svg_sizeInput");
  let rotationValInput = $("#svg_rotationInput");
  let strokeValInput = $("#svg_stroke_widthInput");
  let opacityVal = $("#svg_opacityInput");

  let sizeVal = $("#svg_size");
  let rotationVal = $("#svg_rotation");
  let strokeVal = $("#svg_stroke_width");

  opacityVal.val("100");
  sizeVal.val("100");
  rotationVal.val("0");
  strokeVal.val("2");

  sizeValInput.val("100");
  rotationValInput.val("0");
  strokeValInput.val("2");
  $("#svg_color").val("#000000")
  $("#svg_color").prev().html("#000000");
  $("#svgContainerBig svg").children().attr("stroke", "#000000");
  $("#svg_opacity").val("100");
  $("#svgContainerBig svg").children().css("stroke-opacity", "100%");
  rotationVal.trigger("mousemove");
  sizeVal.trigger("mousemove");
  strokeVal.trigger("mousemove");

}

function changeSizeWithSlider(selector) {
  if (selector.val() > 0 && selector.val() <= 200) {
    $("#svg_sizeInput").val(selector.val());
    $("#svg_size").val(selector.val());
    $(".svgContainerBig .feather").css({
      width: "unset",
      height: "unset",
    });
    $("#svgContainerBig .iconSize").text(selector.val() + " x " + selector.val());
    $("#svgContainerBig svg").attr({
      width: selector.val(),
      height: selector.val(),
    });
    selector.css("background-size", ((selector.val() - selector.attr("min")) * 100) / (selector.attr("max") - selector.attr("min")) + "% 100%");
  } else {
    selector.trigger("click");
    $("#svg_sizeInput").val("200");
    $("#svg_size").val("200");
  }
  return [true, selector.val()];
}

function changeSizeWithInput(selector) {
  if (selector.val() > 0 && selector.val() <= 200) {
    $("#svgContainerBig svg").attr({
      width: selector.val(),
      height: selector.val(),
    });
    $("#svg_size").val(selector.val()).trigger("click");
    selector.trigger("click");
  }
  if (selector.val() > 200) {
    selector.trigger("click");
    $("#svg_sizeInput").val("200");
    $("#svg_size").val("200");
  }
  return [true, selector.val()];
}

function changeRotationWithSlider(selector) {
  if (selector.val() >= 0 && selector.val() <= 360) {
    $("#svg_rotationInput").val(selector.val());
    $("#svgContainerBig svg").css(
      "transform",
      "rotate(" + selector.val() + "deg)"
    );
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  if (selector.val() > 360) {
    $("#svg_rotationInput").val("360");
    $("#svg_rotation").val("360");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  return [true, selector.val()];
}

function changeRotationWithInput(selector) {
  if (selector.val() > 0 && selector.val() <= 360) {
    $("#svgContainerBig svg").css(
      "transform",
      "rotate(" + selector.val() + "deg)"
    );
    $("#svg_rotation").val(selector.val()).trigger("click");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  if (selector.val() > 360) {
    $("#svg_rotationInput").val("360");
    $("#svg_rotation").val("360");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  return [true, selector.val()];
}

function changeStrokeWithSlider(selector) {
  if (selector.val() > 0 && selector.val() <= 3) {
    $("#svg_stroke_widthInput").val(selector.val());

    $("#svgContainerBig svg").css("stroke-width", selector.val());
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  if (selector.val() > 3) {
    $("#svg_stroke_widthInput").val("3");
    $("#svg_stroke_width").val("3");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  return [true, selector.val()];
}

function changeStrokeWithInput(selector) {
  if (selector.val() > 0 && selector.val() <= 3) {
    $("#svgContainerBig svg").css("stroke-width", selector.val());
    $("#svg_stroke_width").val(selector.val()).trigger("click");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  if (selector.val() > 4) {
    $("#svg_stroke_widthInput").val("3");
    $("#svg_stroke_width").val("3");
    selector.css(
      "background-size",
      ((selector.val() - selector.attr("min")) * 100) /
      (selector.attr("max") - selector.attr("min")) +
      "% 100%"
    );
  }
  return [true, selector.val()];
}

function changeColor(selector) {
  selector.prev().html(selector.val());
  $("#svgContainerBig svg").children().attr("stroke", selector.val());
  return [true, selector.val()];
}

function changeOpacity(selector) {
  selector.prev().html(selector.val());
  $("#svgContainerBig svg").children().css("stroke-opacity", "" + selector.val() + "%");
  return [true, selector.val()];
}

function startRecording(dataName,dataSize,dataRotation,dataStroke,dataColor,dataOpacity) {
  var data = JSON.parse(localStorage.getItem('history')); 
  data.push({
    "id" : data[data.length-1].id + 1,
    "iconName":dataName,
    "iconSize":dataSize,
    "iconRotation":dataRotation,
    "iconStroke":dataStroke,
    "iconColor":dataColor,
    "iconOpacity":dataOpacity
    })
  localStorage.setItem('history', JSON.stringify(data));
}





