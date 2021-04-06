# Starter Template: Webpack-Three.js-DartSASS

## 								npm  install 

In *development*, we want strong source mapping and a localhost server with live reloading or hot module replacement. In *production*, our goals shift to a focus on minified bundles, lighter weight source  maps, and optimized assets to improve load time. With this logical  separation at hand, we are going to write **separate webpack configurations** for each environment.

While we will separate the *production* and *development*  specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called [`webpack-merge`](https://github.com/survivejs/webpack-merge). With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

## Initial setup

First let's create a directory, initialize npm, [install webpack locally](https://webpack.js.org/guides/installation/#local-installation), and install the [`webpack-cli`](https://github.com/webpack/webpack-cli), [`webpack-merge`](https://github.com/survivejs/webpack-merge).

```diff
cd mywebpacksetup
npm init
npm install --save-dev webpack webpack-cli webpack-merge
```

Now we create three separate files: 

- webpack.common.js
- webpack.dev.js
- webpack.prod.js

```typescript
  |- package.json
 -|- webpack.config.js
 +|- webpack.common.js
 +|- webpack.dev.js
 +|- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
  |- /node_modules
```

In  `webpack.common.js`, we now have setup our `entry` and `output` configuration and we've included any plugins that are required for both environments. 

```typescript
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

In `webpack.dev.js`, we've set `mode` to `development`. Also, we've added the recommended `devtool` for that environment (strong source mapping), as well as our simple `devServer` configuration.

```typescript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
 });
```

Finally, in `webpack.prod.js`,`mode` is set to `production` which loads [`TerserPlugin`](https://webpack.js.org/plugins/terser-webpack-plugin/)

```typescript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');
 module.exports = merge(common, {
   mode: 'production',
 });
```

we could write 

``` npm install @babel/core @babel/preset-env babel-loader file-loader clean-webpack-plugin copy-webpack-plugin css-loader dat.gui html-loader html-webpack-plugin portfinder-sync raw-loader style-loader three webpack-dev-server webpack webpack-cli webpack-merge```

# Three.js

## Resize functions snippet

Re-usable resize function 

```javascript
renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.updateProjectionMatrix()
```



## Device Pixel ratio

To set WebGL pixel ratio to device pixel ratio we can use minimum value, this is to helps in retina display or devices that have smaller pixel sizes. we will use: ```Math.min(window.devicePixelRatio,2)```  in the ```renderer.setPixelRatio()``` function.

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

## Camera fov(field of view)

In order to connect the dimensions of objects  we have to  understand  the fov in three.js. In the following code fov=70 that we have declared. But we want to modify that so we can match the dimension of objrcts 

```javascript
 camera = new THREE.PerspectiveCamera(
     70, 
     width / height,
     0.1,
     1000)
```

![ofCamera | openFrameworks](https://openframeworks.cc/documentation/3d/fov.png)



```javascript
const z = camera.position.z
2 * Math.atan((height / 2) / z) * (180 / Math.PI)
```



# SASS rules walk through

We are using variables to create  multiple themes for our website. At this point we will create light and dark themes, it will help us later to create multiple themes. 

### variable: 

we will add colors in  variables like this:

```scss
$blueish:#0076A3;
$main-color:$blueish;
```

###   nesting:

we will put rules inside other rules. We should not nest too deep. level 3-4 max is okay.

```scss
.body{
    margin: 0;
    padding: 0;
    section{
        background: #fefefe;
    }
    aside{
        background: #ffffff;
        color: #00000;
    }
}
```

### _partials.scss

We will also create partials with a underscore ( _ ) at the beginning of the file name. Later we will import them in the main SCSS.



# Comment Anchors

I have placed anchors within comments or strings to place bookmarks within the context of code. ```// ANCHOR ```  tags are used to create bookmarks. 

In VSCode 'Comment Anchors' plugin must be installed for these tags to work properly. 

- ANCHOR - Used to indicate a section in your file
- TODO - An item that is awaiting completion
- FIXME - An item that requires a bugfix
- STUB - Used for generated default snippets
- NOTE - An important note for a specific code section
- REVIEW - An item that requires additional review
- SECTION - Used to define a region (See 'Hierarchical anchors')
- LINK - Used to link to a file that can be opened within the editor (See 'Link Anchors')

