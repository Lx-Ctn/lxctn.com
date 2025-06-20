import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "../../store/selectors";

/*
Intro have animations :
- Animate in : intro of intro.
- Loading animation : If the app still isn't loaded.
- Animate out : Transitionning intro to app.
*/

const introContainer = document.querySelector("#intro"); // already in the root index.html
const introElement = document.querySelector(".intro-logo");
const lastElementToAnimate = document.querySelector(".x-mask");
let lastStepOfAnimIn = null;
let isAnimInAlreadyCompleted = false;
setTimeout(() => {
	// Sometimes Safari take a little more time to load CSS animations -> delay
	lastStepOfAnimIn = lastElementToAnimate.getAnimations()[0];
	isAnimInAlreadyCompleted = lastStepOfAnimIn.playState !== "running";
}, 0);

const AppLoader = ({ App }) => {
	const isLoaded = useSelector(get.isLoaded);
	const [isAnimInCompleted, setIsAnimInCompleted] = useState(isAnimInAlreadyCompleted);

	// If the app finish to load before the end of the intro drawing :
	useEffect(() => {
		if (!isAnimInAlreadyCompleted) waitEndAnimIn(setIsAnimInCompleted);
	}, []);

	if (isLoaded && isAnimInCompleted) launchAnimateOut();
	return isAnimInCompleted && <App />;
};
export default AppLoader;

/** We wait for the intro to end before displaying the app */
async function waitEndAnimIn(setIsAnimInCompleted) {
	try {
		await lastStepOfAnimIn.finished;
		setIsAnimInCompleted(true);
	} catch (error) {
		console.error("AppLoader/endAnimation : ", error);
	}
}

/** Launch transition animation when the app is ready */
function launchAnimateOut() {
	introElement.style.animationPlayState = "running";
	const endLoadingAnimation = introElement.getAnimations()[0];
	removeIntro(endLoadingAnimation);
}

/** Clean the intro element (loaded before react) */
async function removeIntro(animToWait) {
	try {
		await animToWait.finished;
		introContainer.remove();
	} catch (error) {
		console.error("AppLoader/EndLoadingAnimation : ", error);
	}
}

/* 
Handle page loading : 
*/
const allImgLoadingListener = [];
export const loading = {
	listener: function (ref) {
		const isLoading = new Promise(resolve => {
			const img = ref.current;
			if (img.complete && img.naturalWidth !== 0)
				resolve(true); // If the image is already loaded : 304 Not Modified
			else {
				img.addEventListener("load", () => resolve(true), { once: true });
				img.addEventListener("error", () => resolve(false), { once: true });
			}
		});
		allImgLoadingListener.push(isLoading);
	},

	whenAllisLoaded: function (callBack) {
		Promise.all(allImgLoadingListener).then(allIsloaded => {
			if (allIsloaded.every(isLoaded => isLoaded)) callBack();
			else console.warn("AppLoader/whenAllisLoaded : not all images are loaded");
		});
	},

	cleanUp: function () {
		allImgLoadingListener.length = 0;
	},
};
