import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { DOMAIN, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../env.js';

export default class ProfileImage extends React.Component {
  state = {
    image: null,
  };

  Settings() {
    this.props.navigation.navigate('Settings')
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log(result);
      const file = {
        uri: result.uri,
        name: result.uri.split('ImagePicker/')[1],
        type: "image/jpg"
      }
      console.log(result.uri, "uri stuff")

      const option = {
        keyPrefix: "uploads/",
        bucket: "imagepicker1",
        region: "us-east-1",
        accessKey: AWS_ACCESS_KEY_ID,
        secretKey: AWS_SECRET_ACCESS_KEY,
        successActionStatus: 201
      }

      RNS3.put(file, option).then(response => {
        console.log(response);
        if (response.status !== 201) throw new Error("Failed to upload image to S3");
        return fetch('https://agile-forest-10594.herokuapp.com/addPicture', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_URI: response.body.postResponse.location
          })
          // console.log('profileURL:', response.body.postResponse.location);
        })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          if (responseJson.success) {
            console.log('responseJson', responseJson);
          } else {
            alert('Picture was not uploaded');
            console.log('error in picture fail', responseJson.error);
            this.setState({error: responseJson.error});
          }
        })
        .catch((err) => {
          console.log('caught error in catch of add picture', err);
          alert(err)
        })

      })
    }
  }


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          color="#00adf5"
          onPress={this._pickImage}
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

}
