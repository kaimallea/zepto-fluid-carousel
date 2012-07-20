# Fluid Carousel plug-in for Zepto

The purpose of this plug-in is to easily create simple and fluid carousels that can be viewed on different screen sizes.

## Example usage

The following HTML structure is assumed:

	<div class="viewport">
	  <ul>
	    <li>
	      <h2>A caption for the image</h2>
	      <img src="someimage.jpg">
	    </li>
	    <li>
	      <h2>A caption for the image</h2>
	      <img src="someimage.jpg">
	    </li>
	    <li>
	      <h2>A caption for the image</h2>
	      <img src="someimage.jpg">
	    </li>
	  </ul>
	</div>

And the following code would convert it into a carousel:

`$('.viewport').carousel();`

Or with specific options:

	$('.viewport').carousel({
		speed: 5000,
		easing: 'ease-in',
		duration: 200
	});

## Parameters

### circular
Performs a circular loop through all images

_default: `true`_

### speed
The delay, in milliseconds, between image transitions

_default: `5000`_

### easing
The type of animation easing to use:

_default: `ease-in-out`_

Other possible values:

- `linear`
- `ease`
- `ease-in`
- `ease-out`
- `ease-in-out`
- `cubic-bezier(...)`


### duration
The duration, in milliseconds, for animations

_default: `700`_
