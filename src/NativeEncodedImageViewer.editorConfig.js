import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export function getProperties(values, defaultProperties) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (values.widthMode !== "fixed") {
        hidePropertyIn(defaultProperties, values, "viewWidth");
    }
    if (values.heightMode !== "fixed") {
        hidePropertyIn(defaultProperties, values, "viewHeight");
    }
    return defaultProperties;
}

export function check(values) {
    const errors = [];

    if (
        (values.widthMode === "fixed" && values.heightMode !== "fixed") ||
        (values.heightMode === "fixed" && values.widthMode !== "fixed")
    ) {
        errors.push({
            property: "widthMode",
            message: "For view mode fixed, both width and height must use mode fixed"
        });
    }

    const viewWidthvalue = values.viewWidth ? Number(values.viewWidth) : 0;
    if (values.widthMode === "fixed" && (!values.viewWidth || viewWidthvalue <= 0)) {
        errors.push({
            property: "viewWidth",
            message: "For fixed width mode, width must be set and positive"
        });
    }

    const viewHeightvalue = values.viewHeight ? Number(values.viewHeight) : 0;
    if (values.heightMode === "fixed" && (!values.viewHeight || viewHeightvalue <= 0)) {
        errors.push({
            property: "viewHeight",
            message: "For fixed height mode, height must be set and positive"
        });
    }

    return errors;
}
