// --------------- animation -----------------
// let headerTitle = document.querySelector('#header-title');
// setTimeout(() => {
//     headerTitle.classList.add('animate__animated', 'animate__fadeInUp');
// })

function scrollTrigger(selector, options = {}) {
  let els = document.querySelectorAll(selector)
  els = Array.from(els)
  els.forEach(el => {
    addObserver(el, options)
  })
}

function addObserver(el, options) {
  // Check if `IntersectionObserver` is supported
  if(!('IntersectionObserver' in window)) {
    // Simple fallback
    // The animation/callback will be called immediately so
    // the scroll animation doesn't happen on unsupported browsers
    if(options.cb){
      options.cb(el)
    } else{
      entry.target.classList.add('animate__animated', 'animate__fadeInUp')
    }
    // We don't need to execute the rest of the code
    return
  }
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        if(options.cb) {
          options.cb(el)
        } else{
        //   entry.target.classList.add('active')
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
        observer.unobserve(entry.target)
      }
    })
  }, options)
  observer.observe(el)
}

scrollTrigger('.animate-fadeInUp', {
});