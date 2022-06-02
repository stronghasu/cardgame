// .card를 담은 변수 생성
const cards = document.querySelectorAll(".card ");

let matchedCard = 0;
let cardOne, cardTwo;
// disableDack 로 처음카드가 다시 처음상태로 뒤집히지 않으면 마구눌러도 다른 카드가 뒤집히지않도록 방지함
let disableDack = false;

// flipcard 함수생성
function flipCard(e) {
  let clickedCard = e.target; //카드누를때마다 clickedCard에 타겟을 담아줌

  // 같은카드 두번누르는거 방지
  if (clickedCard !== cardOne && !disableDack) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      //cardOne의값을 clickedCard에 반환한다
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDack = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++; //증가시킨다 매치된값을 by1
    //만약 matched value 가 8이되면 유저는 모든 매치된 카드를 갖게된다(8x2 = 16 cards)
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000); //calling shiffleCard function after 1 sec
    }
    // 만약에 2개의카드가 매치되면 click 을제거해줘서 더이상 유저가 누를수없게합니다
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; //두 카드값을 공백으로만듬
    return (disableDack = false); //카드두개가 맞으면 returning 하게해서 bottom code가 동작하지않게합니다
  }
  // settimeout으로 한번만실행 400초뒤에 흔들리게함
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  // shake,flip 클래스를 둘다 제거 1.2초후에
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; //두 카드값을 공백으로만듬
    disableDack = false;
  }, 1200);
}
// 카드섞는함수
function shuffleCard() {
  //default값으로 다시설정
  matchedCard = 0;
  disableDack = false;
  cardOne = cardTwo = "";

  // 16 items의 배열을 생성하고 각각의 item은 두번 반복된다.
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); //sorting으로 랜덤배열로만든다

  //모든카드의 flip 클래스를 제거하고 랜덤카드로 바꾼다
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
//모든 카드에게 flipcard라는 event 넣기
