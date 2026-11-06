var duration = 0.5;
var delay = 2;
var fading = false;
var fadeTimer;
var fadeIn = '<animateTransform class="fadein" fill="freeze" attributeName="transform"\
                          attributeType="XML"\
                          type="scale"\
                          from="1 1"\
                          to="0 0"\
                          begin="indefinite"\
                          dur="'+duration+'s"\
                          repeatCount="1"/>';
var fadeOut = '<animateTransform class="fadeout" fill="freeze" attributeName="transform"\
                          attributeType="XML"\
                          type="scale"\
                          from="0 0"\
                          to="1 1"\
                          begin="indefinite"\
                          dur="'+duration+'s"\
                          repeatCount="1"/>';

$('svg').on('mouseover click',function() {
  if (fadeTimer) clearTimeout(fadeTimer);
  if (fading) return;
  fading = true;
  $('#top').fadeOut();
  $(this).find('polygon,circle,rect').each(function(){
    
    var origin = {
      x: parseFloat($(this).parent().attr('transform').split(' ')[1]),
      y: parseFloat($(this).parent().attr('transform').split(' ')[2])
    };
    setTimeout(function(){
      $(this).html(fadeIn);
      $(this).find('.fadein')[0].beginElement();
  }.bind(this),delay*(origin.x+origin.y));
  });
});


$('svg').on('mouseleave',function() {
  fading = false;
  fadeTimer = setTimeout(function() {
    $('#top').fadeIn();
  },delay*600);
  $(this).find('polygon, circle, rect').each(function(){
    
    var origin = {
      rot: parseFloat($(this).parent().attr('transform').split(' ')[0]),
      x: parseFloat($(this).parent().attr('transform').split(' ')[1]),
      y: parseFloat($(this).parent().attr('transform').split(' ')[2])
    };
    setTimeout(function(){
      $(this).html(fadeOut);
      $(this).find('.fadeout')[0].beginElement();
  }.bind(this),delay*(origin.x+origin.y));
  });
});