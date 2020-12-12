class NbeLightbox{
	constructor(element,options){
        if(!options){
            var options = {};
        }
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
        this.closeBtn = options.closeBtn?options.closeBtn:`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 329.26933 329" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path xmlns="http://www.w3.org/2000/svg" d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" fill="#ffffff" data-original="#000000" style="" class=""/></g></svg>`;
        this.initiate();
    }

    initiate(){
        var self = this;
        var captionsClass = this.captionsClass;
        let el = this.el;
        let neededElements = `
            <div class="nbe-lb-container" style="background-color:${this.bgColor}">
                <p class="lb-caption-title">test caption</p>
                <div id="nbe-lb-close">${self.closeBtn}</div>
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
            $(this).clone().appendTo(".nbe-lb-container .owl-carousel").wrap( "<div class='item' data-caption='"+ captionText +"'></div>" );
            i++;
        });
        var nbeLBOwl = $('.nbe-lb-container .owl-carousel').owlCarousel({
            loop:true,
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
        $('.nbe-lb-container .owl-carousel .owl-nav').wrap(`<div class="nbe-lb-contaienr"></div>`);
        nbeLBOwl.on('changed.owl.carousel', function(event) {
            setTimeout(function(){
                let caption = $(".nbe-lb-container .owl-item.active .item").data("caption");
                $(".lb-caption-title").text(caption);
            },100)
        });
        $("#nbe-lb-close").click(function(){
            $(".nbe-lb-container").fadeOut(1000)
        });
        $(el+" img").click(function(e){
            e.preventDefault();
           var owlItem = $(this).data("owlitem");
            nbeLBOwl.trigger('to.owl.carousel', [owlItem, 0]);
            $(".nbe-lb-container").fadeIn();
        });
    }
}

$(document).ready(function(){
    const someName = new NbeLightbox('.some-class',{
        captionsClass: ".wp-caption-text",
    });

})