$(document).ready(function () {
  $("#preloader").hide("slide", {
    direction: "down"
  }, 1000);
    $("#preloader").show("slide", {
    direction: "up"
  }, 1000);
    $("#preloader").hide("slide", {
    direction: "right"
  }, 1000);
  let windowWidth = $(window).width();
  if (windowWidth < 800) {
    $("#iconSection").on("click", 'input[type="radio"]', function () {
      $('.rightBar').show("slide", {
        direction: "up"
      }, 1000);
      $('.closeRightBar').show();
      $('.openRightBar').hide();

      setTimeout(function () {
        $('.iconSection').css("height", "15vh");
      }, 500)
    });

    $(document).on("click", ".closeRightBar", function () {
      $('.rightBar').hide("slide", {
        direction: "down"
      }, 1000);
      setTimeout(function () {
        $('.iconSection').css("height", "calc(100vh - 130px)");
        $('.openRightBar').show();
        $('.closeRightBar').hide();
      }, 500)
    });

    $(document).on("click", '.openRightBar', function () {
      $('.rightBar').show("slide", {
        direction: "up"
      }, 1000);
      $('.closeRightBar').show();
      setTimeout(function () {
        $('.iconSection').css("height", "15vh");
      }, 500);
      $(this).hide();
    });

    $('.rightBar').append("<span class='closeRightBar'><i data-feather='arrow-down'></i></span>");
    $('body').append("<span class='openRightBar'><i data-feather='arrow-up'></i></span>");
  } else {
    $('.openRightBar').hide();
    $('.closeRightBar').hide();
  }
  feather.replace();
});


/* toggle left menu*/
$(".menuIcon").click(function () {
  if ($('.leftBar').hasClass('minifyLeftBar')) {
    $('.menuActions').css("left", "0");
    $('.menuCollapse span').html("Maximize Menu");
    $('.menuCollapse').html("<span>Maximize Menu</span><i data-feather='arrow-right'></i>");
    feather.replace();
  } else {
    $('.menuCollapse').html("<span>Minify Menu</span><i data-feather='arrow-left'></i>");
    feather.replace();

  }
  $(this).next(".menuActions").slideToggle("fast");
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".menuIcon").length) {
      $(".menuActions").slideUp("fast");
    }
  });
});

$('.menuCollapse').click(function () {
  $(".leftBar").toggleClass("minifyLeftBar", "");
  $(".leftBarTopSection").toggleClass("minifyLeftBar", "");
  $(".leftBarMenu").toggleClass("minifyLeftBar", "");
  $(".leftBarAds").toggleClass("minifyLeftBar", "");
  $(".leftBarProfile").toggleClass("minifyLeftBar", "");
  $('.menuActions').toggleClass("d-none d-flex");
})


/*Search*/
$(function () {
  $("#searchIcon").on("keyup", function () {
    var val = $.trim(this.value);
    if ($("#searchIcon").val().length === 0) {
      fetchData();
    } else {
      $("#iconSection").html("");
    }
    if (val) {
      val = val.toLowerCase();
      $.getJSON("/assets/script/data.json", function (data) {
        var html = "";
        count = 0;
        $.each(data, function (key, value) {
          //console.log(val, value.id.toLowerCase().indexOf(val), value)
          if (value.id.toLowerCase().indexOf(val) !== -1) {
            count += 1;
            html +=
              "<div class='iconSectionItem'> <input type='radio' name='radio' id=" +
              value.id +
              " value=" +
              value.id +
              " hidden><label for=" +
              value.id +
              "><i data-feather=" +
              value.id +
              "></i></label></div>";
          }
        });
        $("#iconSection").append(html);
        console.log(count);
        feather.replace();
      });
    }
    setTimeout(function () {
      if ($("#iconSection").children().length === 0) {
        $("#iconSection").append(
          "<div class='zeroIconFound'>That icon not included our masterpiece.</div>"
        );
      }
    }, 5);
  });
});



/*iconsection item auto height*/
let interval = window.setInterval(function () {
  calcItemHeight();
}, 10);

function calcItemHeight() {
  var cw = $(".iconSectionItem").width();
  $(".iconSectionItem").css("height", cw + "px");
}



/*THEME*/
function applyTheme(theme) {
  $('body').removeClass("theme-light theme-dark");
  $('body').addClass('theme-' + theme);
  $('#selTheme').val(theme);
  if($('#selTheme').val() == "light"){
    $('#selTheme').attr("checked",false)
  }
  else{
    $('#selTheme').attr("checked","checked");
  }
}
$(document).ready(function () {
  let savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme);
  let checkbox = $('#selTheme');
  checkbox.on("change",function(){
    if(checkbox.val() == "light"){
      checkbox.val("dark");
      localStorage.setItem('theme','dark');
      applyTheme("dark");
    }
    else{
      checkbox.val("light");
      localStorage.setItem('theme','light');
      applyTheme("light");
    }
  })  
});

/*gradient*/
$(".implementScroll").on("scroll", function () {
  if (
    $(this).scrollTop() + $(this).innerHeight() >=
    $(this)[0].scrollHeight - 100
  ) {
    $(".bottomGradient").hide();
  } else {
    $(".bottomGradient").show();
  }
});