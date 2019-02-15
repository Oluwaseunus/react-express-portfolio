const lineClass = 'header__main-line';
const profileName = 'header__main-name';
const job = 'header__main-occupation';
const profilePic = 'header__main-profile';

window.onload = () => {
	document.getElementsByClassName(lineClass)[0].classList.add('expand');
	document.getElementsByClassName(profileName)[0].classList.add('fadeUp');
	document.getElementsByClassName(profilePic)[0].classList.add('fadeUp');
	document.getElementsByClassName(job)[0].classList.add('fadeDown');
};
