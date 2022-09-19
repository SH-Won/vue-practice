

const useInfinityScroll = (loading,hasMore,callback) => {
     let observer = null;
     console.log(loading,hasMore);
     const handleScroll = (([entry],ob) => {
        if(entry.isIntersecting){
            callback();
            ob.unobserve(entry.target);
        };
     })

     const lastRef = (el) =>{
        if(!el || loading) return;
        if(el && hasMore){
            observer = new IntersectionObserver(handleScroll,{threshold:0.8});
            observer.observe(el);
        }
     }
     return lastRef;
}
export default useInfinityScroll;