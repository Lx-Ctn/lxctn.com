// Webp image format bring better perf but need compatibility fallback

import { useEffect, useRef } from "react";

const ImageWebp = ({ webp, png, jpg, sizes, alt, title, loadingListener, ...props }) => {
	const ref = useRef();

	useEffect(() => {
		if (loadingListener) loadingListener(ref);
	}, [loadingListener]);

	return (
		<picture {...props}>
			{webp && <source srcSet={webp} type="image/webp" {...(sizes && { sizes })} />}
			{png && <source srcSet={png} type="image/png" {...(sizes && { sizes })} />}
			{jpg && <source srcSet={jpg} type="image/jpg" {...(sizes && { sizes })} />}
			<img ref={ref} width="100%" src={png || jpg} alt={alt} {...(title && { title })} />
		</picture>
	);
};

export default ImageWebp;
