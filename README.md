# react-native-image-pin

React native image pin allows for adding a pin or a marker to any image and to zoom and move around the image as needed, this is helpfun for marking specific coordinates in layouts or blueprints or any kind of image 

## Installation

```sh
npm install react-native-image-pin @openspacelabs/react-native-zoomable-view
yarn add react-native-image-pin @openspacelabs/react-native-zoomable-view
```

## Usage

```javascript
import ImagePinView from "react-native-image-pin";

<ImagePinView
    editable={true}
    containerStyle={{borderWidth:1}}
    imageHeight={300}
    markerSize={0.15} //size based on the view height
    onMarkerAdded={(rx, ry) => {
        console.log(rx), console.log(ry);
    }}
    imageSource={require('./floorplan.jpg')} //or uri
    markerSource={require('./marker.png')} //or uri
/>     

```

## Props

```javascript
  containerStyle: ViewStyle;
  markerX?: number;
  markerY?: number;
  markerSize: number;
  markerSource: ImageSourcePropType;
  parentScrollRef?: RefObject<ScrollView>;
  imageSource: ImageSourcePropType;
  editable: boolean;
  imageHeight: number;
  onMarkerAdded: (x: number, y: number) => void;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
