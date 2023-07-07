// Webp image format bring better perf but need compatibility fallback

const ImageWebp = ({ webp, png, jpg, alt, title, ...props }) => {
	return (
		<picture {...props}>
			<source srcSet={webp} type="image/webp" />
			{png && <source srcSet={png} type="image/png" />}
			{jpg && <source srcSet={jpg} type="image/jpg" />}
			<img style={{ width: "100%" }} src={png || jpg} alt={alt} title={title || ""} />
		</picture>
	);
};

export default ImageWebp;
