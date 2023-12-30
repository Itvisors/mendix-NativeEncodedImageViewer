import { Image, PixelRatio, View } from "react-native";
import { createElement, useState } from "react";

export function NativeEncodedImageViewer(props) {
    const [layout, setLayout] = useState(null);

    const { widthMode, viewWidth, heightMode, viewHeight } = props;
    const viewWidthvalue = viewWidth ? Number(viewWidth) : 0;
    const viewHeightvalue = viewHeight ? Number(viewHeight) : 0;

    const { imageDataAttr } = props;
    if (!imageDataAttr || imageDataAttr.status !== "available") {
        return null;
    }

    // Unless fixed mode is used, return a div that gives us the available space.
    if (!layout && heightMode !== "fixed") {
        return (
            <View
                style={{ flex: 1 }}
                onLayout={event => {
                    setLayout(event.nativeEvent.layout);
                }}
            ></View>
        );
    }

    // If image data does not start with data:image, set the prefix
    let imageDataPrefix;
    if (imageDataAttr.value.substr(0, 10) === "data:image") {
        imageDataPrefix = "";
    } else {
        // Determine extension, defaults to jpg.
        let extension = "jpg";
        const { imageNameAttr } = props;
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
        const { imageHeightAttr, imageWidthAttr } = props;
        const imageWidth = imageWidthAttr?.value ? Number(imageWidthAttr.value) : viewWidthvalue;
        const imageHeight = imageHeightAttr?.value ? Number(imageHeightAttr.value) : viewHeightvalue;
        displayImageWidth = PixelRatio.roundToNearestPixel(imageWidth / pixelDensity);
        displayImageHeight = PixelRatio.roundToNearestPixel(imageHeight / pixelDensity);
        // Determine width to use. If fixed width is set and less than available width, use is.
        const widthToUse = layout.width;
        if (displayImageWidth > widthToUse) {
            displayImageHeight = Math.round(displayImageHeight * (layout.width / displayImageWidth));
            displayImageWidth = widthToUse;
        }
        containerWidth = displayImageWidth;
        containerHeight = displayImageHeight;
        if (widthMode === "maximumSize") {
            containerWidth = layout.width;
            displayImageWidth = layout.width;
        }
        switch (heightMode) {
            case "square":
                displayImageHeight = displayImageWidth;
                break;

            case "maximumSize":
                containerHeight = layout.height;
                displayImageHeight = layout.height;
                break;

            default:
                break;
        }
    }
    return (
        <View
            style={{ width: containerWidth, height: containerHeight }}
            testID={props.name}
            accessible={props.a11yEnabled}
            accessibilityHint={props.a11yHint?.value}
            accessibilityLabel={props.a11yLabel?.value}
        >
            <Image
                source={{ uri: imageDataPrefix + imageDataAttr.value }}
                resizeMode={props.resizeMode}
                style={{ width: displayImageWidth, height: displayImageHeight }}
                testID={`${props.name}$image`}
            ></Image>
        </View>
    );
}
