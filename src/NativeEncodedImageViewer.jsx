import { Component, createElement } from "react";
import { Image } from "react-native";

export class NativeEncodedImageViewer extends Component {
    render() {
        const { imageDataAttr, width, height, resizeMode } = this.props;
        if (!imageDataAttr || imageDataAttr.status !== "available") {
            return null;
        }
        return (
            <Image
                source={{ uri: imageDataAttr.value }}
                resizeMode={resizeMode}
                style={{ width: Number(width.value), height: Number(height.value) }}
            ></Image>
        );
    }
}
