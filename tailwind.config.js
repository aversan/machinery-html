module.exports = {
    purge: [
        './resources/views/**/*.blade.php',
        './resources/twig/**/*.twig',
        './resources/css/**/*.css',
        './resources/scss/**/*.scss',
        './resources/js/**/*.vue',
    ],
    theme: {
        screens: {
          'sm': '640px',
          // => @media (min-width: 640px) { ... }

          'md': '768px',
          // => @media (min-width: 768px) { ... }

          'xl': '1170px',
          // => @media (min-width: 1280px) { ... }
        }
  },
    variants: {},
    plugins: [
        // require('@tailwindcss/custom-forms')
    ]
}