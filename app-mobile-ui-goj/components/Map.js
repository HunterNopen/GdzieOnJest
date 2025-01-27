import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LeafletView } from 'react-native-leaflet-view'; // Załóżmy, że ta biblioteka jest poprawnie zainstalowana

const Map = ({ zoom = 10, centerPosition = { lat: 54.352, lng: 18.6466 }, ...otherProps }) => {
  return (
    <View style={styles.container}>
      <LeafletView
        {...otherProps}
        zoom={zoom}
        mapCenterPosition={centerPosition}
        style={styles.map}
        onMessageReceived={(message) => console.log('Message received from map:', message)}
        onError={(error) => console.log('Error:', error)}
        onLoadEnd={() => console.log('Map loaded')}
        onLoadStart={() => console.log('Map loading started')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
