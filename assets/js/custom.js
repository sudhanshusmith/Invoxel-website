 //testimonials
 var position = $('#about').offset();
 function setCarouselHeight(id)
    {
        var slideHeight = [];
        $(id+' .item').each(function()
        {
            // add all slide heights to an array
            slideHeight.push($(this).height());
        });

        // find the tallest item
        max = Math.max.apply(null, slideHeight);

        // set the slide's height
        $(id+' .carousel-content').each(function()
        {
            $(this).css('height',max+'px');
        });
    }
function menu_height () {
    //the current height
    var y = $(this).scrollTop();

    //If the current Y is bigger than the element. (you scrolled beyond the element)
    if(y >= position.top){
        $('.navbar-default').css('height','70px');
        $('.navbar-default').find('a').css('line-height','25px');
        $('.navbar-brand').hide();
        $('.navbar-brand.small').show();
        $('.logocircle').hide();
        $('.logocircle-small').show();
    }else{
        $('.navbar-default').css('height','70px');
        $('.navbar-default').find('a').css('line-height','25px');
        $('.navbar-brand').show();
        $('.navbar-brand.small').hide();
        $('.logocircle').show();
        $('.logocircle-small').hide();
    }
}
function mobile_height(){
    $('.navbar-default').css('height','70px');
    $('.navbar-default').find('a').css('line-height','25px');
    $('.navbar-brand').hide();
    $('.navbar-brand.small').show().css({'width':'200px', 'margin-left':'25px'});
    $('.logocircle').hide();
    $('.logocircle-small').show();
}
function set_menu_height () {
    if ($('.navbar-toggle').css('display') == 'block')
    {
        mobile_height();
        $('.navbar-collapse').find('a').css('font-size','16px');
    }
    else if ($(window).width()>765 && $(window).width()<=999 )
    {
        mobile_height();
        $('.navbar-collapse').find('a').css('font-size','16px');
        /*if ($(window).width()>990 && $(window).width()<=999 ) 
        $('.navbar-collapse').css('margin-top','0px');  
        else
        $('.navbar-collapse').css('margin-top','-140px');

        $('.navbar-collapse').find('a').css('font-size','16px');*/
    }
    else
    {
        menu_height();

    }
}
$('.navbar-collapse').click('li', function() {
    $('.navbar-collapse').collapse('hide');
});
$(document).ready(function () {
    // SCROLL SCRIPTS 
        $('.navbar-brand').on('click',function(){
            $('.navbar-nav').find('a').removeClass('activelink');
        });

        $('.scroll-me a').bind('click', function (event) { //just pass scroll-me class and start scrolling
        $('.navbar-nav').find('a').removeClass('activelink');
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        $anchor.addClass('activelink');
        event.preventDefault();
        });
  
  setCarouselHeight('#carousel-example');
  set_menu_height ();


});

$('.input__field--kyo').on('focus', function(){
	$('section.bgcolor-3').css('background','#65AABD');
	}).on('blur',function(){$('section.bgcolor-3').css('background','#e8e8e8');});

$('.menu_link').on('click',function(){
    $('.menu_link').removeClass('active');
    $(this).addClass('active');
});

$('#hire').on('click',function(){
    $('#openings').slideToggle();
    $(window).scrollTop($('#openings').offset().top-50);
});

$('.cls_showcase').on('click',function(){
    var image = $(this).children('img');
    var caption = $(this).parent('div').find('.carousel-caption');
    var modal = $('#showcasemodal');
    var modal_img = $(modal).find('.modal-body');
    var modal_title = $(modal).find('.modal-title');
    $(modal_title).text($(caption).text());
    $(modal_img).html($(this).html());
});

$(document).scroll(function () {
    set_menu_height ();
});

$( window ).resize(function() {
    set_menu_height ();
});

$('.cls_social').on('click',function(){
    var url = $(this).data('url');
    window.open(url,'_new');
});

$('.cls_contact').on('click',function(){
    var obj = {};
    var form = $('#contactForm');
    obj.name =  form.find('#name').val();
    obj.email = form.find('#email').val();
    obj.phone = form.find('#phone').val();
    obj.message = form.find('#message').val();
    obj.address = form.find('#address').val();
    obj.website = form.find('#website').val();
    obj.company = form.find('#company').val();
    if(obj.name == "" || obj.email == "" || obj.phone == "" || obj.message == "")
    {
        form.find('#name').addClass('required');
        form.find('#email').addClass('required');
        form.find('#phone').addClass('required');
        form.find('#message').addClass('required');
        alert( "Please fill all the required fields" );
    }
    else 
    {
        form.find('#name').removeClass('required');
        form.find('#email').removeClass('required');
        form.find('#phone').removeClass('required');
        form.find('#message').removeClass('required');
        $.ajax({
          method: "POST",
          url: "contactus.php",
          data: obj
        }).done(function() {
            alert( "Your message has been sent." );
        });
    }
});