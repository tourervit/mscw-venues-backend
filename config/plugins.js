module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {
				format: "jpg"
			},
      delete: {},
    },
		breakpoints: {
			xlarge: 1920,
			large: 1000,
			medium: 750,
			small: 500,
			xsmall: 64
		},
  },	
  // ...
});