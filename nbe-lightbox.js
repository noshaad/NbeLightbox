class NbeLightbox{
    constructor(element,options){
        if(!options){
            var options = {};
        }
        this.randText = "nbe"+ Math.floor(Math.random() * 1000 );
        this.el = element;
        this.bgColor = options.bgColor?options.bgColor:"black";//background color of lightbox
        this.captionsClass = options.captionsClass?options.captionsClass:".there-is-no-caption-for-images";//camption must be next to the img
        this.leftBtn = options.leftBtn?options.leftBtn:`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 792.082 792.082" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
            <g transform="matrix(1,0,0,1,0,-1.1368683772161603e-13)">
            <g xmlns="http://www.w3.org/2000/svg">
            <g id="_x37__34_">
                <g>
                    <path d="M317.896,396.024l304.749-276.467c27.36-27.36,27.36-71.677,0-99.037s-71.677-27.36-99.036,0L169.11,342.161     c-14.783,14.783-21.302,34.538-20.084,53.897c-1.218,19.359,5.301,39.114,20.084,53.897l354.531,321.606     c27.36,27.36,71.677,27.36,99.037,0s27.36-71.677,0-99.036L317.896,396.024z" fill="#ffffff" data-original="#000000" style="" class=""/>
                </g>
            </g>
            </g>
            </g>
            </svg>
        `;
        this.rightBtn = options.rightBtn?options.rightBtn:`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 792.082 792.082" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
            <g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,792.0804443359375,792.0810012817382)">
            <g xmlns="http://www.w3.org/2000/svg">
            <g id="_x37__34_">
            <g>
            <path d="M317.896,396.024l304.749-276.467c27.36-27.36,27.36-71.677,0-99.037s-71.677-27.36-99.036,0L169.11,342.161     c-14.783,14.783-21.302,34.538-20.084,53.897c-1.218,19.359,5.301,39.114,20.084,53.897l354.531,321.606     c27.36,27.36,71.677,27.36,99.037,0s27.36-71.677,0-99.036L317.896,396.024z" fill="#ffffff" data-original="#000000" style="" class=""/>
            </g>
            </g>
            </g>
            </g>
            </svg>
        `;
        this.closeBtn = options.closeBtn?options.closeBtn:`
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
  <g id="Group_3524" data-name="Group 3524" transform="translate(-332.75 -42)">
    <circle id="Ellipse_786" data-name="Ellipse 786" cx="22.5" cy="22.5" r="22.5" transform="translate(332.75 42)" fill="#fff"/>
    <line id="Li22ne_4114" data-name="Line 4114" x2="17.5" transform="translate(348.813 58.313) rotate(45)" fill="none" stroke="#3596b5" stroke-linecap="round" stroke-width="2"/>
    <line id="Li22ne_4115" data-name="Line 4115" x2="17.5" transform="translate(361.187 58.313) rotate(135)" fill="none" stroke="#3596b5" stroke-linecap="round" stroke-width="2"/>
  </g>
</svg>

        `;
        this.initiate();
    }

    initiate(){
        var self = this;
        var captionsClass = this.captionsClass;
        let el = this.el;
        var randText = self.randText;
        let neededElements = `
            <div class="${randText} nbe-lb-container" style="background-color:${this.bgColor}">
                <p class="lb-caption-title">test caption</p>
                <div class="nbe-lb-close">${self.closeBtn}</div>
                <div class="owl-carousel owl-theme"></div>
            </div>
        `;

        $(el+" a").click(function(e){
            e.preventDefault();
        });
        $("body").append(neededElements);
        var i=0;
        $(el+" img").each(function(){
            $(this).attr('data-owlItem', i);
            var captionText = $(this).next(captionsClass).text();
            $(this).clone().appendTo("."+ randText +".nbe-lb-container .owl-carousel").wrap( "<div class='item' data-caption='"+ captionText +"'></div>" );
            i++;
        });
        var nbeLBOwl = $("."+ randText +".nbe-lb-container .owl-carousel").owlCarousel({
            loop:false,
            margin:10,
            dots:false,
            nav:true,
            navText:[self.leftBtn,self.rightBtn,],
            responsive:{
                0:{
                    items:1
                },
            }
        })
        $('.nbe-lb-container .owl-carousel .owl-nav').wrap(`<div class="${randText} nbe-lb-contaienr"></div>`);
        nbeLBOwl.on('changed.owl.carousel', function(event) {
            setTimeout(function(){
                let caption = $(".nbe-lb-container .owl-item.active .item").data("caption");
                $(".lb-caption-title").text(caption);
            },100)
        });
        $(".nbe-lb-close").click(function(){
            $("."+ randText +".nbe-lb-container").fadeOut(1000)
        });
        $(el+" img").click(function(e){
            e.preventDefault();
            var owlItem = $(this).data("owlitem");
            nbeLBOwl.trigger('to.owl.carousel', [owlItem, 0]);
            $("."+ randText +".nbe-lb-container").fadeIn();
        });
    }
}

$(document).ready(function(){
    const someName = new NbeLightbox('.some-class',{
        captionsClass: ".wp-caption-text",
    });

})