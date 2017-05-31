# Colibri

A light and easy to use AJAX uploader fully customizable via HTML and CSS with drag & drop support.
  

![](https://media.giphy.com/media/l4FGp62U3cIVgrTxu/giphy.gif)

## Install

### NPM

```
$ npm install --save colibri.js
```

### Standalone

Import CSS:

```html
<link rel="stylesheet" href="colibri.css">
```

Import JS:

```html
<script src="colibri.js"></script>
```

## Use

Colibri is fully extensible via HTML and CSS and requires just a minimum markup:

```html
 <div class="colibri" id="colibri" data-pic="" data-post="http://localhost:5000/upload">
     <label for="file">
         <div>Choose a picture</div>
     </label>
     <input type="file" name="file" id="file" data-message="Upload in progress...">
 </div>
```

Then instanciate colibri:

```html
var colibri = new Colibri('#colibri');
```

Importants elements:

* **class** colibri CSS class
* **data-pic** if there is already a picture, insert path here (leave empty for the first upload) 
* **data-post** URL where the post request will be processed
* **label** put evering you want in it but don't forget the div (mandatory because of flexbox centering system)
* **input** connect input to label (for attribute) and customize uploading message


## Contribute

There is already a small express server capable of receiving the upload.

```bash
$ npm install
$ npm run dev
```

