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

# Scene Optimizations

First of all we have to see what happens when we first visit a website that has 3D contents in it. We need to add ```Spector.js``` to in chrome of fire-fox browser to see to inspect what is going on behind the 3D render.

- [ ] It fetches data from server and start rendering
- [ ] when we click Spector icon we will se following picture ![image-20210407002049419](C:\Users\M A Islam\AppData\Roaming\Typora\typora-user-images\image-20210407002049419.png) 
- [ ] clicking the red circle will capture every steps to render everything on the screen ![image-20210407002322697](C:\Users\M A Islam\AppData\Roaming\Typora\typora-user-images\image-20210407002322697.png) 
- [ ] We can see there's is  116 commands are completed to add everything on the screen

## What can we do?

From observation, we can see that every objects are added to the scene one by one. We could merge objects in our scene before exporting from Blender. This will be performance increment in this project because we have only one texture and and one large geometry mesh.

## Blender part for optimization

1. ### Select All objects in scene except lights, emissions, camera

2. ### Transfer them into separate collection could name it as "merged"

3. ### Deactivate all objects in other collections other than MERGED   

4. ### Select All objects in MERGED collection scene, remember this collection did not have any lights, camera, or emissions

5. ### Go to 'object mode' and press 'A' twice that should select all objects ![image-20210407003246807](C:\Users\M A Islam\AppData\Roaming\Typora\typora-user-images\image-20210407003246807.png)

6. ### Press "ctrl+J" which will join all objects to one mesh but this action will keep individual mesh names.

7. ### At this stage we can export merged scene and put in the /models/ folder and everything should work just fine. 

8. ### but Since we have only one mesh we could change the traverse function to a single line of code: 

   ```javascript
   const mergedMesh = gltf.scene.children.find(child) => child.name === "merged"
   
   mergedMesh.material = bakedMaterial
   ```

   ### Because we have used "merged" as named for export for joined objects. 

## Test optimization

1. ### Now if we test our results we will see ![image-20210407004125378](C:\Users\M A Islam\AppData\Roaming\Typora\typora-user-images\image-20210407004125378.png)

2. ### It took only 19 commands to load the scene. TADA!! huge improvement. 



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

