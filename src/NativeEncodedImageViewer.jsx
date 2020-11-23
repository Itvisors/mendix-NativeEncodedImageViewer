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
            // console.info("NativeDataImageViewer render, render empty view to get layout data");
            return <View onLayout={event => this.handleLayoutEvent(event)}></View>;
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
        if (displayImageWidth > this.state.layout.width) {
            displayImageHeight = Math.round(displayImageHeight * (this.state.layout.width / displayImageWidth));
            displayImageWidth = this.state.layout.width;
        }
        return (
            <View style={{ height: displayImageHeight }}>
                <Image
                    source={{ uri: imageDataPrefix + imageDataAttr.value }}
                    resizeMode="contain"
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
