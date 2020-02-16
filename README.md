<p align="center"><img width=25% src="https://raw.githubusercontent.com/VarmaMSP/lyre/master/static/github/lyre.jpg?token=AEN7WJX5EG5EHF64KWC7LBC6JEZBQ"></p>
<p align="center">L Y R E</p>


#### Build Instructions

```
> npm run build
> npm run start
```
	   
####  Known Issues with 3rd party libraries:

- Type definitions for bindActionCreators is not overloaded for thunks ( [link](https://github.com/piotrwitek/react-redux-typescript-guide/issues/110), [link](https://github.com/piotrwitek/react-redux-typescript-guide/issues/6), [link](https://github.com/piotrwitek/react-redux-typescript-guide/pull/157) ). This gives of types errors while promise chaining thunks, use await on thunks instead (refer [/pages/trending]()).

- Next Js doest not restore scroll position during navigation ( [link](https://github.com/zeit/next.js/issues/4169), [link](https://github.com/zeit/next.js/issues/3303)). Implemented a custom solution for now (refer [/pages/_app.ts]()).
