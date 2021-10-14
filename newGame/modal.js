const home  = document.querySelector(".home-modal");
const about  = document.querySelector(".about-modal");
const intro  = document.querySelector(".intro-modal");
const contactArrow  = document.querySelector(".contact-arrow-modal");
const projectArrow  = document.querySelector(".project-arrow-modal");
const contact  = document.querySelector(".contact-modal");
const social  = document.querySelector(".social-modal");
const contactMore  = document.querySelector(".contact-more-modal");
const liveProject1  = document.querySelector(".live-project1-modal");
const liveProject2  = document.querySelector(".live-project2-modal");
const liveProject3  = document.querySelector(".live-project3-modal");
const repository  = document.querySelector(".repository-modal");


function modalAdd(no) {
	switch(no){
		case 3: home.classList.add("show-modal"); break;
		case 1: intro.classList.add("show-modal"); break;
		case 2: about.classList.add("show-modal"); break;	
		case 5: contactArrow.classList.add("show-modal"); break;
		case 4: projectArrow.classList.add("show-modal"); break;	
		case 10: contact.classList.add("show-modal"); break;	
		case 11: social.classList.add("show-modal"); break;	
		case 12: contactMore.classList.add("show-modal"); break;		
		case 6: liveProject1.classList.add("show-modal"); break;	
		case 7: liveProject2.classList.add("show-modal"); break;	
		case 8: liveProject3.classList.add("show-modal"); break;
		case 9: repository.classList.add("show-modal"); break;	
	}
	
}

function modalRemove(no){
	switch(no){
		case 3: home.classList.remove("show-modal"); break;
		case 1: intro.classList.remove("show-modal"); break;
		case 2: about.classList.remove("show-modal"); break;
		case 5: contactArrow.classList.remove("show-modal"); break;
		case 4: projectArrow.classList.remove("show-modal"); break;
		case 10: contact.classList.remove("show-modal"); break;
		case 11: social.classList.remove("show-modal"); break;
		case 12: contactMore.classList.remove("show-modal"); break;
		case 6: liveProject1.classList.remove("show-modal"); break;
		case 7: liveProject2.classList.remove("show-modal"); break;
		case 8: liveProject3.classList.remove("show-modal"); break;
		case 9: repository.classList.remove("show-modal"); break;
	}
}