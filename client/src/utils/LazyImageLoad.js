const LazyImageLoad = {
    inserted : el => {
        function loadImage(){
            if(el.tagName === 'IMG'){
                el.src = el.dataset.url;
            }
        }
        const handleInterSecting = (entries,ob) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    loadImage();
                    ob.unobserve(el);
                }
            })
        }

        function observe(){
            const observer = new IntersectionObserver(handleInterSecting,{
                threshold:0.1,
            })
            observer.observe(el);
        }
        window['IntersectionObserver'] ? observe() : loadImage();
    }
};

export default LazyImageLoad;