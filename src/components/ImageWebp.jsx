// Webp image format bring better perf but need compatibility fallback

const ImageWebp = ({ webp, png, jpg, sizes, alt, title, ...props }) => {
	return (
		<picture {...props}>
			{webp && <source srcSet={webp} type="image/webp" {...(sizes && { sizes })} />}
			{png && <source srcSet={png} type="image/png" {...(sizes && { sizes })} />}
			{jpg && <source srcSet={jpg} type="image/jpg" {...(sizes && { sizes })} />}
			<img width="100%" src={png || jpg} alt={alt} {...(title && { title })} />
		</picture>
	);
};

export default ImageWebp;
