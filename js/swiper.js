$(function(){
  const imgUrl = []
  const imgMax = 5
  $.ajax({
    url: "https://pixabay.com/api/?key=21826520-96a49335d11f68a80b7f656e6",
    data: {
      q: "street"
    },
    dataType: "json",
    success: function(response) {
      response.hits.forEach(function(value){
        if(imgUrl.length < imgMax){
          imgUrl.push(value.largeImageURL)

          if(imgUrl.length >= imgMax){
            imgLoad()
          }
        }
      })
    }
  })

  function imgLoad() {
    imgUrl.forEach(function(value, index){
      $('.swiper ul').append(`<li><img src="${value}"></li>`)
      $('.swiper-btn').append(`<button>${index + 1}</button>`) 
    })
    $('.swiper-btn button').eq(0).attr('class','active')
    $('.swiper ul').append(`<li><img src="${imgUrl[0]}"></li>`)

    
    let isNow = 0 //當前下標
    let timer = null

    $('.swiper-btn button').click(function(){
      isNow = $(this).index()
      tab()
    })

    timer = setInterval(function(){
      tab()
      console.log(isNow);
      isNow++
    },2000)

    function tab(){
      if(isNow >= imgMax){
        isNow = 0
        $('.swiper ul').animate({'top':`-${imgMax * 300}px`},500)
        $('.swiper ul').animate({'top':`-${isNow * 300}px`},0)
      }
      $('.swiper-btn button').eq(isNow).attr('class','active').siblings().attr('class','')
      $('.swiper ul').animate({'top':`-${isNow * 300}px`},500)
    }

    $('.swiper ul').mouseenter(function(){
      clearInterval(timer)
    }).mouseout(function(){
      timer = setInterval(function(){
        tab()
        console.log(isNow);
        isNow++
      },2000)
    })
  }
})