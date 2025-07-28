// Webp image format bring better perf but need compatibility fallback

import { useEffect, useRef } from "react";

type ImageWebpProps = {
	title: string;
	alt: string;
	webp?: string;
	png?: string;
	jpg?: string;
	sizes?: string;
	loadingListener?: (ref: React.RefObject<HTMLImageElement>) => void;
} & React.HTMLAttributes<HTMLPictureElement>;

const ImageWebp = ({ webp, png, jpg, sizes, alt, title, loadingListener, ...props }: ImageWebpProps) => {
	const ref = useRef();

	useEffect(() => {
		if (loadingListener) loadingListener(ref);
	}, [loadingListener]);

	return (
		<picture {...props}>
			{webp && <source srcSet={webp} type="image/webp" {...(sizes && { sizes })} />}
			{png && <source srcSet={png} type="image/png" {...(sizes && { sizes })} />}
			{jpg && <source srcSet={jpg} type="image/jpg" {...(sizes && { sizes })} />}
			<img ref={ref} width="100%" src={webp || png || jpg} alt={alt} {...(title && { title })} />
		</picture>
	);
};

export default ImageWebp;
