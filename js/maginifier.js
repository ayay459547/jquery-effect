$(function(){
  /**
   * 抓圖片
   */
  let imgUrl = ''
  $.ajax({
    type:"GET",
    url:"https://pixabay.com/api/?key=21826520-96a49335d11f68a80b7f656e6",
    data:{
      q:'girl,snow'
    },
    dataType:'json',
    success: function(response) {
      // console.log(response.hits);
      response.hits.forEach(function(value, index){
        if(value.id === 2896389){
          geturl(value.largeImageURL)
        }
        
      })
    },
    error: function(thrownError) {
      console.log(thrownError);
    }
  })
  /**
   * 給圖片附值
   */
  function geturl(url){
    imgUrl = url
    $('.mark, .big').hide()
    $('.small img, .big img').attr('src', imgUrl)
  }

  $('.small').mouseenter(function () {
    $('.mark, .big').show()
  }).mousemove(function (ev) { 
    let offsetX = ev.pageX - $(this).offset().left
    let offsetY = ev.pageY - $(this).offset().top
    if(offsetX <= 50){
      offsetX = 50
    }
    if(offsetX >= 250){
      offsetX = 250
    }
    if(offsetY <= 40){
      offsetY = 40
    }
    if(offsetY >= 173){
      offsetY = 173
    }
    $('.mark, .big').show()
    $('.mark').css({
      'left': offsetX,
      'top': offsetY
    })

    $('.big img').css({
      'left': -offsetX * 4,
      'top': -offsetY * 4
    })
  }).mouseleave(function () { 
      $('.mark, .big').hide()
  });

})
