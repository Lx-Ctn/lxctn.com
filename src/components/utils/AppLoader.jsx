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
const lastStepOfAnimIn = document.querySelector(".x-mask").getAnimations()[0];
const isAnimInAlreadyCompleted = lastStepOfAnimIn.playState !== "running";

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
			img.addEventListener("load", () => resolve(true));
		});
		allImgLoadingListener.push(isLoading);
	},

	whenAllisLoaded: function (callBack) {
		Promise.all(allImgLoadingListener).then(allIsloaded => {
			if (allIsloaded.every(isLoaded => isLoaded)) callBack();
		});
	},

	cleanUp: function () {
		allImgLoadingListener.length = 0;
	},
};
