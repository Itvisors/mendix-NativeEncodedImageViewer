import { Component, createElement } from "react";
import { Image, PixelRatio, Text, View } from "react-native";

export class NativeEncodedImageViewer extends Component {
    state = {
        layout: null
    };

    render() {
        const { widthMode, viewWidth, heightMode, viewHeight } = this.props;
        const viewWidthvalue = viewWidth ? Number(viewWidth) : 0;
        const viewHeightvalue = viewHeight ? Number(viewHeight) : 0;
        if ((widthMode === "fixed" && heightMode !== "fixed") || (heightMode === "fixed" && widthMode !== "fixed")) {
            return (
                <View>
                    <Text style={{ color: "red", fontSize: 14 }}>
                        For view mode fixed, both width and height must use mode fixed
                    </Text>
                </View>
            );
        }
        if (widthMode === "fixed" && (!viewWidth || viewWidthvalue <= 0)) {
            return (
                <View>
                    <Text style={{ color: "red", fontSize: 14 }}>
                        For fixed width mode, width must be set and positive
                    </Text>
                </View>
            );
        }
        if (heightMode === "fixed" && (!viewHeight || viewHeightvalue <= 0)) {
            return (
                <View>
                    <Text style={{ color: "red", fontSize: 14 }}>
                        For fixed height mode, height must be set and positive
                    </Text>
                </View>
            );
        }
        const { imageDataAttr } = this.props;
        if (!imageDataAttr || imageDataAttr.status !== "available") {
            return null;
        }

        // Unless fixed mode is used, return a div that gives us the available space.
        if (!this.state.layout && heightMode !== "fixed") {
            return <View style={{ flex: 1 }} onLayout={event => this.handleLayoutEvent(event)}></View>;
        }

        // If image data does not start with data:image, set the prefix
        let imageDataPrefix;
        if (imageDataAttr.value.substr(0, 10) === "data:image") {
            imageDataPrefix = "";
        } else {
            // Determine extension, defaults to jpg.
            let extension = "jpg";
            const { imageNameAttr } = this.props;
            const imageName = imageNameAttr?.value;
            if (imageName) {
                const dotPos = imageName.lastIndexOf(".");
                if (dotPos >= 0) {
                    extension = imageName.substr(dotPos + 1);
                }
            }
            imageDataPrefix = "data:image/" + extension + ";base64,";
        }

        let displayImageWidth = 0;
        let displayImageHeight = 0;
        let containerWidth = 0;
        let containerHeight = 0;

        if (widthMode === "fixed") {
            displayImageWidth = viewWidthvalue;
            displayImageHeight = viewHeightvalue;
            containerWidth = viewWidthvalue;
            containerHeight = viewHeightvalue;
        } else {
            // If the image is too wide for the available space, we need to adjust the width/height values.
            // It seems a little weird, but just specifying the resizeMode alone does not cover it.
            const pixelDensity = PixelRatio.get();
            const { imageHeightAttr, imageWidthAttr } = this.props;
            const imageWidth = imageWidthAttr?.value ? Number(imageWidthAttr.value) : viewWidthvalue;
            const imageHeight = imageHeightAttr?.value ? Number(imageHeightAttr.value) : viewHeightvalue;
            displayImageWidth = PixelRatio.roundToNearestPixel(imageWidth / pixelDensity);
            displayImageHeight = PixelRatio.roundToNearestPixel(imageHeight / pixelDensity);
            // Determine width to use. If fixed width is set and less than available width, use is.
            const widthToUse = this.state.layout.width;
            if (displayImageWidth > widthToUse) {
                displayImageHeight = Math.round(displayImageHeight * (this.state.layout.width / displayImageWidth));
                displayImageWidth = widthToUse;
            }
            containerWidth = displayImageWidth;
            containerHeight = displayImageHeight;
            if (widthMode === "maximumSize") {
                containerWidth = this.state.layout.width;
                displayImageWidth = this.state.layout.width;
            }
            switch (heightMode) {
                case "square":
                    displayImageHeight = displayImageWidth;
                    break;

                case "maximumSize":
                    containerHeight = this.state.layout.height;
                    displayImageHeight = this.state.layout.height;
                    break;

                default:
                    break;
            }
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
