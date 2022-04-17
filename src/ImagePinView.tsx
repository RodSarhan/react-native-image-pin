/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { RefObject, useState } from 'react';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
// Image.getSize(myUri, (width, height) => {this.setState({width, height})});

type TImagePinViewProps = {
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
};
const ImagePinView = (props: TImagePinViewProps) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [markerSize] = useState(props.markerSize ?? 0.2);
  const [markerX, setMarkerX] = useState(props.markerX ?? -1);
  const [markerY, setMarkerY] = useState(props.markerY ?? -1);
  const [mode, setMode] = useState<'drag' | 'pin'>('drag');

  const setIsParentScrollable = (bool: boolean) => {
    if (props.parentScrollRef?.current) {
      props.parentScrollRef.current.setNativeProps({ scrollEnabled: bool });
    }
  };

  const getMarkerWidth = () => {
    return (markerSize * props.imageHeight) / zoomLevel;
  };

  return (
    <>
      {props.editable && (
        <>
          <Text>{'X: ' + markerX}</Text>
          <Text>{'Y: ' + markerY}</Text>
        </>
      )}
      <View>
        {props.editable && (
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderRightWidth: 1,
              height: 30,
              backgroundColor: 'rgba(0,0,0,0.8)',

              position: 'absolute',
              zIndex: 20,
              flexDirection: 'row',
            }}
          >
            <Pressable
              style={{ marginRight: 20 }}
              onPress={() => {
                setMode('drag');
              }}
            >
              <Text style={{ color: 'white' }}>DragBtn</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setMode('pin');
              }}
            >
              <Text style={{ color: 'white' }}>MarkBtn</Text>
            </Pressable>
          </View>
        )}
        <View style={{ height: props.imageHeight, ...props.containerStyle }}>
          <ReactNativeZoomableView
            onTransform={(zoomObject) => {
              setZoomLevel(zoomObject.zoomLevel);
            }}
            maxZoom={10}
            minZoom={0.5}
            zoomStep={2}
            onShiftingBefore={() => {
              if (mode === 'drag') {
                setIsParentScrollable(false);
                return false;
              } else {
                return true;
              }
            }}
            onShiftingEnd={() => {
              setIsParentScrollable(true);
            }}
            onZoomBefore={() => {
              if (mode === 'drag') {
                return false;
              } else {
                return true;
              }
            }}
            contentWidth={imageWidth + getMarkerWidth()}
            contentHeight={props.imageHeight + getMarkerWidth() * 3}
          >
            <View
              onStartShouldSetResponder={(e) => {
                if (mode === 'pin') {
                  const rx = e.nativeEvent.locationX / imageWidth;

                  const ry = e.nativeEvent.locationY / props.imageHeight;
                  setMarkerX(rx);
                  setMarkerY(ry);
                  props.onMarkerAdded(rx, ry);
                  return true;
                } else {
                  return false;
                }
              }}
              style={{
                marginVertical: 20,
              }}
            >
              {markerX > -1 && markerY > -1 && (
                <Image
                  source={props.markerSource}
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    left: markerX * imageWidth - getMarkerWidth() / 2,
                    top: markerY * props.imageHeight + -getMarkerWidth(),
                    height: getMarkerWidth(),
                    width: getMarkerWidth(),
                  }}
                  resizeMode={'contain'}
                />
              )}
              {/* <FastImage
                source={props.source}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: imageHeight,
                  width: imageWidth,
                }}
                onLoad={(e) => {
                  const viewWidth =
                    (imageHeight * e.nativeEvent.width) / e.nativeEvent.height;
                  setImageWidth(viewWidth);
                }}
                resizeMode={FastImage.resizeMode.contain}
              /> */}
              <Image
                source={props.imageSource}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: props.imageHeight,
                  width: imageWidth,
                }}
                onLoad={(e) => {
                  const viewWidth =
                    (props.imageHeight * e.nativeEvent.source.width) /
                    e.nativeEvent.source.height;
                  setImageWidth(viewWidth);
                }}
                resizeMode={'contain'}
              />
            </View>
          </ReactNativeZoomableView>
        </View>
      </View>
    </>
  );
};

export default ImagePinView;

// const styles = StyleSheet.create({
// });
