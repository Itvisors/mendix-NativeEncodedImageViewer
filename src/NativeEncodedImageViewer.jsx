import { Component, createElement } from "react";
import { Image, PixelRatio, View } from "react-native";

export class NativeEncodedImageViewer extends Component {
    state = {
        layout: null
    };

    render() {
        const { imageNameAttr, imageDataAttr, imageHeightAttr, imageWidthAttr } = this.props;
        if (
            !imageNameAttr ||
            imageNameAttr.status !== "available" ||
            !imageDataAttr ||
            imageDataAttr.status !== "available" ||
            !imageHeightAttr ||
            imageHeightAttr.status !== "available" ||
            !imageWidthAttr ||
            imageWidthAttr.status !== "available"
        ) {
            return null;
        }
        if (!this.state.layout) {
            return <View style={{ flex: 1 }} onLayout={event => this.handleLayoutEvent(event)}></View>;
        }
        // If image data does not start with data:image, set the prefix
        let imageDataPrefix;
        if (imageDataAttr.value.substr(0, 10) === "data:image") {
            imageDataPrefix = "";
        } else {
            // Determine extension, defaults to jpg.
            let extension = "jpg";
            const imageName = imageNameAttr.value;
            if (imageName) {
                const dotPos = imageName.lastIndexOf(".");
                if (dotPos >= 0) {
                    extension = imageName.substr(dotPos + 1);
                }
            }
            imageDataPrefix = "data:image/" + extension + ";base64,";
        }
        // If the image is too wide for the available space, we need to adjust the width/height values.
        // It seems a little weird, but just specifying the resizeMode alone does not cover it.
        const pixelDensity = PixelRatio.get();
        const imageWidth = Number(imageWidthAttr.value);
        const imageHeight = Number(imageHeightAttr.value);
        let displayImageWidth = PixelRatio.roundToNearestPixel(imageWidth / pixelDensity);
        let displayImageHeight = PixelRatio.roundToNearestPixel(imageHeight / pixelDensity);
        // Determine width to use. If fixed width is set and less than available width, use is.
        let widthToUse = this.state.layout.width;
        const { widthMode, viewWidth, heightMode, viewHeight } = this.props;
        if (widthMode && widthMode === "fixed" && viewWidth) {
            const viewWidthValue = Number(viewWidth);
            if (viewWidthValue > 0 && viewWidthValue < widthToUse) {
                widthToUse = viewWidthValue;
            }
        }
        if (displayImageWidth > widthToUse) {
            displayImageHeight = Math.round(displayImageHeight * (this.state.layout.width / displayImageWidth));
            displayImageWidth = widthToUse;
        }
        const viewHeightvalue = viewHeight ? Number(viewHeight) : 0;
        let containerWidth = displayImageWidth;
        let containerHeight = displayImageHeight;
        switch (widthMode) {
            case "maximumSize":
                containerWidth = this.state.layout.width;
                displayImageWidth = this.state.layout.width;
                break;

            default:
                break;
        }
        switch (heightMode) {
            case "square":
                displayImageHeight = displayImageWidth;
                break;

            case "maximumSize":
                containerHeight = this.state.layout.height;
                displayImageHeight = this.state.layout.height;
                break;

            case "fixed":
                if (viewHeightvalue) {
                    displayImageHeight = viewHeightvalue;
                }
                break;

            default:
                break;
        }
        return (
            <View style={{ width: containerWidth, height: containerHeight }}>
                <Image
                    source={{ uri: imageDataPrefix + imageDataAttr.value }}
                    resizeMode={this.props.resizeMode}
                    style={{ width: displayImageWidth, height: displayImageHeight }}
                ></Image>
            </View>
        );
    }

    handleLayoutEvent(event) {
        this.setState({
            layout: event.nativeEvent.layout
        });
    }
}
