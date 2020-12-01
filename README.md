## NativeEncodedImageViewer
View images from base64 encoded image data.

## Usage

### data value
The widget can show base64 encoded images with or without the data:image prefix. If the prefix is not found, it is determined from the file name.

### Image dimensions
The widget needs the image dimensions to work properly.
Set the width and height of the image on the widget.

### Resize mode

The available resize modes are the ones React Native provides:
- **Cover**: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).
- **Contain**: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
- **Stretch**: Scale width and height independently, This may change the aspect ratio of the src.
- **Repeat**: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.
- **Center**: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.

### Configure widget dimensions
By default the widget will attempt to display the image fully. If the image is wider than the available space, the image is resized to match the available space, retaining aspect ratio.

The width and height can also be configured.

Set width and height to maximum size for the resize options to have the most effect.

Width options:
- **Image size**: The default, see above
- **Maximum size**: The maximum available width is used
- **Fixed**: Enter a fixed width. Ignored if no width is set

Height options:
- **Image size**: The default, see above
- **Square**: Square, defines a square box where height matches the width used. Useful in lists.
- **Maximum size**: The maximum available height is used
- **Fixed**: Enter a fixed height. Ignored if no height is set
