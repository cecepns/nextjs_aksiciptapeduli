module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}'], 
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'pinkacp' : '#e91e63',
      'pinkacp-500' :'#c3114e',
      'danger': '#e3342f',
      'lime' : '#84cc16'
     }), 
    

     textColor: theme => ({
      ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'pinkacp' : '#e91e63',
      'danger': '#e3342f',
      'lime' : '#84cc16'
     }),

     ringColor: theme => ({
      ...theme('colors'),
      'ringAcp': '#3490dc',
     }),
    extend: {
      textOpacity: ['dark']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
