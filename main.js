//Populate list with years

const scrollerInner = document.querySelector(".scroller__inner");
for (let i = 0; i < 50; i++) {
  let li = document.createElement("li");
  li.textContent = 1950 + i;
  scrollerInner.appendChild(li);
}

const slides = Array.from(scrollerInner.children);

slides[0].classList.add("current-slide");

const nextbtn = document.querySelector(".btnRight");
const prevbtn = document.querySelector(".btnLeft");

//arrange slides next to each other
const scroller = document.querySelector(".scroller");
const leftPosition = scroller.getBoundingClientRect().left;
const rightPosition = scroller.getBoundingClientRect().right;
const scrollerWidth = rightPosition - leftPosition;
const slideLeftPosition = slides[1].getBoundingClientRect().left;
const slideRightPosition = slides[1].getBoundingClientRect().right;
const slideWidth = slideRightPosition - slideLeftPosition;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach((slide, index) => {
  setSlidePosition(slide, index);
});

// Functionality of Carousel
const moveToSlide = (track, targetSlide, currentSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const doUndoButtons = (slides, prevbtn, nextbtn, targetIndex) => {
  const slidesQtyRaw = scrollerWidth / slideWidth;
  const slidesQty = parseInt(slidesQtyRaw, 0);
  if (targetIndex <= 0) {
    prevbtn.classList.remove("btn-active");
    nextbtn.classList.add("btn-active");
  } else if (targetIndex >= slides.length - slidesQty) {
    prevbtn.classList.add("btn-active");
    nextbtn.classList.remove("btn-active");
  } else {
    prevbtn.classList.add("btn-active");
    nextbtn.classList.add("btn-active");
  }
};

//when I click left, move slides to the left

prevbtn.addEventListener("click", (e) => {
  const currentSlide = scrollerInner.querySelector(".current-slide");
  const currentIndex = slides.findIndex((slide) => slide === currentSlide);
  const prevIndexRaw = currentIndex - scrollerWidth / slideWidth;
  let previousIndex = parseInt(prevIndexRaw, 0);

  const previousSlide = previousIndex < 0 ? slides[0] : slides[previousIndex];
  moveToSlide(scrollerInner, previousSlide, currentSlide);
  doUndoButtons(slides, prevbtn, nextbtn, previousIndex);
});

//when I click right, move slides to the right
nextbtn.addEventListener("click", (e) => {
  const currentSlide = scrollerInner.querySelector(".current-slide");
  const currentIndex = slides.findIndex((slide) => slide === currentSlide);
  const nextIndexRaw = scrollerWidth / slideWidth + currentIndex;
  const nextIndex = parseInt(nextIndexRaw, 0);
  const nextSlide = slides[nextIndex];
  if (nextSlide == undefined) {
    return;
  }
  if (nextIndex === -1) {
    return;
  }
  moveToSlide(scrollerInner, nextSlide, currentSlide);
  doUndoButtons(slides, prevbtn, nextbtn, nextIndex);
});
