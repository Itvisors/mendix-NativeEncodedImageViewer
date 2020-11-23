## NativeEncodedImageViewer
View images from base64 encoded image data.

## Usage
The widget can show base64 encoded images with or without the data:image prefix. If the prefix is not found, it is determined from the file name.

Set the width and height of the image on the widget and choose the resize mode:
- cover: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).
- contain: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
- stretch: Scale width and height independently, This may change the aspect ratio of the src.
- repeat: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.
- center: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.
