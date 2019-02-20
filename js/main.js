if ('serviceWorker' in navigator) {

  let serviceWorkerRegistration = navigator.serviceWorker.register('sw.js');

}

function isInViewport(element) {

  const rect = element.getBoundingClientRect();

  return (

    rect.bottom >= 0 &&
    rect.right >= 0 &&

    rect.top <= (
      window.innerHeight ||
      document.documentElement.clientHeight) &&

    rect.left <= (
      window.innerWidth ||
      document.documentElement.clientWidth)

  );

}

function lazyLoad() {

  const images = document.querySelectorAll('img[data-src]');

  if (!images || images.length < 1) {

    window.removeEventListener('scroll', lazyLoad);
    window.removeEventListener('resize', lazyLoad);

    return;

  }

  for (const image of images) {

    if ( isInViewport(image) ) {

      image.src = image.getAttribute('data-src');

    }

  }

}

window.onload = () => {

	//Lazy load the images
	lazyLoad();
	window.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);

};