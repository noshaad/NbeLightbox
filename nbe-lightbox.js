class NbeLightbox{
	constructor(element,options){
        this.el = element;
        this.initiate();
    }

    initiate(){
        let neededElements = `
            <div class="nbe-lb-container">
                <div class="owl-carousel">
                    
                </div>
            </div>
        `;
        $("body").append(neededElements);
    }
	
}

$(document).ready(function(){
    const someName = new NbeLightbox('.some-class')

})